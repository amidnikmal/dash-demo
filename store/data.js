import { DataApi } from '@/api/data'
import Vue from 'vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const DEFAULT_VISIBLE_SERIES = 6

const prepareColumnChartSeries = (ctx, agg) => {
  const { sensorTypes, sensors, data } = ctx.rootState  

  const start = dayjs(data.list[0].timestamp)
  const end = dayjs(data.list[data.list.length -1].timestamp)

  const diff = end.diff(start) / 10

  let step = start
  let columns = []
  let categories = []

  for (let i=0; i<10; i++) {
    const next = step.add(diff, 'ms')
    const column = { start: step, end: next, points : []}
    for (let dataItem of data.list) {
      const result = dayjs(dataItem.timestamp).isBetween(step, next)
      if (result) {
        column.points.push(dataItem)
      }
    }
    categories.push(next.format('YYYY-MM-DD HH:mm'))
    columns.push(column)
    step = next
  }

  const series = []
  let index = -1
  for (let seriesTypeItem of sensorTypes.list) {
    
    for (const sensorKind of seriesTypeItem.sensors) {
      for (const sensor of sensors.list) {

        if (sensor.type !== seriesTypeItem.id) {
          continue;
        }

        index++

        const key = `${sensor.id}_${sensorKind}`
        const foundseries = series.find(s => s.name === key)

        if (foundseries) {
          continue
        }

        const k = `${sensor.id}_${sensorKind}`

        series.push({
          sensor,
          visible: index < DEFAULT_VISIBLE_SERIES,
          color: agg[k] ? agg[k].color : null,
          name: k,
          data: []
        })
      }
    }
  }

  for (let col of columns) {
    let max = {}
    for (let point of col.points) {
      for (const key in point.payload) {
        const uniq_key = `${point.sensor_id}_${key}`
        if (!max[uniq_key]) {
          max[uniq_key] = point.payload[key]
          continue
        } 
        if (max[uniq_key] < point.payload[key]) {
          max[uniq_key] = point.payload[key]
        }
      }
    }

    for (let s of series) {
      s.data.push(max[s.name])
    }
  }

  return JSON.parse(JSON.stringify({categories, series }))
}


const prepareSeries = (ctx) => {
  const { sensorTypes, sensors, data } = ctx.rootState

  let agg = {}
  let index = -1

  for (const dataItem of data.list) {
    const sensor = sensors.list.find(s => s.id == dataItem.sensor_id)
    const sensorType = sensorTypes.list.find(t => t.id == sensor.type)

    for (const sensorKind of sensorType.sensors) {
      index++
      const point =  { x: dayjs(dataItem.timestamp).valueOf(), y: dataItem.payload[sensorKind] }

      if (!agg[`${sensor.id}_${sensorKind}`]) {
        const color = '#'+Math.floor(Math.random()*16777215).toString(16);

        Vue.set(agg, `${sensor.id}_${sensorKind}`, {
          color,
          visible: index < DEFAULT_VISIBLE_SERIES,
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
  const columnagg = prepareColumnChartSeries(ctx, agg)

  return {
    type: 'line',
    agg,
    columnagg,
    activeSensors: Object.entries(agg).map(([key, value])=> key)
  }
}



const recalcLineSeries = (ctx, chartIndex, chart) => {
  const { sensorTypes, sensors, data } = ctx.rootState

  for (const sensorKindKey in chart.agg) {
    const sensorKind = sensorKindKey.split("_")[1]
    const sensorId = parseInt(sensorKindKey.split("_")[0])

    chart.agg[sensorKindKey].data = []

    const filteredDataItems = data.list.filter((dataItem) => dataItem.sensor_id == sensorId)

    if (filteredDataItems) {
      for (let dataItem of filteredDataItems) {

        const sensorParameter = dataItem.payload[sensorKind]
        if (sensorParameter) {
          const point =  { x: dayjs(dataItem.timestamp).valueOf(), y: dataItem.payload[sensorKind] }
          chart.agg[sensorKindKey].data.push(point)
        }
      }
    }
  }

  let index = -1
  for (const sensorKindKey in chart.agg) {
    if (chart.agg[sensorKindKey].data.length > 0) {
      chart.agg[sensorKindKey].visible = index < DEFAULT_VISIBLE_SERIES
    }
  }
}


export const state = () => ({
  filters: {
    sensorsFilter: [],
    sensorTypesFilter: [],
    dateRangeFilter: []
  },
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
  setFilters(state, filters) {
    state.filters = filters
  },

  setList(state, list) {
    state.list = list
  },

  prepareCharts(state, { ctx }) {
    let charts = JSON.parse(localStorage.getItem('charts'))

    if (!charts || charts.length == 0) {
      state.charts = [ initChart(ctx) ]
      localStorage.setItem('charts', JSON.stringify(state.charts))
      return
    }

    for (let i=0; i<charts.length; i++) {
      recalcLineSeries(ctx, i, charts[i])
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

      const foundColumnSeries = state.charts[index].columnagg.series.find(s => s.name === sensorKey)
      
      Vue.set(foundColumnSeries, key, actualParams[key])
    }

    localStorage.setItem('charts', JSON.stringify(state.charts))
  },

  setChartType(state, { ctx, params: { index, type } }) {
    state.charts[index].type = type
    localStorage.setItem('charts', JSON.stringify(state.charts))
  }
}

export const actions = {
  async getList(ctx) {
    const list = await DataApi.getList(ctx.rootState)

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
  },

  setChartType(ctx, params) {
    ctx.commit('setChartType', { ctx, params })
  }
}