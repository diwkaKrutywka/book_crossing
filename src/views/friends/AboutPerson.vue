<template>
  <div style="max-width: 1200px; position: relative" class="friend">
    <div class="bg-friends"></div>
    <div class="card">
      <div class="friend-info">
        <div class="friend-profile">
          <img src="@/assets/images/person.svg" />
          <h4>{{ info.name }}</h4>
          <h4>{{ info.nickname }}</h4>
          <button @click="addFriend()" class="btn">Add To Friends</button>
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
            <span>{{ info.friends }}</span>
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
      <div class="friend-book__current">
        <h1>Книга, которая вы рассматриваете сейчас</h1>
        <div class="book">
          <span
            style="color: black; display: flex; justify-content: end"
            class="material-symbols-outlined"
          >
            favorite
          </span>
          <img style="height: 200px" src="@/assets/images/book5.svg" />
          <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
        </div>
        <button @click="reqExchange()" class="btn">Отправить запрос на обмен</button>
      </div>
      <div class="friend-book__collections">
        <h1>Еще больше книг этого пользователя:</h1>
        <div class="friend-book__list">
          <div class="book" v-for="index in [1, 2, 3, 4]">
            <span style="color: #393280">Michelle Obama</span>
            <img style="height: 200px" src="@/assets/images/book5.svg" />
            <h3>Go To Exchange</h3>
          </div>
        </div>
        <button class="btn" style="align-self: flex-end">See more</button>
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
      info: {
        // name: 'Aruzhan',
        // nickname: '@arujka03',
        // favs: ['fantasy', 'psychology'],
        // friends: 10,
        // books: 8,
        // exchange: 4
      },
      book: {}
    }
  },
  mounted() {
    let userId = this.$route.params.userId
    let bookId = this.$route.params.bookId
    if (userId && bookId) {
      this.userId = userId
      this.bookId = bookId
      this.onLoad()
      this.getBook()
    }
  },
  methods: {
    onLoad() {
      let path = 'users/' + this.userId + '/stock'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.info = JSON.parse(JSON.stringify(res.data.result))
          console.log(this.book)
        }
      })
    },
    getBook() {
      let path = 'books/' + this.bookId
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.book = JSON.parse(JSON.stringify(res.data.result))
          console.log(this.info)
        }
      })
    },
    addFriend() {
      let path = 'users/friends/' + this.userId + '/request'
      AuthApi(path, {}).then((res) => {
        if (res.data.message == 'success') {
          message.success('You have sent request to friends')
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
</style>
