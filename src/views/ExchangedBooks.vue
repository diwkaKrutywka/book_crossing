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
        <h2>{{ item.user.phone }}</h2>
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
