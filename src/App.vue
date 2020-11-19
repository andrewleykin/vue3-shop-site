<template>
  <component :is="layout">
    <Toast />
    <router-view/>
  </component>
</template>

<script>
import { useRoute } from 'vue-router'
import { useUser } from '@/hooks/useUser'
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout
  },
  setup () {
    const { getUser } = useUser()
    const s = useStore()
    const route = useRoute()
    const layout = computed(() => `${route.meta.layout || 'main'}-layout`)
    const store = computed(() => s.state)

    getUser()

    return {
      layout,
      store
    }
  }
}
</script>

<style lang="stylus">
html
  height 100%

body
  margin 0
  padding 0
  height 100%

#app
  height 100%
  font-family Roboto, sans-serif

a
  text-decoration none

.p-inputnumber-input
  width 100%
</style>
