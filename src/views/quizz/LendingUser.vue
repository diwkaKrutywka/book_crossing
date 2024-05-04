<template>
  <div>
    <div class="menu">
      <a-button class="bt" type="primary" @click="quizzList()">Quizzes</a-button>
      <a-button class="bt" type="primary" @click="createQuizz()">Create quizz</a-button>
      <a-button class="bt" type="primary" @click="myQ()">My quizzes</a-button>
      <!-- <a-button >History of quizzes</a-button> -->
    </div>

    <div class="box-2">
      <div style="position: relative; width: 100%; z-index: 3">
        <div class="box3">
          <a-input-search
            v-model:value="keyWord"
            placeholder="Search"
            style="width: 300px; margin: 30px 0"
            @search="getCategory()"
          />

          <h1>Quizzes</h1>

          <div style="margin: 30px 40px">
            <a-row :gutter="[16, 16]">
              <a-col :xs="8" :lg="8" :md="8" v-for="item in dataList">
                <div
                  style="
                    padding: 13px 0 0 0;
                    width: 200px;
                    background-color: white;
                    border-radius: 0 0 20px 20px;
                    box-shadow:
                      rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
                    text-align: center;
                  "
                >
                  <div
                    style="
                      color: black;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 0 15px;
                    "
                  >
                    <h3>{{ item.questions_count }} questions</h3>
                    <span
                      >{{ item.rating }}<a-rate :count="count" :value="value" allow-half
                    /></span>
                  </div>
                  <img style="height: 200px" :src="item.book.image" />

                  <div
                    style="
                      background-color: #006b61;
                      color: white;
                      text-align: center;
                      padding: 10px;
                      border-radius: 0 0 20px 20px;
                    "
                  >
                    <h3 @click="takeQ(item.id)">Take quizz</h3>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            right: -240px;
            z-index: -1;
            position: absolute;
            top: 0;
          "
        >
          <a-button
            v-for="(item, index) in categoryList"
            size="large"
            style="width: 250px; margin-top: 20px"
            type="primary"
            :key="index"
            >{{ item.name }}</a-button
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
      dataList: [],
      categoryList: [],
      keyWord: '',
      count: 1,
      value: 1
    }
  },
  mounted() {
    this.getCategory()
    this.onLoad()
  },
  methods: {
    takeQ(e) {
      this.$router.push({
        name: 'TakeQuizz',
        params: {
          id: e
        }
      })
    },
    getCategory() {
      AuthApi('categories', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.categoryList = JSON.parse(JSON.stringify(res.data.categories))
        }
      })
    },
    onLoad() {
      AuthApi('quizzes', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.dataList = JSON.parse(JSON.stringify(res.data.result.quizzes))
          // console.log(this.dataList)
        }
      })
    },
    onSearch() {},
    myQ() {
      this.$router.push({
        name: 'MyQuizz'
      })
    },
    createQuizz() {
      this.$router.push({
        name: 'CreateQuizz'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.menu {
  max-width: 700px;
  display: flex;
  justify-content: space-around;
  margin: 0px auto 30px auto;

  .bt {
    width: 200px;
  }
}
.box-2 {
  display: flex;
  max-width: 1000px;
  margin: auto;
  z-index: -99;
  justify-content: space-between;
  .box3 {
    z-index: 1;
    min-height: 800px;
    background-color: #fef7eb;
    border: 16px;
    text-align: center;
    // width: 800px;
    border-radius: 20px;
    h1 {
      font-size: 25px;
      font-weight: 900;
    }
  }
}
</style>
