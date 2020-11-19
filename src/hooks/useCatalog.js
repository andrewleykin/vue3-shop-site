import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export function useCatalog () {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const items = computed(() => store.state.items)
  const catalogItems = computed(() => items.value.items)
  const isLoading = computed(() => items.value.isLoading)
  const filters = computed(() => items.value.filters)
  const filtersStatic = computed(() => items.value.filtersStatic)
  const totalItems = computed(() => items.value.totalItems)

  const fetchItems = () => {
    store.dispatch('items/fetchItems')
  }

  const setFilters = (filtersItem) => {
    store.dispatch('items/setFilters', filtersItem)

    router.push({ name: 'CatalogPage', query: { ...filters.value } })
  }

  const changeFiltersHandler = (key, value) => {
    if (filters.value._page !== 1) {
      setFilters({ key: '_page', value: 1, isNotFetch: true })
    }

    setFilters({ key, value })

    if (key === '_sort' && value === null) {
      setFilters({ key: '_order', value: 'asc', isNotFetch: true })
    }
  }

  const isVisibleClearBtn = computed(() => filters.value.category || filters.value.type || filters.value._sort)
  const clearFilters = () => {
    store.dispatch('items/clearFilters')
    router.push({ name: 'CatalogPage' })
  }

  const checkRoute = () => {
    if (!route.query._limit || !route.query._page) {
      return
    }

    store.commit('items/setFilters', {
      ...route.query,
      _limit: +route.query._limit,
      _page: +route.query._page
    })
  }

  const fetchFiltersStatic = async () => {
    if (filtersStatic.value.categories.length === 0) {
      await store.dispatch('items/fetchFiltersStatic')
    }
  }

  return { fetchItems, catalogItems, isLoading, setFilters, filters, totalItems, changeFiltersHandler, clearFilters, isVisibleClearBtn, checkRoute, fetchFiltersStatic, filtersStatic }
}
