<template>
  <LendingPage v-if="!hasLogin"></LendingPage>
  <LendingUser v-if="hasLogin"></LendingUser>
</template>
<script>
import LendingPage from '@/views/quizz/LendingPage.vue'
import LendingUser from '@/views/quizz/LendingUser.vue'
export default {
  components: {
    LendingPage,
    LendingUser
  },
  computed: {
    hasLogin() {
      return this.$store.hasLogin
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
