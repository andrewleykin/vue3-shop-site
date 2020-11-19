import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    item: {},
    isLoading: false
  },
  mutations: {
    setItem (state, item) { state.item = item },
    setIsLoading (state, isLoading) { state.isLoading = isLoading }
  },
  actions: {
    async fetchItem ({ commit }, id) {
      commit('setIsLoading', true)
      await axios.get(`/items/${id}`).then((res) => {
        commit('setItem', res.data)
        commit('setIsLoading', false)
      }).catch((e) => {
        commit('setIsLoading', false)
        router.push({ name: 'CatalogPage' })
      })
    }
  }
}
