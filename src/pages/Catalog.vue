<template>
  <div class="catalog">
    <div class="p-grid">
      <div class="p-col-3">
        <CatalogFilters />
      </div>
      <div class="p-col-8">
        <CatalogTop />
        <ProgressSpinner v-if="isLoading" />
        <div class="p-grid" v-else>
          <div class="p-col-4" v-for="item in catalogItems" :key="item.id">
            <CatalogCard :item="item" />
          </div>
        </div>
        <CatalogPaginator />
      </div>
    </div>
  </div>
</template>

<script>
import { useCatalog } from '@/hooks/useCatalog'
import CatalogFilters from '@/components/Catalog/Filters'
import CatalogTop from '@/components/Catalog/Top'
import CatalogCard from '@/components/Catalog/Card'
import CatalogPaginator from '@/components/Catalog/Paginator'

export default {
  name: 'CatalogPage',
  components: { CatalogFilters, CatalogTop, CatalogCard, CatalogPaginator },
  setup () {
    const { fetchItems, catalogItems, isLoading, checkRoute } = useCatalog()

    checkRoute()
    fetchItems()

    return {
      catalogItems,
      isLoading
    }
  }
}
</script>
