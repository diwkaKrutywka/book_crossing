<template>
  <div style="max-width: 1200px; margin: 40px auto; text-align: center">
    <h1>
      Welcome to really awesome <br />
      Book Quiz experience
    </h1>
    <h3>
      Our mission is simple: to promote a love of reading and <br />
      cultivate a community of creative and critical thinkers.
    </h3>
    <div>
      <img style="width: 50px; margin: 80px 0" src="@/assets/images/icon.svg" />
    </div>
    <div style="width: 500px; display: flex; justify-content: space-between; margin: 30px auto">
      <a-button size="large" type="primary" style="width: 200px" @click="createQuizz()"
        >Create a quizz</a-button
      >
      <a-button size="large" type="primary" style="width: 200px" @click="takeQuizz()"
        >Take a quizz</a-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    createQuizz() {
      this.$router.push({
        name: 'LoginView'
      })
    },
    takeQuizz() {}
  }
}
</script>
<style scoped lang="scss">
h1 {
  font-family: Poppins;
  font-size: 45px;
}
h3 {
  font-family: Poppins;
  margin-top: 40px;
  font-size: 20px;
  color: #006b61;
}
</style>
