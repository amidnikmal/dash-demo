import { DataApi } from '@/api/data'

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
    const list = await DataApi.getList()
    ctx.commit('setList', list)
  }
}