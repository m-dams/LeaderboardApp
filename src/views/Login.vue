<script>
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
import Login from '@/components/login/LoginForm'

export default {
  components: { Login },
  setup() {
    return { collapsed, toggleSidebar }
  }
}
</script>

<template>
  <h1>Login form</h1>
  <Login />
</template>

