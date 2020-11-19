<template>
  <div class="cart-item p-d-flex p-mb-4">
    <img :alt="item.name" :src="`https://source.unsplash.com/${item.image}/200x100/`">
    <div class="cart-item__info p-ml-4">
      <h3 class="p-mt-0 p-mb-1">{{currencyFilter(item.price)}}</h3>
      <router-link to="/">{{item.name}}</router-link>
      <Rating :modelValue="item.rate" :cancel="false" :readOnly="true" class="p-mt-2"/>
    </div>
    <div class="p-as-start p-d-flex p-ml-auto p-ai-center">
      <h4 class="p-mt-0 p-mb-0 p-mr-2">{{currencyFilter(item.price * item.quantity)}}</h4>
      <div style="max-width: 150px;">
        <AppCount v-model="count" :min="1" />
      </div>
      <BButton icon="pi pi-times" class="p-button-warning p-ml-2" style="flex: none;" @click="removeCartItem(item.id)" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import AppCount from '@/components/AppCount'

export default {
  name: 'CartItem',
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
    const { changeQuantity, removeCartItem } = useCart()
    const { currencyFilter } = useCurrency()
    const count = ref(props.item.quantity)

    const changeQuantityHandler = (value) => {
      changeQuantity({ id: props.item.id, value })
    }

    watch(count, changeQuantityHandler)

    return {
      count,
      currencyFilter,
      removeCartItem
    }
  }
}
</script>
