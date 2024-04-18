<template>
  <div>
    <div class="card">
      <div class="head">
        <h1>Quizz of book {{}}</h1>
        <a-rate value="5" allow-half />
      </div>
      <h3>Read the following instructions</h3>
      <div class="about"></div>
      <div class="instruction">
        <h2>Instructions</h2>
        <p>
          This quiz consists of 5 multiple-choice questions. To be successful with the quizzes, it’s
          important to conversant with the topics. Keep the following in mind:
          <br />
          Timing - You need to complete each of your attempts in one sitting, as you are allotted 30
          minutes to each attempt. Answers - You may review your answer-choices and compare them to
          the correct answers after your final attempt.
          <br />
          To start, click the "Start" button. When finished, click the "Submit " button.
        </p>
        <div style="display: flex; justify-content: end">
          <a-button style="width: 100px" size="large" type="primary" @click="onStart()"
            >Start</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
export default {
  data() {
    return {
      qId: null,
      info: {}
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (id) {
      this.qId = id
      this.onLoad()
    }
  },
  methods: {
    onLoad() {
      let path = 'quizzes/' + this.qId
      console.log(path)
      AuthApi(path, '', 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.info = res.data
        }
      })
    },
    onStart() {}
  }
}
</script>
<style scoped lang="scss">
.card {
  max-width: 900px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 30px;
  .head {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 25px;
      font-weight: 900;
    }
  }
  .instruction {
    h2 {
    }
  }
}
</style>
