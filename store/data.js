import { DataApi } from '@/api/data'
import Vue from 'vue'



const prepareSeries = (state, ctx) => {
  console.log('prepare series')
  const { sensorTypes, sensors } = ctx.rootState
  let agg = {}
  let index=0
  for (const dataItem of state.list) {
    const sensor = sensors.list.find(s => s.id == dataItem.sensor_id)
    const sensorType = sensorTypes.list.find(t => t.id == sensor.type)

    for (const sensorKind of sensorType.sensors) {
      const point =  { x: +new Date(dataItem.timestamp), y: dataItem.payload[sensorKind] }

      if (!agg[`${sensor.id}_${sensorKind}`]) {
        Vue.set(agg, `${sensor.id}_${sensorKind}`, {
          color: null,
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

  return agg
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
    // console.log("prepareCharts", ctx.commit('prepareSeries', ctx))
    // localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : '';

    let charts = JSON.parse(localStorage.getItem('charts'))

    if (!charts || charts.length == 0) {
      const agg = prepareSeries(state, ctx)

      state.charts = [{
        agg,
        activeSensors: Object.entries(agg).map(([key, value])=> key)
      }]
      return
    }

    state.charts = charts

  },


}

export const actions = {
  async getList(ctx) {
    const list = await DataApi.getList()
    ctx.commit('setList', list)
    // ctx.commit('prepareSeries', { ctx, chartIndex })
    ctx.commit('prepareCharts', { ctx })

    
  }
}