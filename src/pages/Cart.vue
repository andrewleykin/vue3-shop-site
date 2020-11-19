<template>
  <div class="cart-page">
    <div class="p-d-flex p-ai-center p-jc-between p-mb-4">
      <h1>Корзина</h1>
      <div class="cart-page-actions" v-if="cartsLength > 0">
        <router-link class="p-button p-component p-button-success" :to="{name: 'OrderPage'}">Оформить заказ</router-link>
        <BButton label="Очистить" class="p-button-danger p-ml-2"  @click="clearCart" />
      </div>
    </div>
    <p v-if="cartsLength === 0">В корзине пусто</p>
    <div class="cart-list">
      <CartItem v-for="item in carts" :key="item.id" :item="item" />
    </div>
    <div class="p-d-flex p-jc-end p-ai-center" v-if="cartsLength > 0">
      <h2 class="p-mr-3">Итого:</h2>
      <p style="font-size: 3rem">{{currencyFilter(cartsTotalSum)}}</p>
    </div>
  </div>
</template>

<script>
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import CartItem from '@/components/Cart/Item'

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  setup () {
    const { carts, clearCart, cartsTotalSum, cartsLength } = useCart()
    const { currencyFilter } = useCurrency()

    return {
      carts,
      clearCart,
      cartsTotalSum,
      cartsLength,
      currencyFilter
    }
  }
}
</script>
