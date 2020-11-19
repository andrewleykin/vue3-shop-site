<template>
  <div class="p-d-flex">
    <AppCount v-model="count" v-if="cartItem" />
    <BButton icon="pi pi-shopping-cart" class="p-button-success" style="flex: none;" @click="addToCartHandler" v-else />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AppCount from '@/components/AppCount'
import { useCart } from '@/hooks/useCart'

export default {
  name: 'AddCartButton',
  components: {
    AppCount
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { addToCart, changeQuantity } = useCart()
    const store = useStore()
    const count = ref(1)
    const productItem = ref(props.item)

    const addToCartHandler = () => {
      count.value = 1
      addToCart(productItem.value)
    }

    const cartItem = computed(() => store.getters['cart/cartItemById'](productItem.value.id))

    if (cartItem.value) {
      count.value = cartItem.value.quantity
    }

    const changeQuantityHandler = (value) => {
      changeQuantity({ id: cartItem.value.id, value })
    }

    watch(count, changeQuantityHandler)

    return {
      count,
      productItem,
      addToCartHandler,
      cartItem,
      changeQuantity
    }
  }
}
</script>
