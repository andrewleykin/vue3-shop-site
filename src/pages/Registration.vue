<template>
  <div class="registration-page">
    <h1>Регистрация</h1>
    <FormWrap @submited="onSubmit">
      <FormField label="Email" id="email" v-model="email" :v="v.email" />
      <FormField label="Пароль" id="password" type="password" v-model="password" :v="v.password" />
      <FormField label="Имя" id="name" v-model="name" :v="v.name" />
      <template #actions>
        <BButton type="submit">Регистрация</BButton>
        <AppLink :to="{name: 'AuthPage', query: $route.query}">
          Вход
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
  name: 'RegistrationPage',
  components: {
    FormField,
    AppLink,
    FormWrap
  },
  setup () {
    const { apiAuth } = useUser()
    const email = ref('')
    const password = ref('')
    const name = ref('')

    const rules = {
      password: { required, minLength: minLength(6) },
      email: { required, emailValidators },
      name: { required }
    }

    const v = useVuelidate(rules, { password, email, name })

    const onSubmit = async () => {
      v.value.$touch()
      if (v.value.$error) return

      await apiAuth({
        type: 'apiRegister',
        payload: {
          email: email.value,
          password: password.value,
          name: name.value
        }
      })
    }

    return {
      email, password, onSubmit, name, v
    }
  }
}
</script>

<style lang="stylus">
.registration-page
  width 100%
  max-width 450px
</style>
