<template>
  <div style="max-width: 1200px; margin: auto; position: relative" class="friend">
    <div class="bg-friends"></div>
    <div class="card">
      <div class="friend-info">
        <div class="friend-profile">
          <img src="@/assets/images/person.svg" />
          <h4>{{ info.username }}</h4>
          <h4>{{ info.email }}</h4>
        </div>
        <div style="display: flex; flex-direction: column">
          <span style="display: flex; justify-content: space-between">
            <b>Favourite genre of books:</b>
            <span>
              <span v-for="fav in info.favs">{{ fav }}, </span></span
            >
          </span>
          <span style="display: flex; justify-content: space-between">
            <b>Friends:</b>
            <span>{{ info.friend_status }}</span>
          </span>
        </div>
        <div>
          <h3>Книжная полка <img src="@/assets/images/book-square.svg" style="width: 25px" /></h3>
          <table>
            <tr>
              <td></td>
              <td>Всего</td>
              <td>in month</td>
            </tr>
            <tr>
              <td>Uploaded books</td>
              <td>{{ info.books }}</td>
              <td>4</td>
            </tr>
            <tr style="background-color: #f89e0f; height: 5px; margin: 5px 0"></tr>
            <tr>
              <td>Exchange books</td>
              <td>{{ info.exchange }}</td>
              <td>15</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="friend-active">
        <p>Last login: <span style="color: #006b61"> now online</span></p>
        <p>Registered: 7 month ago</p>
      </div>
    </div>

    <div class="friend-book">
      <div></div>
      <div class="box">
        <div style="display: flex; text-align: center; font-weight: 900">
          <h1>Personal Information</h1>
          <!-- <img @click="onEdit()" src="@/assets/images/pencil.svg" /> -->
        </div>
        <div>
          <a-form ref="form" layout="vertical" :model="info">
            <a-form-item :label="$t('l_First_name')">
              <a-input v-model:value="info.username" :disable="edit"></a-input>
            </a-form-item>
            <a-form-item label="Nickname">
              <a-input v-model:value="info.email" :disable="edit"></a-input>
            </a-form-item>
            <a-form-item :label="$t('l_Password')">
              <a-input-password v-model:value="info.password" :disable="edit"></a-input-password>
            </a-form-item>
          </a-form>
          <!-- <a-button v-if="edit" type="primary">Confirm</a-button> -->
        </div>
      </div>
    </div>

    <!-- recomendation -->
    <div class="recomendations">
      <h3>Обновленные книги которые могут вас заинтересовать</h3>
      <div class="carousel-container">
        <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
          <div
            v-for="(item, index) in bookList"
            :key="index"
            class="carousel-item"
            @click="aboutBook(index)"
          >
            <div class="border">
              <img :src="item.image" style="height: 170px" alt="Book Image" />
            </div>
            <h3 style="color: #006b61; margin-top: 20px">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin: 20px auto">
        <span class="material-symbols-outlined md-36" @click="prev()"> west </span>
        <div style="width: 20px"></div>
        <span class="material-symbols-outlined md-36" @click="next()"> east </span>
      </div>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
export default {
  data() {
    return {
      info: {},
      change: false,
      bookList: [],
      currentIndex: 0,
      current: 0,
      edit: true,
      id: this.$store.userInfo.user.id
    }
  },
  mounted() {
    this.getUserData()
    this.onLoad()
  },
  computed: {
    hasLogin() {
      return this.$store.hasLogin
    }
  },
  methods: {
    getUserData() {
      let path = 'users/' + this.id
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.info = JSON.parse(JSON.stringify(res.data.result))
          console.log(this.info)
        }
      })
    },
    onLoad() {
      if (this.bookList.length == 0) {
        AuthApi('books', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.bookList = res.data.result.books
            //   console.log(this.id)
          }
        })
      }
    },
    getUser() {},
    onEdit() {
      this.edit = false
    },
    onChange() {},
    next() {
      if (this.currentIndex < this.bookList.length - 1) {
        this.currentIndex++
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    aboutBook(index) {
      this.$router.push({
        name: 'AboutBook',
        params: {
          id: this.bookList[index].id
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.bg-friends {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-image: url('@/assets/images/bg_friends.jpg');
  // width: 100vw;
  width: 1200px;
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(244, 249, 249, 0.5);
  border-radius: 8px;
  z-index: 4;
}
.border {
  padding: 20px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.friend {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 20px;
  z-index: 4;

  &-info {
    display: grid;
    grid-template-rows: 4fr 1fr 1fr;
    gap: 50px;
  }

  &-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-book {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    padding: 30px;
    z-index: 5;
    align-items: center;

    &__current {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    &__list {
      display: flex;
      justify-content: space-around;
      gap: 20px;
    }

    &__collections {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      gap: 10px;
    }
  }
}

table:first-child {
  td {
    margin: 0;
  }
}

table:last-child {
  tr {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 5px;
  }
}
.btn {
  background-color: #f89e0f;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
}
.book {
  padding: 13px;
  width: 200px;
  margin: auto;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  text-align: center;
  z-index: 5;
}
.box {
  padding: 50px;

  img {
    width: 18px;
  }
  h1 {
    font-size: 22px;

    font-weight: 900;
  }
}

.carousel-container {
  margin-top: 30px;
  position: relative;
  width: 1200px;
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 auto;
  height: 260px;
  max-width: 170px;
  display: block;
  text-align: center;
  // background-color: aqua;
  margin-right: 30px; /* Adjust spacing between items */
}
.recomendations {
  width: 1200px;
  h3 {
    color: #006b61;
    margin-top: 10px;
  }
}
h2 {
  color: black;
  font-size: 25px;
  font-weight: 900;
}
</style>
