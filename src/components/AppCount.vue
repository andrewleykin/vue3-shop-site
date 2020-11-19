<template>
  <InputNumber v-model="value" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="min" :max="99" />
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'AppCount',
  props: {
    min: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const value = ref(props.modelValue)

    watch(value, value => {
      emit('update:modelValue', value)
    })

    return {
      value
    }
  }
}
</script>
