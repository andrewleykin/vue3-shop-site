<template>
  <div class="order-page">
    <h1>Оформление заказа</h1>
    <div class="p-grid">
      <div class="p-col-4">
        <FormWrap @submited="onSubmit">
          <FormField label="Адрес" id="address" v-model="address" :v="v.address" />
          <FormField label="Телефон" id="phone" v-model="phone" :v="v.phone" isPhone/>
          <div class="p-field">
            <label>Количество персон</label>
            <AppCount v-model="count" :min="1" />
          </div>
        </FormWrap>
      </div>
      <div class="p-col-4 p-offset-4">
        <h3>Список товаров на сумму {{currencyFilter(cartsTotalSum)}}</h3>
        <div class="order-cart-list">
          <div class="cart-item p-d-flex p-mb-2 p-ai-center" v-for="item in carts" :key="item.id">
            <img :alt="item.name" :src="`https://source.unsplash.com/${item.image}/100x100/`">
            <div class="cart-item__info p-ml-2">
              <h3 class="p-mt-0 p-mb-1">{{currencyFilter(item.price)}}</h3>
              <router-link to="/">{{item.name}}</router-link>
              <p class="p-ml-2">x {{item.quantity}}</p>
            </div>
            <h4 class="p-mt-0 p-mb-0 p-ml-auto">{{currencyFilter(item.price * item.quantity)}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import FormField from '@/components/FormField'
import FormWrap from '@/components/FormWrap'
import AppCount from '@/components/AppCount'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'OrderPage',
  components: {
    FormField,
    FormWrap,
    AppCount
  },
  setup () {
    const { carts, cartsTotalSum, clearCart } = useCart()
    const { currencyFilter } = useCurrency()
    const store = useStore()
    const router = useRouter()
    const address = ref(null)
    const phone = ref(null)
    const count = ref(1)

    const rules = {
      address: { required },
      phone: { required }
    }

    const v = useVuelidate(rules, { address, phone })

    const onSubmit = async () => {
      v.value.$touch()
      if (v.value.$error) return

      await store.dispatch('orders/postOrder', {
        address: address.value,
        phone: phone.value,
        person_count: count.value
      }).then(() => {
        clearCart()
        router.push({ name: 'CatalogPage' })
      })
    }

    return {
      address,
      phone,
      count,
      onSubmit,
      v,
      carts,
      cartsTotalSum,
      currencyFilter
    }
  }
}
</script>

<style lang="stylus">
.order-cart-list
  max-height 300px
  overflow-y auto
</style>
