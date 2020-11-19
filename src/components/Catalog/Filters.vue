<template>
  <div class="catalog-filters">
    <h3>Фильтры</h3>
    <div class="p-field-radiobutton" v-for="t in filtersStatic.types" :key="t.code">
      <RadioButton name="type" :id="t.code" :value="t.code" :modelValue="filters.type" @input="filtersHandler('type', $event.target.value)" />
      <label :for="t.code">{{t.name}}</label>
    </div>
    <div class="p-field">
      <Dropdown :modelValue="filters.category" @change="filtersHandler('category', $event.value)" :options="filtersStatic.categories" optionLabel="name" placeholder="Категория" style="width: 100%;" :showClear="true" optionValue="code"/>
    </div>
    <div class="p-field">
      <Dropdown :modelValue="filters._sort" @change="filtersHandler('_sort', $event.value)" :options="filtersStatic.sorts" optionLabel="name" placeholder="Сортировать" style="width: 100%;" :showClear="true" optionValue="code"/>
    </div>
    <template v-if="filters._sort">
      <div class="p-field-radiobutton" v-for="o in orders" :key="o.code" >
        <RadioButton name="_order" :id="o.code" :value="o.code" :modelValue="filters._order" @input="filtersHandler('_order', $event.target.value)" />
        <label :for="o.code">{{o.name}}</label>
      </div>
    </template>
    <BButton label="Сбросить" icon="pi pi-times" iconPos="right" class="p-button-secondary" @click="clearFilters" v-if="isVisibleClearBtn" />
  </div>
</template>

<script>
import { useCatalog } from '@/hooks/useCatalog'

export default {
  name: 'CatalogFilters',
  setup () {
    const { filters, changeFiltersHandler, clearFilters, isVisibleClearBtn, fetchFiltersStatic, filtersStatic } = useCatalog()

    fetchFiltersStatic()

    const orders = [
      { name: 'К большему', code: 'asc' },
      { name: 'К меньшему', code: 'desc' }
    ]

    return {
      filters,
      filtersStatic,
      orders,
      filtersHandler: changeFiltersHandler,
      clearFilters,
      isVisibleClearBtn
    }
  }
}
</script>
