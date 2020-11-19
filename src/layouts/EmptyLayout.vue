<template>
  <div class="empty-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="stylus">
.empty-layout
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background-color #eee
</style>
