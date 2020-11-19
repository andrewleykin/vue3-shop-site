<template>
  <div class="p-grid p-ai-center p-jc-between">
    <div class="p-col-4">
      <form @submit.prevent="onSearch">
        <div class="p-inputgroup">
          <InputText placeholder="Поиск" v-model="search"/>
          <BButton icon="pi pi-search" class="p-button-warning" type="submit" />
        </div>
      </form>
    </div>
    <CatalogPaginator :pageLinkSize="3" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCatalog } from '@/hooks/useCatalog'
import CatalogPaginator from '@/components/Catalog/Paginator'

export default {
  name: 'CatalogTop',
  components: {
    CatalogPaginator
  },
  setup () {
    const { changeFiltersHandler } = useCatalog()
    const search = ref('')
    const onSearch = () => {
      changeFiltersHandler('q', search.value)
    }

    return {
      search,
      onSearch
    }
  }
}
</script>
