<template>
  <Paginator
    :rows="filters._limit"
    :totalRecords="totalItems"
    :pageLinkSize="pageLinkSize"
    :rowsPerPageOptions="[10,20]"
    :alwaysShow="false"
    @page="onPage($event)"
    :first="filters._page*10-10"
  />
</template>

<script>
import { useCatalog } from '@/hooks/useCatalog'

export default {
  name: 'CatalogPaginator',
  props: {
    pageLinkSize: {
      type: Number,
      default: 5
    }
  },
  setup () {
    const { setFilters, filters, totalItems } = useCatalog()

    const onPage = (e) => {
      setFilters({
        key: '_limit',
        value: e.rows,
        isNotFetch: true
      })
      setFilters({
        key: '_page',
        value: ++e.page
      })
    }

    return {
      onPage,
      filters,
      totalItems
    }
  }
}
</script>
