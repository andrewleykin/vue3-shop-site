<template>
  <div class="main-layout">
    <header>
      <div class="container">
        <Menubar :model="menuItems">
          <template #start>
            <h2 class="p-t-bold p-m-0">V3</h2>
          </template>
          <template #end>
            <router-link :to="{name: 'CartPage'}" class="cart-link p-overlay-badge p-mr-2" v-if="cartsLength > 0">
              {{currencyFilter(cartsTotalSum)}}
              <i class="pi pi-shopping-cart" style="font-size: 2em;"></i>
              <span class="p-badge p-badge-primary">{{cartsLength}}</span>
            </router-link>
            <template v-if="isAuth">
              <BButton :label="user.name" icon="pi pi-angle-down" iconPos="right" class="p-button-link" aria-haspopup="true" aria-controls="profile_menu" @click="toggleProfileMenu" />
              <MenuItem id="profile_menu" ref="profileMenu" :model="profileMenuItems" :popup="true" />
            </template>
            <AppLink :to="{name: 'AuthPage'}" v-else>
              Логин
            </AppLink>
          </template>
        </Menubar>
      </div>
    </header>
    <main class="p-pt-4 p-pb-4">
      <div class="container">
        <slot />
      </div>
    </main>
    <footer>
      <div class="container p-d-flex p-jc-between">
        <p>Copyright {{year}}</p>
        <p>Andrew Leykin</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useCurrency } from '@/hooks/useCurrency'
import { useUser } from '@/hooks/useUser'
import { useCart } from '@/hooks/useCart'
import AppLink from '@/components/AppLink'

export default {
  name: 'MainLayout',
  components: {
    AppLink
  },
  setup () {
    const { user, isAuth, apiLogout } = useUser()
    const { currencyFilter } = useCurrency()
    const { cartsLength, cartsTotalSum } = useCart()
    const year = new Date().getFullYear()

    const menuItems = computed(() => ([
      { label: 'Каталог', to: { name: 'CatalogPage' } },
      { label: 'О нас', to: { name: 'AboutPage' } },
      { label: 'История заказов', to: { name: 'OrderListPage' }, visible: isAuth.value }
    ]))

    const profileMenuItems = computed(() => ([
      { label: 'Профиль', to: `/profile/${user.value.id}`, icon: 'pi pi-user' },
      { label: 'Выйти', command: apiLogout, icon: 'pi pi-power-off' }
    ]))

    const profileMenu = ref(null)
    const toggleProfileMenu = (event) => {
      profileMenu.value.toggle(event)
    }

    return { year, menuItems, profileMenuItems, toggleProfileMenu, profileMenu, currencyFilter, user, isAuth, cartsLength, cartsTotalSum }
  }
}
</script>

<style lang="stylus">
.main-layout
  height 100%
  display flex
  flex-direction column

  header
    background-color #efefef
    .p-menubar
      padding-left 0
      padding-right 0
      background-color transparent

  main
    flex auto

  footer
    padding 20px 0
    background-color #eee

  .container
    max-width 1200px
    margin 0 auto
    padding 0 15px

.cart-link
  color var(--primary-color)
  text-decoration none
</style>
