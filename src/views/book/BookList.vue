<template>
  <div style="max-width: 1300px; margin: auto; padding: 100px 0">
    <div>
      <h2>Recently Viewed</h2>
      <div class="carousel-container">
        <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
          <div
            v-for="(item, index) in bestSellers"
            :key="index"
            class="carousel-item"
            @click="aboutBook()"
          >
            <div
              style="
                border: 1px #f1f1f1 solid;
                padding: 10px;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              "
            >
              <!-- <img :src="getImgUrl(item.img)" alt="Book Image" /> -->
              <!-- <img :src="require(`@/assets/images/${item.img}`)" alt="Book Image" /> -->

              <img style="height: 170px" src="@/assets/images/book1.svg" alt="Book Image" />
            </div>
            <h3>{{ item.title }}</h3>
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
            border: 1px #f1f1f1 solid;
            padding: 20px;
            margin-right: 40px;
          "
        >
          <img style="height: 350px; margin-right: 30px" src="@/assets/images/book3.svg" />
          <div style="display: block">
            <span
              style="color: black; display: flex; justify-content: end"
              class="material-symbols-outlined"
            >
              favorite
            </span>
            <h1>The stoun heart</h1>
            <p>Drama</p>
            <div style="height: 5px; background-color: #f89e0f"></div>
            <h2>Overview</h2>
            <p>
              ibulum nisl efficitur. Praesent ultrices diam enim. In ut tellus sed sem placerat
              sollicitudin. Donec quis mollis dolor. Etiam viverra, arcu cursus porttitor porttitor,
              diam nunc auctor nisl, quis placerat magna erat et odio.
            </p>
            <p>WRITTEN BY</p>
            <h3>Michael Josh</h3>
          </div>
        </div>
      </div>
      <div>
        <a-row :gutter="[16, 16]">
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book3.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book2.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book1.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book3.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book2.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book1.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book2.svg"
          /></a-col>
          <a-col :xs="8" :lg="6" :md="8"
            ><img style="height: 200px; margin-right: 30px" src="@/assets/images/book1.svg"
          /></a-col>
        </a-row>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around">
      <div
        style="padding: 30px; border: 1px #f1f1f1 solid; border-radius: 16px; height: max-content"
      >
        <h1>Categories</h1>
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <br />
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <br />
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <br />
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <br />
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <br />
        <a-checkbox-group v-model:value="categories" name="checkboxgroup" :options="plainOptions" />
        <h1 style="margin-top: 20px">City</h1>
        <a-dropdown-button @click="handleButtonClick" size="small">
          Almaty
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                <UserOutlined />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                3rd item
              </a-menu-item>
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
                <a-menu-item key="1">
                  <UserOutlined />
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <UserOutlined />
                  3rd item
                </a-menu-item>
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
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
            <a-col :xs="8" :lg="8" :md="8">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  border-radius: 16px;
                  border: 1px #f1f1f1 solid;
                  text-align: center;
                "
              >
                <span
                  style="color: black; display: flex; justify-content: end"
                  class="material-symbols-outlined"
                >
                  favorite
                </span>
                <img style="height: 200px" src="@/assets/images/book3.svg" />
                <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
                <h4 style="color: #f89e0f; display: flex; justify-content: end">Go to exchanges</h4>
              </div>
            </a-col>
          </a-row>
        </div>
        <div style="width: 100%; display: flex">
          <a-pagination v-model:current="current" :total="500" style="margin: 40px auto">
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
export default {
  data() {
    return {
      currentIndex: 0,
      current: 0,
      book: '',
      sort: 'genre',
      categories: [],
      plainOptions: ['Drama', 'Comedy'],
      bestSellers: [
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book2.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book3.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book2.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book3.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book2.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book3.svg',
          title: 'Catcher in the Rye',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        }
      ]
    }
  },
  methods: {
    handleButtonClick(e) {
      console.log(e)
    },
    getImgUrl(pic) {
      return require(`@/assets/images/${pic}`)
    },
    onSearch() {},
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
    aboutBook() {
      this.$router.push({
        name: 'AboutBook'
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
  height: 240px;
  width: 170px;
  display: block;
  text-align: center;
  // background-color: aqua;
  margin-right: 30px; /* Adjust spacing between items */
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
