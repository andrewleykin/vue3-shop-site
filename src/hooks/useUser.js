import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getIdByToken } from '@/helpers/getIdByToken'
import { useToastMessage } from '@/hooks/useToastMessage'

export function useUser () {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const { errorToast } = useToastMessage()

  const user = computed(() => store.state.user)
  const isAuth = computed(() => store.getters.isAuth)

  const goToProfileLink = () => {
    router.push(route.query.redirect || { name: 'ProfilePage', params: { id: user.value.id } })
  }

  const apiAuth = async ({ type, payload }) => {
    await store.dispatch(type, payload)
      .then(() => {
        goToProfileLink()
      }).catch((message) => {
        errorToast(message)
      })
  }

  const apiLogout = () => {
    store.dispatch('apiLogout')
    if (route.name !== 'CatalogPage') router.push({ name: 'CatalogPage' })
  }

  const checkProfilePage = () => {
    if (+route.params.id !== user.value.id) router.push({ name: 'CatalogPage' })
  }

  const getUser = async () => {
    if (localStorage.getItem('user-token')) {
      await store.dispatch('apiUserById', getIdByToken(localStorage.getItem('user-token')))
    }
  }

  return { goToProfileLink, user, isAuth, apiAuth, apiLogout, checkProfilePage, getUser }
}
