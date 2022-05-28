import { SensorTypesApi } from '@/api/sensorTypes'

export const state = () => ({
  filters: {},
  list: []
})

export const getters = {
  list: state => state.list
}

export const mutations = {
  setList(state, list) {
    state.list = list
  }
}

export const actions = {
  async getList(ctx) {
    const list = await SensorTypesApi.getList()

    console.log("SENSOR TYPES", list)
    
    ctx.commit('setList', list)
  }
}