<template>
  <div class="out">
    <div style="padding: 70px auto">
      <h1>My quizzes</h1>
    </div>
    <a-row :gutter="[16, 16]" style="margin: auto; max-width: 1200px">
      <a-col :xs="8" :lg="6" :md="8" v-for="item in dataList">
        <div class="card">
          <div class="texts">
            <h3>{{ item.questions_count }} questions</h3>
            <h2>Published</h2>
          </div>
          <img style="height: 200px" :src="item.book.image" />

          <div class="bottom">
            <h3 @click="reviewQ(item.id)">Review</h3>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
export default {
  data() {
    return {
      dataList: []
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      AuthApi('quizzes/user', {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.dataList = JSON.parse(JSON.stringify(res.data.result))
          console.log(this.dataList)
        }
      })
    },
    reviewQ(id) {
      this.$router.push({
        name: 'CreateQuizz',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.out {
  background-color: #fef7eb;
  text-align: center;
  h1 {
    font-size: 25px;
    font-weight: 900;
  }
  .card {
    padding: 13px 0 0 0;
    width: 200px;
    background-color: white;
    border-radius: 0 0 20px 20px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    text-align: center;
    .texts {
      color: black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      h2 {
        color: #006b61;
        font-size: 12px;
      }
      h3 {
        font-size: 12px;
      }
    }
    .bottom {
      background-color: #006b61;
      color: white;
      text-align: center;
      padding: 10px;
      border-radius: 0 0 20px 20px;
    }
  }
}
</style>
