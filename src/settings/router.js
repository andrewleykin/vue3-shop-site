import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title

  if (to.meta.requiresAuth) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.getters.isAuth && !localStorage.getItem('user-token')) {
      next({
        name: 'AuthPage',
        query: {
          redirect: to.fullPath
        }
      })
      return false
    } else {
      next()
      return false
    }
  }
  next()
})
