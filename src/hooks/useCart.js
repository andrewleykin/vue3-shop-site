import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart () {
  const store = useStore()

  const carts = computed(() => store.state.cart.carts)
  const cartsLength = computed(() => store.getters['cart/cartsLength'])
  const cartsTotalSum = computed(() => store.getters['cart/cartsTotalSum'])

  const addToCart = (item) => {
    changeCart({
      type: 'addCartItem',
      payload: item
    })
  }

  const changeQuantity = ({ id, value }) => {
    if (!value) {
      setTimeout(() => {
        removeCartItem(id)
      }, 100)
      return
    }
    changeCart({
      type: 'setQuantity',
      payload: { id, value }
    })
  }

  const removeCartItem = (id) => {
    changeCart({
      type: 'removeCartItem',
      payload: id
    })
  }

  const clearCart = () => {
    changeCart({ type: 'clearCart' })
  }

  const changeCart = (payload) => {
    store.dispatch('cart/changeCart', payload)
  }

  return { addToCart, carts, changeQuantity, cartsLength, cartsTotalSum, clearCart, removeCartItem }
}
