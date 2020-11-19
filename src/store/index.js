import { createStore } from 'vuex'
import axios from 'axios'
import { getIdByToken } from '@/helpers/getIdByToken'

import items from './modules/items'
import item from './modules/item'
import cart from './modules/cart'
import orders from './modules/orders'

export default createStore({
  state: {
    user: {}
  },
  getters: {
    isAuth: (state) => Object.keys(state.user).length > 0
  },
  mutations: {
    setUser (s, user) { s.user = user }
  },
  actions: {
    async apiLogin ({ dispatch }, data) {
      await axios.post('/login', data).then(async (res) => {
        dispatch('setUserToken', res.data.accessToken)
        await dispatch('apiUserById', getIdByToken(res.data.accessToken))
      }).catch((e) => {
        throw new Error(e.response.data)
      })
    },
    async apiLogout ({ commit }) {
      commit('setUser', {})
      localStorage.removeItem('user-token')
    },
    async apiRegister ({ dispatch }, data) {
      await axios.post('/register', data).then(async (res) => {
        dispatch('setUserToken', res.data.accessToken)
        await dispatch('apiUserById', getIdByToken(res.data.accessToken))
      }).catch((e) => {
        throw new Error(e.response.data)
      })
    },
    async apiUserById ({ commit }, id) {
      await axios.get(`/users/${id}`).then(res => {
        commit('setUser', res.data)
      }).catch((e) => {
        throw new Error(e.response.data)
      })
    },
    setUserToken (ctx, token) {
      localStorage.setItem('user-token', token)
    }
  },
  modules: {
    items,
    item,
    cart,
    orders
  }
})
