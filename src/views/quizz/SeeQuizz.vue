<template>
  <div style="max-width: 1200px; margin: auto">
    <div class="card">
      <div class="head">
        <h1 v-if="info.book">Quizz of book " {{ info.book.title }} "</h1>
        <a-rate :value="value" allow-half />
      </div>
      <h3>Read the following instructions</h3>
      <div v-if="info.book" class="about">
        <img :src="info.book.image" />
        <div v-if="info.book">
          <h2>Date: {{ $timeFormat(info.created_at, 1) }}</h2>
          <h2>Language: {{ info.book.language }}</h2>
          <h2>Attemts: Once</h2>
        </div>
      </div>
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
          <a-button style="width: 100px" size="large" type="primary" danger @click="onDelete()"
            >Delete</a-button
          >
          <a-button
            style="width: 100px; margin-left: 30px"
            size="large"
            type="primary"
            @click="onStart()"
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
      info: {},
      value: 5
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
      let path = 'quizzes/' + this.qId + '/view'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.info = res.data.result
          // console.log(this.info)
        }
      })
    },
    onStart() {
      this.$router.push({
        name: 'AnswerQuestion',
        params: {
          id: this.qId
        }
      })
    },
    onDelete() {
      let path = 'quizzes/' + this.qId
      AuthApi(path, {}, 'DELETE').then((res) => {
        if (res) {
          this.$router.push({
            name: 'LendingPage'
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  max-width: 900px;
  margin: auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 30px;
  .head {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 25px;
      font-weight: 900;
      color: #696f79;
    }
    h3 {
      color: #696f79;
    }
  }
  .instruction {
    margin-top: 20px;
    br {
      margin-top: 20px;
    }
    h2 {
      font-size: 20px;
      color: #696f79;
    }
    p {
      color: #696f79;
    }
  }
  .about {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    img {
      width: 130px;
    }
    h2 {
      font-size: 15px;
      color: #696f79;
      margin-right: 150px;
    }
  }
}
</style>
