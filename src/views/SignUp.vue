<script>
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
import SignUp from '@/components/signup/SignUpForm'

export default {
  components: { SignUp },
  setup() {
    return { collapsed, toggleSidebar }
  }
}
</script>

<template>
  <h1>SignUp form</h1>
  <SignUp />
</template>

