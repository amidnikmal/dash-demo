import Vue from 'vue'
import { getRandomMac, getRandomNumberBetween } from '@/api/helpers'
import { randBetweenDate } from '@ngneat/falso'
import { data } from '@/api/sample_data'
import { SENSOR_TYPES } from '@/api/sensorTypes'


const FAKE_SENSROS_COUNT = 3
const FAKE_DATA_ITEMS_COUNT = 100
const FAKE_DATA_DATES_RANGE = { from: new Date('1/01/2022'), to: new Date() }

export const state = () => ({
  params: {
    sensorsCount: FAKE_SENSROS_COUNT,
    dataCount: FAKE_DATA_ITEMS_COUNT,
    datesRange: {
      from: FAKE_DATA_DATES_RANGE.from, to: FAKE_DATA_DATES_RANGE.to
    }
  },

  sensors: [],
  sensorTypes: [],
  data: []
})

export const getters = {
  sensors: (state)=> state.sensors,
  sensorTypes: (state)=> state.sensorTypes,
  data: (state)=> state.data,

  params: (state) => state.params
}

export const mutations = {
  setParams(state, {key, value}) {
    Vue.set(state.params, key, value)
  },

  setList(state, {key, list}) {
    Vue.set(state, key, list)
  }
}

export const actions = {
  setParams(ctx, payload) {
    ctx.commit('setParams', payload)
  },

  async genFakeSensors(ctx) {
    const list = []

    for (let i=0; i<ctx.getters.params.sensorsCount; i++) {
      list.push({
        id: i,
        mac: getRandomMac(),
        type: getRandomNumberBetween(0, SENSOR_TYPES.length-1),
        timestamp: new Date()
      })
    }
  
    ctx.commit('setList', { key:'sensors', list })
  },


  async genFakeDataFrames(ctx) {
    const fakeSensorsList = ctx.getters.sensors

    const range = {
      from: new Date(ctx.getters.params.datesRange.from),
      to: new Date(ctx.getters.params.datesRange.to)
    }

    const list =
      new Array(ctx.getters.params.dataCount)
      .fill()
      .map(() => randBetweenDate(range))
      .sort((a,b) => a - b)
      .map((timestamp, index) => ({ id: index, timestamp }))


    for (let i=0; i<ctx.getters.params.dataCount; i++) {
      const randomSensorIndx = getRandomNumberBetween(0, fakeSensorsList.length-1)
      const randSensor = fakeSensorsList[randomSensorIndx] 

      const sensorType = SENSOR_TYPES.find((item) => item.id === randSensor.type)

      if (!sensorType) {
        continue
      }

      const payload = sensorType.sensors.reduce((acc, sensorKind) => {
        acc[sensorKind] = data[i][sensorKind]
        return acc
      }, {})

      list[i] = {
        ...list[i],
        sensor_type: randSensor.type,
        sensor_id: randSensor.id,
        payload,
      }
    }

    ctx.commit('setList', { key:'data', list })
  },


  async genFakeData(ctx, params) {
    if (params && params.reset) {
      localStorage.clear()
    }

    ctx.commit('setList', { key: 'sensorTypes', list: SENSOR_TYPES })

    const existingFakeData = JSON.parse(localStorage.getItem('fakeData'))

    console.log("existingFakeData", existingFakeData)

    if (existingFakeData) {
      ctx.commit('setList', { key:'sensors', list: existingFakeData.sensors })
      ctx.commit('setList', { key:'data', list: existingFakeData.data })
      ctx.commit('setList', { key:'params', list: existingFakeData.params })  
      return
    }

    ctx.dispatch('genFakeSensors')
    ctx.dispatch('genFakeDataFrames')
    localStorage.setItem('fakeData', JSON.stringify({ data: ctx.state.data, sensors: ctx.state.sensors, params: ctx.state.params }))
  }
}