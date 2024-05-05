<template>
  <div style="max-width: 1200px; margin: auto">
    <div class="card">
      <div class="head" v-if="info.book">
        <h1>Quizz of book " {{ info.book.title }} "</h1>
        <a-rate :value="value" allow-half />
      </div>
      <h3>Answer the questions below</h3>
      <div v-if="info.book" class="about">
        <img :src="info.book.image" />
        <div>
          <h2>Question {{ number }} / {{ info.questions_count }}</h2>
          <div v-if="info.questions[0]">
            <h2>{{ info.questions[number - 1].question }}</h2>

            <div style="margin-top: 30px">
              <h2>Chose answer</h2>
            </div>
            <a-radio
              style="display: flex; margin-top: 20px"
              v-for="option in shuffledOptions(
                info.questions[number - 1].options,
                info.questions[number - 1].answer
              )"
              :key="option"
              :checked="selectedAnswer === option"
              @change="selectedAnswer = option"
              >{{ option }}</a-radio
            >
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: end; margin-top: 30px">
        <a-button
          v-if="number != info.questions_count"
          @click="onNext(info.questions[number - 1].id, selectedAnswer)"
          style="width: 150px"
          type="primary"
          >Next</a-button
        >
        <a-button
          v-if="number == info.questions_count"
          @click="onSubmit(info.questions[number - 1].id, selectedAnswer)"
          style="width: 150px"
          type="primary"
          >Submit</a-button
        >
      </div>
    </div>
    <!-- confirmation -->
    <a-modal v-model:open="open" centered width="350px">
      <template #footer>
        <div style="display: flex; justify-content: space-between">
          <a-button key="no" @click="handleCancel">No</a-button>
          <a-button key="yes" @click="handleOk">Yes</a-button>
        </div>
      </template>
      <div style="text-align: center; margin-bottom: 40px">
        <img style="width: 120px" src="@/assets/images/question.svg" />
        <h2>
          Are you Sure you want <br />
          to submit Quiz?
        </h2>
      </div>
    </a-modal>
    <!-- show result -->
    <a-modal v-model:open="submitted" @ok="handleClose" centered width="350px" :footer="null">
      <div style="text-align: center; margin-bottom: 40px">
        <img style="width: 120px" src="@/assets/images/badge.svg" />
        <h2>Congratulations you have passed</h2>
        <h2>{{ correct }} / {{ total }}</h2>
      </div>
      <div class="rate">
        <h3>Please, rate this question</h3>
        <a-rate v-model:value="rate" allow-half />
        <a-button @click="onRate()" type="primary">Submit</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { AuthApi } from '@/api/auth'
import { message } from 'ant-design-vue'
export default {
  data() {
    return {
      qId: null,
      number: 1,
      info: {},
      value: 5,
      open: false,
      submitted: false,
      user_answers: [],
      selectedAnswer: null,
      correct: null,
      total: null,
      rate: 0
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
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.info = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    onNext(id, selectedAnswer) {
      this.user_answers.push({
        answer: selectedAnswer,
        question_id: id
      })
      this.selectedAnswer = null
      this.number++
    },
    onSubmit(id, selectedAnswer) {
      this.user_answers.push({
        answer: selectedAnswer,
        question_id: id
      })
      this.open = true
    },
    handleCancel() {
      this.open = false
    },
    handleClose() {
      this.submitted = false
    },
    onRate() {
      let path = 'quizzes/' + this.qId + '/rating'
      AuthApi(path, {
        rating: this.rate
      }).then((res) => {
        if (res.data.message == 'success') {
          this.submitted = false
          message.success('Thanks!')
        }
      })
      this.$router.push({
        name: 'LendingPage'
      })
    },
    handleOk() {
      let path = 'quizzes/' + this.qId + '/check'
      AuthApi(path, {
        user_answers: this.user_answers
      }).then((res) => {
        if (res.data.message == 'success') {
          console.log(res)
          this.correct = res.data.Result.correct
          this.total = res.data.Result.total
          this.open = false
          this.submitted = true
        }
      })
    },
    shuffledOptions(options, answer) {
      let wrongOptions = options.filter((option) => option !== answer)
      let shuffled = [...wrongOptions]
      shuffled.push(answer)
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
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
      width: 140px;
      max-height: 200px;
    }
    h2 {
      font-size: 15px;
      color: #696f79;
      margin-right: 150px;
    }
  }
}
.rate {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px #f1f1f1 solid;
  padding: 10px;
}
</style>
