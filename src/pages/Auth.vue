<template>
  <div class="auth-page">
    <h1>Добро пожаловать</h1>
    <FormWrap @submited="onSubmit">
      <FormField label="Email" id="email" v-model="email" :v="v.email" />
      <FormField label="Пароль" id="password" v-model="password" type="password" :v="v.password"/>
      <template #actions>
        <BButton type="submit">Войти</BButton>
        <AppLink :to="{name: 'RegistartionPage', query: $route.query}">
          Регистрация
        </AppLink>
      </template>
    </FormWrap>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email as emailValidators, required, minLength } from '@vuelidate/validators'
import { useUser } from '@/hooks/useUser'

import FormField from '@/components/FormField'
import AppLink from '@/components/AppLink'
import FormWrap from '@/components/FormWrap'

export default {
  name: 'AuthPage',
  components: {
    FormField,
    AppLink,
    FormWrap
  },
  setup (props, ctx) {
    const { apiAuth } = useUser()
    const email = ref('')
    const password = ref('')

    const rules = {
      password: { required, minLength: minLength(6) },
      email: { required, emailValidators }
    }

    const v = useVuelidate(rules, { password, email })

    const onSubmit = async () => {
      v.value.$touch()
      if (v.value.$error) return

      await apiAuth({
        type: 'apiLogin',
        payload: {
          email: email.value,
          password: password.value
        }
      })
    }

    return {
      email, password, onSubmit, v
    }
  }
}
</script>

<style lang="stylus">
.auth-page
  width 100%
  max-width 450px
</style>
