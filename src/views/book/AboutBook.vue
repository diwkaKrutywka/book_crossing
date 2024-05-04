<template>
  <div style="max-width: 1300px; margin: auto">
    <div style="display: flex">
      <div>
        <div class="about">
          <div class="img-box">
            <img style="height: 300px" :src="info.image" />
          </div>
          <div style="display: block; padding: 20px">
            <h1>{{ info.title }}</h1>
            <div style="height: 5px; background-color: #f89e0f; margin-bottom: 10px"></div>
            <h3 v-for="item in info.authors">{{ item.name }}</h3>
            <p style="margin-top: 20px" v-for="item2 in info.categories">
              <span style="color: #006b61; font-weight: 600; font-size: 15px">Genre: </span
              >{{ item2.name }}
            </p>

            <h2>Overview</h2>
            <p>
              {{ info.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="available">
      <p>Available books for exchanging:</p>
      <a-row :gutter="[16, 16]">
        <a-col :xs="6" :lg="6" :md="6" v-for="(item, index) in bookList">
          <div class="card">
            <img class="book" :src="item.book.image" />
            <div class="bottom">
              <h3>@{{ item.user.username }}</h3>
              <img class="img" :src="item.book.image" />
            </div>
            <a-button type="primary" @click="goExchange(index)" class="w-100"
              >Go to exchange</a-button
            >
          </div>
        </a-col>
      </a-row>
    </div>
    <div style="display: flex; margin: 100px 0">
      <div class="reviews">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <div style="display: flex">
            <h2 style="margin-right: 10px">{{ rate }}</h2>
            <a-rate v-model:value="rate" allow-half />
          </div>
          <p>10 reviewers</p>
        </div>
        <div style="padding: 20px">
          <div class="rate">
            <a-rate :value="5" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="4" count="4" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="3" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="2" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="1" />
            <a-progress :percent="30" />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; margin: auto">
        <a-button type="primary">Write a review</a-button>
        <a-button style="margin-top: 20px" type="primary" ghost>See all reviewes</a-button>
      </div>
    </div>

    <div style="margin: 60px 0px">
      <h2 class="letter">Reviews</h2>
      <a-row>
        <a-col :span="12" v-for="item in dataList">
          <div style="display: flex; padding: 30px">
            <div style="margin-right: 30px">
              <img src="@/assets/images/user.svg" />
            </div>
            <div>
              <a-rate :value="item.rate" allow-half></a-rate>
              <p>{{ item.comment }}</p>
              <h3>{{ item.user }}</h3>
              <p>{{ item.createdAt }}</p>
            </div>
            <hr />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
export default {
  data() {
    return {
      rate: 4.6,
      info: {},
      id: null,
      dataList: [],
      bookList: []
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (id) {
      this.id = id
      this.getBook(), this.getStocks()
      // console.log(this.id)
    }
  },
  methods: {
    getBook() {
      let path = 'books/' + this.id
      AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.info = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },

    getStocks() {
      let path = 'books/' + this.id + '/stock'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.bookList = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    goExchange(index) {
      console.log(this.bookList[index].book_id)
      this.$router.push({
        name: 'AboutPerson',
        params: {
          bookId: this.bookList[index].book_id,
          userId: this.bookList[index].user_id
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
h1 {
  color: #006b61;
  font-size: 30px;
  font-weight: 900;
}
.letter {
  color: #006b61;
  justify-content: left;
  font-size: 20px;
  font-weight: 800;
  margin-left: 20px;
}
h2 {
  color: #006b61;
  font-size: 25px;
  font-weight: 700;
}
.about {
  display: flex;
  width: 1200px;
  border: 1px #f1f1f1 solid;
  padding: 20px;
  margin: auto;

  .img-box {
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-right: 60px;
  }
}
.reviews {
  width: 600px;

  .rate {
    display: flex;
  }
}
.available {
  text-align: center;
  margin: auto;
  padding: 100px 0;

  p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 70px;
  }
  .card {
    text-align: center;
    max-width: 170px;
    .book {
      height: 230px;
      position: relative;
    }
    .img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      z-index: 1;
      top: -35px;
      right: -25px;
      position: relative;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
