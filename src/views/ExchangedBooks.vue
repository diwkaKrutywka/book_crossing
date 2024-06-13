<template>
  <div style="height: 100vh">
    <div class="card" v-for="(item, index) in dataList" :key="index">
      <div style="display: flex; width: 500px; justify-content: space-between; margin: auto">
        <div>
          <div class="carousel-item">
            <div
              style="
                padding: 20px;
                box-shadow:
                  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                  rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
              "
            >
              <img style="height: 170px" :src="item.receiver_book.image" alt="Book Image" />
            </div>
            <h3 style="color: #006b61; margin-top: 20px">{{ item.title }}</h3>
          </div>
        </div>
        <span class="material-symbols-outlined" style="align-items: center">
          published_with_changes
        </span>
        <div>
          <div class="carousel-item">
            <div
              style="
                padding: 20px;
                box-shadow:
                  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                  rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
              "
            >
              <img style="height: 170px" :src="item.sender_book.image" alt="Book Image" />
            </div>
            <h3 style="color: #006b61; margin-top: 20px">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      <div>
        <h1>Congratulations!!!</h1>
        You to excahnged books with
        <h1>{{ item.user.username }}</h1>
        <h2>Use this phone number to contact</h2>
        <a
          style="
            display: block;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            border-radius: 8px;
            padding: 5px;
            background: #389ce9;
            text-decoration: none;
            color: #fff;
          "
          href="{{item.user.phone}}"
          target="_blank"
          ><svg
            style="width: 30px; height: 20px; vertical-align: middle; margin: 0px 5px"
            viewBox="0 0 21 18"
          >
            <g fill="none">
              <path
                fill="#ffffff"
                d="M0.554,7.092 L19.117,0.078 C19.737,-0.156 20.429,0.156 20.663,0.776 C20.745,0.994 20.763,1.23 20.713,1.457 L17.513,16.059 C17.351,16.799 16.62,17.268 15.88,17.105 C15.696,17.065 15.523,16.987 15.37,16.877 L8.997,12.271 C8.614,11.994 8.527,11.458 8.805,11.074 C8.835,11.033 8.869,10.994 8.905,10.958 L15.458,4.661 C15.594,4.53 15.598,4.313 15.467,4.176 C15.354,4.059 15.174,4.037 15.036,4.125 L6.104,9.795 C5.575,10.131 4.922,10.207 4.329,10.002 L0.577,8.704 C0.13,8.55 -0.107,8.061 0.047,7.614 C0.131,7.374 0.316,7.182 0.554,7.092 Z"
              ></path>
            </g></svg
          >Telegram</a
        >
      </div>
    </div>
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
    this.getData()
  },
  methods: {
    getData() {
      AuthApi('books/exchanges', {}, 'GET').then((res) => {
        if (res) {
          this.dataList = JSON.parse(JSON.stringify(res.data.Result))
          console.log(this.dataList)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 800px;
  padding: 30px;
  margin: 20px auto;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  border: 1px #1f1f1f solid;
}
.carousel-item {
  flex: 0 0 auto;
  height: 260px;
  max-width: 200px;
  display: block;
  text-align: center;
  margin-right: 30px;
}
</style>
