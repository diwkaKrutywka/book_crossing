<template>
  <div class="collections">
    <div class="card" v-for="(item, index) in dataList">
      <div style="margin-right: 140px; text-align: center">
        <img :src="item.image" />
        <h1>{{ item.title }}</h1>
      </div>
      <div class="top">
        <div style="top: 0">
          <div style="display: flex; justify-content: space-between">
            <h2>Available</h2>
            <LikedBooks :book-id="item.id"></LikedBooks>
          </div>
          <h3><span>Author: </span>Denis Ramphil</h3>
          <h3><span>Genre: </span>Драма</h3>
          <p>{{ item.description }}</p>
        </div>
        <div class="bottom">
          <!-- <a-progress :percent="99" style="width: 80%" /> -->
          <div style="background-color: #f89e0f; height: 7px; width: 70%"></div>
          <h5>Go To Exchange</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
import LikedBooks from '@/components/LikedBooks.vue'
export default {
  components: {
    LikedBooks
  },
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
      AuthApi('users/liked-books', {}, 'GET').then((res) => {
        if (res) {
          this.dataList = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">

.collections{
  max-width: 1300px; 
  height: 100vh; 
  overflow-y: scroll;  
  padding: 20px;
  margin: 50px;
}

.collections::-webkit-scrollbar {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
.card {
  display: flex;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 16px;
  margin-bottom: 50px;
  img {
    height: 200px;
  }
}
.top {
  display: flex;
  flex-direction: column;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  bottom: 0;
}
h1 {
  color: #393280;
  font-size: 12px;
  margin-top: 10px;
  font-weight: 800;
}
h2 {
  color: #006b61;
  font-size: 16px;
}
h5 {
  color: #006b61;
  font-weight: 800;
}
</style>
