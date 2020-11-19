import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    isLoading: false,
    filters: {
      _limit: 10,
      _page: 1,
      category: null,
      type: null,
      _sort: null,
      _order: 'asc',
      q: null
    },
    filtersStatic: {
      categories: [],
      sorts: [],
      types: []
    },
    totalItems: 40
  },
  getters: {
    getFilterStaticLabel: state => (code, key) => {
      const filtersStatic = state.filtersStatic[key]
      const filtersStaticItem = filtersStatic.find(el => el.code === code)

      return filtersStaticItem ? filtersStaticItem.name : ''
    }
  },
  mutations: {
    setItems (state, items) { state.items = items },
    setIsLoading (state, isLoading) { state.isLoading = isLoading },
    setFilters (state, filters) { state.filters = filters },
    setFiltersItem (state, { key, value }) { state.filters[key] = value },
    setTotalItems (state, totalItems) { state.totalItems = totalItems },
    setFiltersStatic (state, filtersStatic) { state.filtersStatic = filtersStatic }
  },
  actions: {
    async fetchItems ({ commit, state }) {
      commit('setIsLoading', true)
      await axios.get('/items', { params: { ...state.filters } }).then((res) => {
        commit('setItems', res.data)
        commit('setTotalItems', state.filters.q ? 10 : state.filters.type || state.filters.category ? 20 : 40)
        commit('setIsLoading', false)
      }).catch(() => {
        commit('setIsLoading', false)
      })
    },
    async fetchFiltersStatic ({ commit }) {
      await axios.get('/filters').then((res) => {
        commit('setFiltersStatic', res.data)
      })
    },
    setFilters ({ dispatch, commit }, payload) {
      commit('setFiltersItem', payload)
      if (payload && !payload.isNotFetch) {
        dispatch('fetchItems')
      }
    },
    clearFilters ({ commit, state, dispatch }) {
      commit('setFilters', {
        _limit: state.filters._limit,
        _page: 1,
        category: null,
        type: null,
        _sort: null,
        _order: 'asc',
        q: null
      })

      dispatch('fetchItems')
    }
  }
}
