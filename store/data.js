import { DataApi } from '@/api/data'
import Vue from 'vue'

export const state = () => ({
  filters: {},
  list: [],
  agg: {}
})

export const getters = {
  list: state => state.list,

  agg: state => state.agg,

  visibleSensors: state => {
    const entries = Object.entries(state.agg)
    const filtered = entries.filter(([ _, { visible } ]) => visible)

    // console.log("from entries", Object.fromEntries(filtered))

    return Object.fromEntries(filtered)
  }
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },    

  prepareSeries(state, ctx) {
    const { sensorTypes, sensors } = ctx.rootState

    let index=0
    for (const dataItem of state.list) {
      const sensor = sensors.list.find(s => s.id == dataItem.sensor_id)
      const sensorType = sensorTypes.list.find(t => t.id == sensor.type)

      for (const sensorKind of sensorType.sensors) {
        const point =  { x: +new Date(dataItem.timestamp), y: dataItem.payload[sensorKind] }

        if (!state.agg[`${sensor.id}_${sensorKind}`]) {
          Vue.set(state.agg, `${sensor.id}_${sensorKind}`, {
            visible: true,
            sensor,
            sensorType,
            data: [ point ]
          })

          continue
        }
        state.agg[`${sensor.id}_${sensorKind}`].data.push(point)
      }
    }

    for (const key in state.agg) {
      state.agg[key].data.sort((a, b) => a.x - b.x)
    }
  }
}

export const actions = {
  async getList(ctx) {
    const list = await DataApi.getList()
    ctx.commit('setList', list)
    ctx.commit('prepareSeries', ctx)
  }
}