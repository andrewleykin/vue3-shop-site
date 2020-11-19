export default {
  namespaced: true,
  state: {
    carts: JSON.parse(localStorage.getItem('user-carts')) || []
  },
  getters: {
    cartItemById: state => id => state.carts.find(item => item.id === id),
    cartsLength (state) {
      return state.carts.reduce((acc, item) => {
        acc += item.quantity
        return acc
      }, 0)
    },
    cartsTotalSum (state) {
      return state.carts.reduce((acc, item) => {
        acc += item.price * item.quantity
        return acc
      }, 0)
    }
  },
  mutations: {
    addCartItem (state, item) {
      state.carts.push({
        ...item,
        quantity: 1
      })
    },
    removeCartItem (state, id) {
      const cartItemIndex = state.carts.findIndex(c => c.id === id)
      state.carts.splice(cartItemIndex, 1)
    },
    setQuantity (state, { id, value }) {
      const cartItem = state.carts.find(c => c.id === id)
      cartItem.quantity = value
    },
    clearCart (state) {
      state.carts = []
    }
  },
  actions: {
    changeCart ({ commit, state }, payload) {
      commit(payload.type, payload.payload)
      localStorage.setItem('user-carts', JSON.stringify(state.carts))
    }
  }
}
