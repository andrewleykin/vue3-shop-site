import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    isLoading: false
  },
  mutations: {
    setOrders (state, orders) { state.orders = orders },
    setIsLoading (state, isLoading) { state.isLoading = isLoading }
  },
  actions: {
    async fetchOrders ({ commit }) {
      commit('setIsLoading', true)
      await axios.get('/orders').then((res) => {
        commit('setOrders', res.data)
        commit('setIsLoading', false)
      }).catch((e) => {
        commit('setIsLoading', false)
      })
    },
    async postOrder ({ rootState }, orderInfo) {
      await axios.post('/orders', {
        ...orderInfo,
        carts: rootState.cart.carts
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
