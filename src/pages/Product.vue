<template>
  <div class="product-page">
    <ProgressSpinner v-if="isLoading" />
    <template v-else>
      <img :alt="item.name" :src="`https://source.unsplash.com/${item.image}/600x300/`">
      <Rating :modelValue="item.rate" :cancel="false" :readOnly="true" class="p-mt-2"/>
      <h1>{{item.name}}</h1>
      <h4>{{currencyFilter(item.price)}}</h4>
      <p>Категория - {{getFilterStaticLabel(item.category, 'categories')}}</p>
      <p>Тип - {{getFilterStaticLabel(item.type, 'types')}}</p>
      <p>Описание - {{item.descr}}</p>
      <div class="p-col-2">
        <AddCartButton :item="item" />
      </div>
    </template>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCurrency } from '@/hooks/useCurrency'
import { useCatalog } from '@/hooks/useCatalog'
import AddCartButton from '@/components/AddCartButton'

export default {
  name: 'ProductPage',
  components: {
    AddCartButton
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const { currencyFilter } = useCurrency()
    const { fetchFiltersStatic } = useCatalog()

    const fetchItem = async () => {
      await store.dispatch('item/fetchItem', route.params.id)
    }

    fetchItem()
    fetchFiltersStatic()

    const item = computed(() => store.state.item.item)
    const isLoading = computed(() => store.state.item.isLoading)

    const getFilterStaticLabel = (code, key) => {
      return store.getters['items/getFilterStaticLabel'](code, key)
    }

    return {
      item,
      isLoading,
      currencyFilter,
      getFilterStaticLabel
    }
  }
}
</script>
