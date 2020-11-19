<template>
  <div class="p-field">
    <label :for="id" v-if="label && label.length > 0">{{label}}</label>
    <InputMask
      :id="id"
      v-model="value"
      mask="+7 (999) 999-9999"
      placeholder="+7 (999) 999-9999"
      v-if="isPhone"
    />
    <InputText
      :id="id"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      :aria-describedby="`${id}-help`"
      :class="{'p-invalid': v && v.$dirty && v.$error}"
      v-else
    />
    <small
      :id="`${id}-help`"
      class="p-invalid"
      v-if="v && v.$dirty && v.$error"
    >{{v.$errors[0].$message}}</small>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'FormField',
  emits: ['update:modelValue'],
  props: {
    label: String,
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    modelValue: String,
    isPhone: Boolean,
    v: Object
  },
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
