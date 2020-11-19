<template>
  <Card>
    <template v-slot:header>
      <img :alt="item.name" :src="`https://source.unsplash.com/${item.image}/600x300/`">
    </template>
    <template v-slot:content>
      <h3 class="p-mt-0 p-mb-1">{{currencyFilter(item.price)}}</h3>
      <router-link :to="{name: 'ProductPage', params: {id: item.id}}">{{item.name}}</router-link>
    </template>
    <template v-slot:footer>
      <AddCartButton :item="item" />
    </template>
  </Card>
</template>

<script>
import AddCartButton from '@/components/AddCartButton'
import { useCurrency } from '@/hooks/useCurrency'

export default {
  name: 'CatalogCard',
  components: { AddCartButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup () {
    const { currencyFilter } = useCurrency()

    return {
      currencyFilter
    }
  }
}
</script>
