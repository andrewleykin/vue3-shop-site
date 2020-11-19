<template>
  <div class="profile-page">
    <h1>{{user.name}}</h1>
    <a :href="`mailto:${user.email}`">{{user.email}}</a>
    <p>{{user.about}}</p>
  </div>
</template>

<script>
import { useUser } from '@/hooks/useUser'

export default {
  name: 'ProfilePage',
  setup () {
    const { user, checkProfilePage } = useUser()

    checkProfilePage()

    return { user }
  }
}
</script>
