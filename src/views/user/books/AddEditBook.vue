<template>
  <a-modal
    v-model:open="open"
    :title="$t('l_Add_edit_book')"
    @cancel="onCancel"
    @ok="onCancel"
    width="800px"
  >
    <div>
      <div style="max-width: 800px" class="input-box-style">
        <div style="display: flex">
          <a-upload
            style="margin-right: 40px"
            :fileList="path ? [{ url: path }] : []"
            @change="(e) => (e.fileList[0] ? '' : (path = ''))"
            :customRequest="(e) => uploadFile(e, 'path')"
            list-type="picture"
          >
            <div v-if="!path">
              <div
                style="
                  background-color: #f1f1f1;
                  width: 150px;
                  height: 200px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  gap: 8px;
                  border-radius: 10px;
                  font-size: 11px;
                  padding: 10px;
                  box-sizing: border-box;
                "
              >
                <plus-outlined></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
              <h3 style="color: #f89e0f; text-align: center">upload book cover</h3>
            </div>
          </a-upload>
          <a-form
            ref="form"
            layout="horizontal"
            :labelCol="labelCol"
            labelAlign="left"
            :model="info"
            style="width: 700px"
          >
            <a-row wrap :gutter="[16, 0]">
              <a-col :xs="24" :sm="24">
                <a-form-item class="input-box" :label="$t('l_Title')" name="title">
                  <a-select
                    v-model:value="id"
                    placeholder="Search your book"
                    style="width: 100%"
                    :options="dataList"
                    :filter-option="filterOption"
                    show-search
                    @change="getBookDetails"
                    @input="handleSearch"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24">
                <a-form-item class="input-box" :label="$t('l_Author')" name="author">
                  <h3 v-for="item in info.authors">{{ item.name }}</h3>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24">
                <a-form-item class="input-box" :label="$t('l_Category')" name="category">
                  <h3 v-for="item in info.categories">{{ item.name }}</h3>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24">
                <a-form-item class="input-box" :label="$t('l_Description')" name="desc">
                  <p>{{ info.description }}</p>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24">
                <a-form-item class="input-box" :label="$t('l_Rate')" name="rate">
                  <a-rate v-model:value="info.rating" allow-half />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" v-if="!edit">
                <a-form-item class="input-box" :label="$t('l_City')" name="city" required>
                  <a-select v-model:value="city" :options="cityList"></a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div style="text-align: center; margin: 30px auto">
          <a-button type="primary" @click="onSubmit()">
            {{ $t('l_Submit') }}
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import http from '@/utils/http'
import config from '@/config/index.js'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { AuthApi } from '@/api/auth'
import { contentQuotesLinter } from 'ant-design-vue/es/_util/cssinjs/linters'

export default {
  components: {
    PlusOutlined
  },
  data() {
    return {
      id: null,
      edit: false,
      labelCol: {
        style: {
          width: '130px'
        }
      },
      info: {},
      city: '',
      img: '',
      bookL: [],
      stockId: '',
      path: '',
      dataList: [],
      searchText: '',
      baseURL: config.baseURL,
      open: false,
      file: null,
      cityList: [
        { value: 'Almaty', label: 'Almaty' },
        { value: 'Astana', label: 'Astana' },
        { value: 'Taraz', label: 'Taraz' },
        { value: 'Kyzylorda', label: 'Kyzylorda' },
        { value: 'Shymkent', label: 'Shymkent' },
        { value: 'Aktobe', label: 'Aktobe' },
        { value: 'Atyrau', label: 'Atyrau' }
      ]
    }
  },
  computed: {
    filteredDataList() {
      return this.dataList?.filter(
        (item) =>
          typeof this.searchText === 'string' &&
          item.label.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },

  mounted() {
    this.onLoad()
  },

  methods: {
    getInfo() {
      let path = 'books/' + this.stockId + '/stock'
      AuthApi(path, {}, 'GET').then((res) => {
        if (res.data.message == 'success') {
          this.bookL = JSON.parse(JSON.stringify(res.data.result))
          //this.id
        }
      })
    },
    show() {
      this.open = true
    },
    editMeth(e) {
      console.log(e+"IUUUUUUUU")
      if (e) {
        this.stockId = e.query.id
        this.getInfo()
      }
      this.edit = true
      this.open = true
    },
    async onSubmit() {
      if (!this.edit) {
        if (!this.id) {
          message.error(this.$t('l_Select_book_first'))
          return
        }
        if (!this.city) {
          message.error(this.$t('l_Select_city_first'))
          return
        }
        this.setCity()
        let param = new FormData()
        param.append('image', this.file.file || this.file, this.file.name)
        param.append('book_id', this.id)
        try {
          let res = await http({
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            url: '/books/stock/upload',
            method: 'POST',
            data: param,
            onUploadProgress: function (e) {
              this.file.onProgress = (e.loaded / e.total) * 100
            }
          })
          if (res) {
            this.path = res.data.result.image_url
            message.success('You added successfully')

            if (this.file.onSuccess) {
              this.file.onSuccess(res.data, this.file)
            }

            return true
          }
        } catch (error) {
          console.error('Upload failed:', error)
        }
        return false
      } else {
        if (!this.id) {
          message.error(this.$t('l_Select_book_first'))
          return
        }
        let param = new FormData()
        param.append('image', this.file.file || this.file, this.file.name)

        try {
          let res = await http({
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            url: '/books/stock/' + this.stockId + '/image',
            method: 'PUT',
            data: param,
            onUploadProgress: function (e) {
              this.file.onProgress = (e.loaded / e.total) * 100
            }
          })

          this.path = res.data.result.image_url
          message.success('You updated successfully')

          if (this.file.onSuccess) {
            this.file.onSuccess(res.data, this.file)
          }

          return true
        } catch (error) {
          console.error('Upload failed:', error)
        }
        return false
      }
    },
    handleSearch(value) {
      this.searchText = value
    },
    setCity() {
      let path = 'users/' + this.$store.userInfo.user.id + '/city'
      AuthApi(path, { city: this.city }, 'PATCH').then((res) => {
        if (res) {
          console.log(this.city)
        }
      })
    },
    onBack() {
      this.$router.back()
    },
    onCancel() {
      this.open = false
    },
    getBookDetails(bookId) {
      let path = 'books/' + bookId
      AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.info = JSON.parse(JSON.stringify(res.data.result))
        }
      })
    },
    async uploadFile(file, tag) {
      console.log(file.file.name)
      let isImage = await this.checkImgType(file.file)
      if (!isImage) {
        message.error(this.$t('l_Image_format_error'))
        return
      }

      this.customRequest(file, tag)
    },
    async checkImgType(file) {
      if (!/\.(png|PNG)$/.test(file.name)) {
        return false
      } else {
        return true
      }
    },
    customRequest(file, key) {
      file = file.file
      if (!file) {
        console.log('file is empty')
        return
      }
      this.file = file
    },
    filterOption(input, option) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onLoad() {
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
    getCategoryList() {
      if (this.categoryList.length > 0) {
        return
      }
      let info = {
        length: -1
      }
      FaqApi('category_list', info).then((res) => {
        if (res.result_code == 0) {
          let arr = []
          res.data.rows.forEach((item) => {
            if (item.id != this.id) {
              arr.push({
                label: item.title,
                value: item.id
              })
            }
          })
          this.categoryList = JSON.parse(JSON.stringify(arr))
        }
      })
    }
  }
}
</script>

<style scoped>
.input-box-style {
  padding: 20px;
  border: 1px #f89e0f solid;
  margin-bottom: 50px;
}
</style>
