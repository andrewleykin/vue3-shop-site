<template>
  <router-link :class="`p-button p-component p-button-link ${classes}`" :to="to">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: {
      type: [String, Object],
      default: '/'
    },
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>
