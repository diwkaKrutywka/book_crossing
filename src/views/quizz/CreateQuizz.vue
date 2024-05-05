import BookList from "../book/BookList.vue";

<template>
  <div style="height: 100vh;">
    <a-page-header
      title="Create a New quizz"
      @back="
        () => {
          $router.back()
        }
      "
    >
      <template #extra>
        <a-button type="primary" @click="onAdd()"> Save as draft </a-button>
        <a-button type="primary" @click="onAdd()"> Push </a-button>
      </template>
    </a-page-header>
    <div class="area">
      <a-form class="form">
        <a-row wrap :gutter="[32, 32]" class="filter-order-grid">
          <a-col :xs="24" :sm="24" :lg="24">
            <a-form-item label="Name of the book" name="bookId">
              <a-select
                :allow-clear="true"
                v-model:value="bookId"
                :options="bookList"
                @focus="getBookList()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="24">
            <a-form-item v-if="bookId" label="Name of the Quizz" name="name">
              <a-input v-model:value="name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="24">
            <a-form-item v-if="bt && bookId" style="width: 100%">
              <a-button style="width: 100%" type="primary" @click="addQuestion()">
                Add questions
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- see QA -->
    <!-- <div style="max-width: 900px">
      <div class="q-card">
        <h1>Question {{ number }}</h1>
        <a-form :model="info" layout="vertical" class="form">
          <a-row :gutter="[16, 16]">
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item :label="$t('l_Question')" name="question" required>
                <a-textarea v-model:value="info.question" allow-clear></a-textarea>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-item :label="$t('l_Correct_answer')" required>
                <a-input v-model:value="info.answer" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-item :label="$t('l_Options')" required>
                <a-input v-model:value="info.options[0]" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-item :label="$t('l_Options')" required>
                <a-input v-model:value="info.options[1]" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12" :lg="12">
              <a-form-item :label="$t('l_Options')" required>
                <a-input v-model:value="info.options[2]" allow-clear></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="flex">
        <a-button size="large" type="primary" @click="addCard()">Edit question</a-button>
      </div>
    </div> -->

    <!-- add QA -->
    <div v-if="qId">
      <div style="display: flex; gap: 10px;">
        <div class="q-card">
          <h1>Question {{ number }}</h1>
          <a-form :model="info" layout="vertical" class="form">
            <a-row :gutter="[16, 16]">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item :label="$t('l_Question')" name="question" required>
                  <a-textarea v-model:value="info.question" allow-clear></a-textarea>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-item :label="$t('l_Correct_answer')" required>
                  <a-input v-model:value="info.answer" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-item :label="$t('l_Options')" required>
                  <a-input v-model:value="info.options[0]" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-item :label="$t('l_Options')" required>
                  <a-input v-model:value="info.options[1]" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12" :lg="12">
                <a-form-item :label="$t('l_Options')" required>
                  <a-input v-model:value="info.options[2]" allow-clear></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
     
        <a-table :data-source="questionList" :columns="questionColumns">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'options'">
              <a>{{ text.join(" | ") }}</a>
            </template>
         </template>
        </a-table>
      </div>
      <div class="flex">
        <a-button size="large" type="primary" @click="addCard()">Add more question</a-button>
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
      bt: true,
      open: false,
      number: 1,
      page: 20,
      name: '',
      bookList: [],
      bookId: '',
      qId: null,
      info: {
        options: [],
        answer: '',
        question: ''
      },
      questionList: [],
      questionColumns: [
        {
          title: 'Question',
          dataIndex: 'question',
        },
        {
          title: 'Correct Answer',
          dataIndex: 'answer',
        },
        {
          title: 'Other options',
          dataIndex: 'options',
        },
      ]
    }
  },
  created() {
    this.getBookList()
  },
  methods: {
    getBookList() {
      if (this.bookList.length == 0) {
        AuthApi('books', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.bookList = res.data.result.books.map((e) => ({
              value: e.id,
              label: e.title
            }))
          }
        })
      }
    },
    addQuestion() {
      if (!this.name) {
        return message.warn('Fill the name')
      } else {
        let path = 'books/' + this.bookId + '/quizzes'
        AuthApi(path, {
          // id: this.bookId,
          title: this.name
        }).then((res) => {
          if (res.data.message == 'success') {
            this.qId = res.data.result.id
            this.bt = false
            this.open = true
          }
        })
      }
    },
    addCard() {
      let path = 'quizzes/' + this.qId + '/questions'
      this.questionList.push(this.info);
      AuthApi(path, this.info).then((res) => {
        if (res.data.message == 'success') {
          this.number++
          this.info = {}
          this.info.options = []
          message.success('You added question successfully!')
        }
      })
    },
    getQues() {}
  }
}
</script>
<style scoped lang="scss">
.area {
  width: 500px;
}
.q-card {
  max-width: 900px;
  padding: 20px;
  border-radius: 16px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  h1 {
    font-size: 30px;
    font-size: 900;
  }
  .form {
    padding: 20px;
  }
}
.flex {
  display: flex;
  justify-content: end;
  margin: 20px 0;
}
</style>
