<template>
  <div style="max-width: 1300px; margin: auto; padding: 100px 0; min-height: 100vh">
    <div style="text-align: center">
      <h2 style="color: black; font-size: 25px; font-weight: 900">Recently Viewed</h2>
      <div class="carousel-container">
        <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
          <div
            v-for="(item, index) in bookList"
            :key="index"
            class="carousel-item"
            @click="aboutBook(item.id)"
          >
            <div
              style="
                padding: 20px;
                box-shadow:
                  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                  rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
              "
            >
              <img style="height: 170px" :src="item.image" alt="Book Image" />
            </div>
            <h3 style="color: #006b61; margin-top: 20px">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <span class="material-symbols-outlined md-36" @click="prev()"> west </span>
        <div style="width: 20px"></div>
        <span class="material-symbols-outlined md-36" @click="next()"> east </span>
      </div>
    </div>

    <div style="display: flex; margin: 150px 0">
      <div>
        <h2 style="color: black; font-size: 24px; font-weight: 900">Featured books</h2>
        <div
          style="
            display: flex;
            width: 500px;
            box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
            padding: 20px;
            margin-right: 40px;
          "
        >
          <img style="height: 350px; margin-right: 30px" :src="oneBook.image" />
          <div style="display: block">
            <LikedBooks :book-id="oneBook.id"></LikedBooks>
            <h1>{{ oneBook.title }}</h1>
            <p v-for="i in oneBook.categories">{{ i.name }}</p>
            <div style="height: 5px; background-color: #f89e0f"></div>
            <h2>Overview</h2>
            <p>
              {{
                oneBook.description?.length > 220
                  ? oneBook.description.slice(0, 220) + '...'
                  : oneBook.description
              }}
            </p>
            <p>WRITTEN BY</p>
            <h3 v-for="i in oneBook.authors">{{ i.name }}</h3>
          </div>
        </div>
      </div>
      <div>
        <a-row :gutter="[16, 16]">
          <a-col
            :xs="8"
            :lg="6"
            :md="8"
            v-for="(item, index) in recList"
            @click="aboutBook(item.id)"
            ><img style="height: 200px; margin-right: 30px" :src="item.image"
          /></a-col>
        </a-row>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around">
      <div
        style="padding: 30px; border: 1px #f1f1f1 solid; border-radius: 16px; height: max-content"
      >
        <h1>Categories</h1>
        <!-- <a-checkbox-group
          v-model:value="categories"
          name="checkboxgroup"
          :options="plainOptions"
          :label="'name'"
          :value="'id'"
        /> -->

        <h1 style="margin-top: 20px">City</h1>
        <a-dropdown-button @click="handleButtonClick" size="small">
          Almaty
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1"> Astana </a-menu-item>
              <a-menu-item key="2"> Taraz </a-menu-item>
              <a-menu-item key="3"> Shymkent </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown-button>
      </div>
      <div style="width: 60%">
        <div style="display: flex; justify-content: space-between">
          <a-dropdown-button type="primary" @click="handleButtonClick">
            Sort by {{ sort }}
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1"> Author </a-menu-item>
                <a-menu-item key="2"> Date </a-menu-item>
                <a-menu-item key="3"> Language </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
          <a-input-search
            style="width: 300px; margin-left: 30px"
            v-model:value="book"
            placeholder="input search book"
            enter-button="Search"
            size="default"
            @search="onSearch"
          />
        </div>
        <div style="margin-top: 30px">
          <a-row :gutter="[16, 16]">
            <a-col :xs="8" :lg="8" :md="8" v-for="item in allList">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  box-shadow:
                    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
                  text-align: center;
                "
              >
                <LikedBooks :bookId="item.book.id"></LikedBooks>

                <img style="height: 200px" :src="item.book.image" />
                <h3 style="color: #393280; display: flex; justify-content: center">
                  {{ item.book.title }}
                </h3>
                <h4
                  style="color: #f89e0f; display: flex; justify-content: end"
                  @click="goExchange(item.book_id, item.user_id)"
                >
                  Go to exchanges
                </h4>
              </div>
            </a-col>
          </a-row>
        </div>
        <div style="width: 100%; display: flex">
          <a-pagination
            v-model:current="current"
            :total="100"
            style="margin: 40px auto"
            @change="allLoad"
          >
            <template #itemRender="{ type, originalElement }">
              <a style="border: 1px #f1f1f1 solid; padding: 5px" v-if="type === 'prev'">
                Previous
              </a>
              <a style="border: 1px #f1f1f1 solid; padding: 5px" v-else-if="type === 'next'"
                >Next
              </a>
              <component :is="originalElement" v-else></component>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
import LikedBooks from '@/components/LikedBooks.vue'
import { AuthApi } from '@/api/auth'
export default {
  components: {
    LikedBooks
  },
  data() {
    return {
      currentIndex: 0,
      current: 0,
      book: '',
      bookList: [],
      sort: 'genre',
      recList: [],
      oneBook: {},
      allList: [],
      categories: [],
      plainOptions: [],
      bestSellers: []
    }
  },
  mounted() {
    this.onLoad()
    this.getCategories()
  },
  methods: {
    onLoad() {
      if (this.bookList.length == 0) {
        AuthApi('books', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.bookList = res.data.result.books
            this.recLoad()
            this.oneLoad()
            this.allLoad()
          }
        })
      }
    },
    goExchange(id, user_id) {
      this.$router.push({
        name: 'AboutPerson',
        params: {
          bookId: id,
          userId: user_id
        }
      })
    },
    handleMenuClick() {},
    recLoad() {
      if (this.recList.length == 0) {
        AuthApi('books', { query: { limit: 8, offset: 60 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.recList = res.data.result.books
          }
        })
      }
    },
    oneLoad() {
      AuthApi('books', { query: { limit: 1, offset: 110 } }, 'GET').then((res) => {
        if (res.data.message === 'success') {
          this.oneBook = res.data.result.books[0]
        }
      })
    },
    allLoad() {
      const offset = (this.current + 1) * 6 - 6
      // AuthApi('books', { query: { limit: 6, offset: offset } }, 'GET').then((res) => {
      //   if (res.data.message === 'success') {
      //     this.allList = res.data.result.books
      //   }
      // })
      AuthApi('books/stock/search', {
        authors: [],
        categories: [],
        city: this.city,
        limit: 6,
        offset: offset,
        query: this.query
      }).then((res) => {
        if (res.data.message === 'success') {
          this.allList = res.data.result
        }
      })
    },
    getCategories() {
      AuthApi('categories', {}, 'GET').then((res) => {
        if (res) {
          this.plainOptions = JSON.parse(JSON.stringify(res.data.categories))
          console.log(this.plainOptions)
        }
      })
    },
    handleButtonClick(e) {
      console.log(e)
    },
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`)
    },
    onSearch(e) {
      AuthApi('send', {message: e}, 'POST').then((res) => {
        if (res) {
         console.log(res)
        }
      })
    },
    next() {
      if (this.currentIndex < this.bestSellers.length - 1) {
        this.currentIndex++
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    aboutBook(id) {
      console.log(id)
      this.$router.push({
        name: 'AboutBook',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: #006b61;
}
h1 {
  color: #006b61;
  font-size: 20px;
  font-weight: 900;
}
.carousel-container {
  margin-top: 30px;
  position: relative;
  width: 100%;
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
  margin-right: 30px;
}

.button {
  background-color: aquamarine;
}
.icon {
}
.material-symbols-outlined {
  color: #006b61;
}
</style>
