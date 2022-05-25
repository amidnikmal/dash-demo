import { DataApi } from '@/api/data'
import Vue from 'vue'


const prepareSeries = (ctx) => {
  const { sensorTypes, sensors, data } = ctx.rootState

  let agg = {}
  for (const dataItem of data.list) {
    const sensor = sensors.list.find(s => s.id == dataItem.sensor_id)
    const sensorType = sensorTypes.list.find(t => t.id == sensor.type)

    for (const sensorKind of sensorType.sensors) {
      const point =  { x: +new Date(dataItem.timestamp), y: dataItem.payload[sensorKind] }

      if (!agg[`${sensor.id}_${sensorKind}`]) {
        const color = '#'+Math.floor(Math.random()*16777215).toString(16);

        Vue.set(agg, `${sensor.id}_${sensorKind}`, {
          color,
          visible: true,
          sensor,
          sensorType,
          data: [ point ]
        })
        continue
      }

      agg[`${sensor.id}_${sensorKind}`].data.push(point)
    }
  }

  for (const key in agg) {
    agg[key].data.sort((a, b) => a.x - b.x)
  }

  return JSON.parse(JSON.stringify(agg))
}


const initChart = (ctx) => {
  const agg = prepareSeries(ctx)
  return {
    agg,
    activeSensors: Object.entries(agg).map(([key, value])=> key)
  }
}


export const state = () => ({
  filters: {},
  list: [],
  agg: {},
  charts: []
})


export const getters = {
  list: state => state.list,

  agg: state => state.agg,

  visibleSensors: state => {
    const entries = Object.entries(state.agg)
    const filtered = entries.filter(([ _, { visible } ]) => visible)
    return Object.fromEntries(filtered)
  },

  charts: state => state.charts
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },

  prepareCharts(state, { ctx }) {
    let charts = JSON.parse(localStorage.getItem('charts'))

    if (!charts || charts.length == 0) {
      state.charts = [ initChart(ctx) ]
      return
    }

    state.charts = charts
  },

  addChart(state, { ctx , props }) {
    state.charts.push(initChart(ctx))
    localStorage.setItem('charts', JSON.stringify(state.charts))
  },

  removeChart(state, { index }) {
    state.charts.splice(index, 1)
    localStorage.setItem('charts', JSON.stringify(state.charts))
  },

  changeChartParams(state, { ctx, params }) {
    const { index, key: sensorKey, ...actualParams } = params
    for (const key in actualParams) {
      Vue.set(state.charts[index].agg[sensorKey], key, actualParams[key])
    }

    localStorage.setItem('charts', JSON.stringify(state.charts))
  }
}

export const actions = {
  async getList(ctx) {
    const list = await DataApi.getList()
    ctx.commit('setList', list)
    ctx.commit('prepareCharts', { ctx })
  },

  addChart(ctx, props) {
    ctx.commit('addChart', { ctx, props })
  },

  removeChart(ctx, index) {
    ctx.commit('removeChart', { ctx, index })
  },

  changeChartParams(ctx, params) {
    ctx.commit('changeChartParams', { ctx, params })
  }
}