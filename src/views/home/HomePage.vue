<template>
  <div>
    <div class="search">
      <div>
        <img style="width: 600px" src="@/assets/images/crossing.svg" />
        <div style="display: flex; margin-top: 80px">
          <img style="height: 150px" src="@/assets/images/word.svg" />
          <div style="margin-left: 40px">
            <h2>
              Join us in building a community where the written word <br />
              comes alive and imagination knows no bounds.
            </h2>
            <hr />
            <a-button
              style="margin-top: 50px; width: 170px; height: 40px"
              type="primary"
              @click="visible = true"
              >Search book</a-button
            >
            <a-popover v-model:open="visible" title="Search" trigger="click">
              <template #content>
                <div style="display: flex; gap: 5px">
                  <a-select
                    v-model:value="id"
                    placeholder="Search your book"
                    style="width: 220px"
                    :options="dataList"
                    :filter-option="filterOption"
                    show-search
                    @change="getBookDetails"
                    @input="handleSearch"
                  ></a-select>
                  <a-button type="primary" @click="aboutBook(id)">Go to details</a-button>
                </div>
              </template>
            </a-popover>
          </div>
        </div>
      </div>
      <div>
        <img style="width: 500px" src="@/assets/images/books.jpeg" />
      </div>
    </div>
    <div class="best" style="display: flex; gap: 10px">
      <h1>
        New <br />
        Best book <br />
        2024.
      </h1>
      <div style="position: relative">
        <div class="carousel-container">
          <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
            <div
              v-for="(item, index) in newBookList"
              :key="index"
              class="carousel-item"
              @click="aboutBook(index)"
            >
              <div class="border">
                <img :src="item.image" alt="Book Image" />
              </div>
            </div>
          </div>
        </div>
        <span class="material-symbols-outlined md-36 prev" @click="prev()"> west </span>
        <span class="material-symbols-outlined md-36 next" @click="next()"> east </span>
      </div>
    </div>
    <div class="bestseller">
      <div style="display: flex; justify-content: space-between">
        <h1>Top-10 best seller book</h1>
        <h2 style="color: #005555">See all</h2>
      </div>
      <div class="scroll">
        <div class="card" v-for="item in bookList">
          <img :src="item.image" />
          <div style="margin-left: 20px; padding: 10px">
            <h2>{{ item.title }}</h2>
            <h3 v-for="i in item.authors">{{ i.name }}</h3>
            <h2>Writen date</h2>
            <h4>{{ item.pub_date }}</h4>
            <h2>Overview</h2>
            <h4>{{ truncatedDescription(item.description) }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="offers">
      <div style="display: flex; justify-content: space-between">
        <h1>Offers</h1>
        <h2 style="color: #005555">See all</h2>
      </div>
      <div style="display: flex; justify-content: space-between">
        <img style="border-radius: 0 0 50% 50%" src="@/assets/images/offer1.svg" />
        <img style="border-radius: 50% 50% 0 0" src="@/assets/images/offer2.svg" />
        <img style="border-radius: 0 0 50% 50%" src="@/assets/images/offer3.svg" />
        <img style="border-radius: 50% 50% 0 0" src="@/assets/images/offer4.svg" />
      </div>
    </div>
    <div class="subscription">
      <h1>Recommended books from <br />you to review</h1>
      <div class="seek">
        <!-- <a-input placeholder="Please write what are you searching for"></a-input> -->
      </div>
    </div>
    <FAQSection></FAQSection>
    <div style="text-align: center; margin-top: 50px">
      <h2>
        Остались вопросы? <br />
        пишите bookers@gmail.com
      </h2>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
import FAQSection from '@/components/FAQSection.vue'
export default {
  components: {
    FAQSection
  },
  data() {
    return {
      bookList: [],
      newBookList: [],
      selectedQuestionIndex: null,
      currentIndex: 0,
      current: 0,
      visible: false,
      info: {},
      dataList: [],
      searchText: '',
      id: null,
      questionList: {
        rus: [
          {
            question: 'ТББ  (Тапсырысты беру бөлімшесі) ашатын орынды шешу',
            answer:
              'ТББ кіріс көзі дұрыс таңдалған орынға байланысты. ТББ ашылуы керек аймақтарды картадан көре аласыз. Бөлімше ашуға ең тиімді шешім – жаяу жүргіншілері көп орын: сауда орталықтары, аялдамалардың жанындағы Үй-жайлар, ірі және орта тұрғын үй кешендері, өңірлерге қаладан шығу нүктелері.'
          },
          {
            question: 'ТББ ашуға таңдаған орынды аймақтық менеджермен мақұлдау',
            answer:
              'Белгілі бір орында ТББ ашуға өтінім қосымшаның жеке кабинеті немесе сайт арқылы жіберіледі. BTI жоспары құжатының сканерлеуін, қасбеттің күндізгі және түнгі фотосуреттерін, ішіндегі бөлмені, кіреберісін жіберіңіз. Содан кейін монтажсыз бір рет видео түсіруге тырысыңыз. Жалпы кіру жоспарынан алыс бұрыштарға дейін бүкіл бөлмені көрсету маңызды. Жауап әдетте 3 күн ішінде келеді. Егер өтінім мақұлданса, 14 күн ішінде бөлімшені ашу қажет болады.'
          },
          {
            question: 'ЖК немесе ЖШС ашу',
            answer:
              'Мәртебе алу үшін барлық құжаттарды онлайн жіберуге болады. ЭҚЖЖ қажетті коды: 53200 басқа почта және курьерлік қызмет. Есеп айырысу шотын интернетте де ашуға болады.'
          },
          {
            question: 'ТББ ашатын орынға талапқа сәйкес жөндеу жүргізу',
            answer:
              'Жөндеу брендбукке сәйкес жүзеге асырылады: еден ақ керамикалық плиткамен жабылған, төбесі мен қабырғалары ақ түсті. Клиенттік аймақ пен қойма аймағын бөлу қажет. Жөндеу аяқталғаннан кейін компания тарапынан сізге негізгі жабдықтар беріледі: жарықтандырылған белгі, бренд қабырғасының логотипі, жұмыс кестесі және есік белгілері. Брендбукке сәйкес барлық заттар ақ түсті болуы керек. Қойма аймағында тапсырыстарды сақтау үшін сөрелерді орналастыру қажет. Менеджердің жұмысы үшін сканерді сатып алу керек. Бөлімшенің барлық бөлмелеріне дыбыс жазылатын, жақсы сападағы камера орнату қажет - кіреберіс, қабылдау бөлмесі, тексеру үстелі және қойма көрінетін етіп орналастыру керек. Жазбаларды 90 күн бойы сақталуы қажет, сонымен қатар компанияның аймақтық менеджері үшін кез-келген камераға онлайн қосылу мүмкіндігін ұйымдастыру қажет.'
          },
          {
            question: 'Жұмыс жүргізу тәртібімен танысу',
            answer:
              'Біздің серіктестеріміздің жұмыс стандарттарын білу үшін оқудан өтіп, тест тапсыру.'
          },
          {
            question: 'ТББ жұмысын іске қосу',
            answer:
              'Бөлімше жұмысын іске қосу үшін видео жіберіңіз: есік алдын, маңдайшаны, жұмыс режимінің белгілерін, клиенттік және қойма аймақтарын нақтылап түсіріңіз. Белсендіру бір күн ішінде расталады, жақын жерде тұратын JanaPost қосымшасының клиенттері ашылу туралы хабарлама алады.'
          }
        ]
      }
    }
  },
  computed: {
    isBigWin() {
      return this.$store.state.isBigWin
    },
    currentQuestionList() {
      // console.log(this.$i18n.locale)
      return this.questionList[this.$i18n.locale] || []
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      if (this.bookList.length == 0) {
        AuthApi('books', { query: { limit: 10, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.bookList = res.data.result.books
            //      console.log(this.bookList)
          }
        })
      }
      if (this.newBookList.length == 0) {
        AuthApi('books', { query: { limit: 20, offset: 100 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.newBookList = res.data.result.books
            //      console.log(this.bookList)
          }
        })
      }
      if (this.dataList.length == 0) {
        AuthApi('books', { query: { limit: 120, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.dataList = res.data.result.books.map((e) => ({
              value: e.id,
              label: e.title
            }))
          }
        })
      }
    },
    toggleAnswer(index) {
      if (this.selectedQuestionIndex === index) {
        this.selectedQuestionIndex = null
      } else {
        this.selectedQuestionIndex = index
      }
    },
    handleSearch(value) {
      this.searchText = value
    },
    getBookDetails(bookId) {
      let path = 'books/' + bookId
      AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.info = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    aboutBook(id) {
      console.log(id)
      this.$router.push({
        name: 'AboutBook',
        params: {
          id: id
        }
      })
    },
    filterOption(input, option) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
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
    truncatedDescription(description) {
      const words = description.split(' ')
      if (words.length > 20) {
        return words.slice(0, 20).join(' ') + ' ...'
      } else {
        return description
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.subscription {
  margin: 100px 0;
  text-align: center;
  align-items: center;
  h1 {
    font-size: 25px;
    font-weight: 900;
  }
  .seek {
    border-radius: 20px;
    border: 1px #006b61 solid;
    width: 76%;
    height: 40px;
    margin: auto;
  }
}
.questions {
  height: max-content;
  margin-bottom: 100px;
  padding: 30px;
  text-align: center;
  .question {
    background-color: #006b61;
    padding: 15px;
  }
}
.search {
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.bestseller {
  padding: 30px;
  height: 400px;

  .scroll {
    display: flex;
    //width: max-content;
    border-radius: 16px;
    padding: 40px;
    gap: var(--ds-small);
    overflow-x: auto;
    scrollbar-width: none; /* Firefox: 隐藏滚动条 */
    -ms-overflow-style: none; /* IE/Edge: 隐藏滚动条 */
    padding: var(--ds-medium);
    flex-shrink: 0;

    &::-webkit-scrollbar {
      display: none;
    }
    .card {
      background-color: #006b61;
      color: #ffffff;
      margin-right: 20px;
      padding: 20px;
      align-items: center;
      display: flex;
      // max-height: 260px;
      min-width: 500px;

      img {
        height: 200px;
      }

      h1 {
        color: white;
      }

      h2 {
        color: #ffffff;
      }
    }
  }

  h1 {
    font-size: 50px;
    font-weight: bolder;
  }

  h2 {
    color: #006b61;
    font-weight: 900;
  }
}
h2 {
  font-weight: 900;
}
.offers {
  margin: 40px 0;
  padding: 30px;
  h1 {
    font-size: 50px;
    font-weight: bolder;
  }

  img {
    height: 350px;
    max-height: 350px;
    width: 270px;
  }
}

.best {
  height: 400px;
  background-color: #006b61;
  padding: 30px;

  h1 {
    color: #ffffff;
    font-size: 50px;
    font-weight: bolder;
  }
}

.carousel-container {
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
  max-width: 200px;
  display: block;
  text-align: center;
  // background-color: aqua;
  margin-right: 30px; /* Adjust spacing between items */
}

.border {
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  width: 100%;
  height: 100%;
}

.prev {
  position: absolute;
  top: 35%;
  left: -15px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #f89e0f;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  justify-content: center;
  z-index: 10;
}

.next {
  position: absolute;
  top: 35%;
  right: 5px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #f89e0f;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  justify-content: center;
  z-index: 10;
}
</style>
