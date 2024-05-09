<template>
  <div class="my-books" style=" ">
    <a-row>
      <a-col :span="12" v-for="item in dataList">
        <div class="card">
          <div>
            <div class="img-border">
              <img style="height: 250px" :src="item.book.image" />
            </div>
            <h2 class="h2">
              {{ item.book.title }}
            </h2>
          </div>
          <div>
            <h2>{{ item.book.title }}</h2>
            <h3>{{ item.author }}</h3>
            <a-rate :value="item.book.rating" />

            <p style="margin-top: 20px">
              <span>Language: {{ item.book.language }}</span>
            </p>

            <p>{{ item.book.description }}</p>
            <a-button type="primary" @click="onEdit(item.book.id)">Edit</a-button>
            <a-button style="margin-left: 20px" type="primary" danger @click="onDelete(item.id)"
              >Delete</a-button
            >
          </div>
        </div>
      </a-col>
    </a-row>
    <div style="text-align: center">
      <a-button style="margin: 70px auto; height: 50px" type="primary" @click="onUpload()"
        >Upload new book</a-button
      >
    </div>
    <AddEditBook ref="modalView"></AddEditBook>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'
import AddEditBook from './AddEditBook.vue'
import { message } from 'ant-design-vue'
export default {
  components: {
    AddEditBook
  },
  data() {
    return {
      open: false,
      dataList: []
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onEdit(e) {
      console.log(e)
      this.$refs.modalView.editMeth({
        query: {
          id: e
        }
      })
    },
    onUpload() {
      this.$refs.modalView.show()
    },
    onCloseModal() {
      this.open = false
    },
    onDelete(e) {
      let path = 'books/stock/' + e
      AuthApi(path, {}, 'DELETE').then((res) => {
        if (res.data.message == 'success') {
          message.success('You have deleted successfully')
          this.onLoad()
        }
      })
    },
    onLoad() {
      AuthApi('books/stock', {}, 'GET').then((res) => {
        if (res) {
          this.dataList = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my-books{
  max-width: 1300px; 
  margin: auto;
  height: 100vh; 
  overflow-y: scroll;  
  margin: 50px;
}

.my-books::-webkit-scrollbar {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
.card {
  display: flex;
  margin: 40px;
  .h2 {
    text-align: center;
    color: #393280;
    margin-top: 10px;
    font-size: 16px;
    margin-right: 30px;
  }
  .img-border {
    margin-right: 30px;
    padding: 5px;

    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
}
</style>
