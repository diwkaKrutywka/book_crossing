<template>
  <div style="max-width: 1200px; position: relative" class="friend">
    <div class="bg-friends"></div>
    <div class="card">
      <div class="friend-info">
        <div class="friend-profile">
          <img src="@/assets/images/person.svg" />
          <h4>{{ info.username }}</h4>
          <h4>{{ info.email }}</h4>
          <button @click="addFriend()" v-if="info.friend_status == 'not_friends'" class="btn">
            Add To Friends
          </button>
          <button v-if="info.friend_status == 'friends'" class="btn">Your Friend</button>
          <button type="primary" disabled v-if="info.friend_status == 'request_sent'" class="btn">
            You have sent request
          </button>
          <button
            @click="onAccept(info.id)"
            v-if="info.friend_status == 'request_received'"
            class="btn"
          >
            Accept to friends
          </button>
        </div>
        <div style="display: flex; flex-direction: column">
          <span style="display: flex; justify-content: space-between; font-size: 15px">
            <b>Favourite genre of books:</b>
            <!-- <span>
                <span v-for="fav in info.favs">{{ fav }}, </span></span
              >-->
          </span>
          <span
            style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 15px"
          >
            <b>Friends:</b>
            <span>{{ info.friends }}</span>
          </span>
          <span
            style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 15px"
          >
            <b>City:</b>
            <span>{{ info.city }}</span>
          </span>
        </div>
        <div>
          <h3 style="font-size: 20px">
            Книжная полка
            <img src="@/assets/images/book-square.svg" style="width: 25px" />
          </h3>
          <table>
            <tr>
              <td></td>
              <td>Всего</td>
              <td>in month</td>
            </tr>
            <tr>
              <td>Uploaded books</td>
              <td>{{ info.books_count }}</td>
              <td>4</td>
            </tr>
            <tr style="background-color: #f89e0f; height: 5px; margin: 5px 0"></tr>
            <tr>
              <td>Exchange books</td>
              <td>{{ info.share_count }}</td>
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
      <div class="friend-book__collections">
        <div style="display: flex; text-align: left; width: 100%">
          <h1 style="font-size: 25px; font-weight: 900">{{ $t('l_Books') }}</h1>
        </div>
        <div class="friend-book__list">
          <a-row :gutter="[16, 16]">
            <a-col :xs="8" :lg="8" :md="8" v-for="item in stockList">
              <div class="book">
                <span style="color: #393280">Michelle Obama</span>
                <img
                  style="height: 200px; width: 150px"
                  :src="item.image_url"
                  @click="goExchange(item.book.id)"
                />
                <h3 style="color: #f89e0f; text-align: end" @click="goExchange(item.book.id)">
                  Go To Exchange
                </h3>
              </div>
            </a-col>
          </a-row>
        </div>
        <!-- <button class="btn" style="align-self: flex-end">See more</button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
import { message } from 'ant-design-vue'

export default {
  data() {
    return {
      userId: null,
      bookId: null,
      stockList: [],
      bookL: [],
      info: {}
    }
  },
  mounted() {
    let userId = this.$route.params.id
    if (userId) {
      this.userId = userId
      this.getUserInfo()
      this.onLoad()
    }
  },
  methods: {
    onAccept(e) {
      let path = 'users/friends/' + e + '/accept'
      AuthApi(path, {}, 'PUT').then((res) => {
        if (res) {
          message.success('You have 1 more friend!')
          this.onLoad()
        }
      })
    },
    onLoad() {
      let path = 'users/' + this.userId + '/stock'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.stockList = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    getUserInfo() {
      let path = 'users/' + this.userId
      AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.info = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    getBook() {
      let path = 'books/' + this.bookId + '/stock'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.bookL = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    addFriend() {
      let path = 'users/friends/' + this.userId + '/request'
      AuthApi(path, {}).then((res) => {
        if (res.data.message == 'success') {
          message.success('You have sent request to friends')
          this.onLoad()
        }
      })
    },
    goExchange(id) {
      this.$router.push({
        name: 'AboutPerson',
        params: {
          bookId: id,
          userId: this.userId
        }
      })
    },
    reqExchange() {
      let path = 'books/' + this.bookId + '/request'
      AuthApi(path, {}).then((res) => {
        if (res.data.message == 'success') {
          message.success('You have sent request to exchange')
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
  width: 100vw;
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
    grid-template-rows: 1fr 1.7fr 1fr;
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
</style>
