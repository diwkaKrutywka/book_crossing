<template>
  <div>
    <a-page-header :title="$t('l_Add_edit_book')" @back="onBack()">
      <!-- <template #extra>
                <a-button type="primary" @click="onSubmit()">
                    {{ $t("l_Submit") }}
                </a-button>
            </template> -->
    </a-page-header>
    <div style="max-width: 600px" class="input-box-style">
      <div style="display: flex">
        <a-upload
          style="width: 100%; margin-right: 40px"
          :fileList="img ? [{ url: baseURL + img, name: $getFileName(img) }] : []"
          @change="(e) => (e.fileList[0] ? '' : (img = ''))"
          :customRequest="(e) => uploadFile(e, 'img')"
          list-type="picture"
        >
          <div v-if="!img">
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
        <a-form ref="form" layout="horizontal" :labelCol="labelCol" labelAlign="left" :model="info">
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
                  @input="handleSearch"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24">
              <a-form-item class="input-box" :label="$t('l_Author')" name="author">
                <a-input style="width: 100%" v-model:value="info.author"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24">
              <a-form-item class="input-box" :label="$t('l_Category')" name="category">
                <a-input style="width: 100%" v-model:value="info.category"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24">
              <a-form-item class="input-box" :label="$t('l_Description')" name="desc">
                <a-textarea style="width: 100%" v-model:value="info.desc"></a-textarea>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24">
              <a-form-item class="input-box" :label="$t('l_Rate')" name="rate">
                <a-rate v-model:value="info.rate" allow-half />
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
</template>

<script>
import http from '@/utils/http'
import config from '@/config/index.js'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { AuthApi } from '@/api/auth'

export default {
  components: {
    PlusOutlined
  },
  data() {
    return {
      id: null,
      labelCol: {
        style: {
          width: '130px'
        }
      },
      info: {
        title: '',
        rate: 2.5,
        sort: ''
      },
      img: '',
      dataList: [],
      searchText: '',
      baseURL: config.baseURL
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
    getInfo() {},

    onSubmit() {
      console.log(this.id)
    },
    handleSearch(value) {
      this.searchText = value
    },
    onBack() {
      this.$router.back()
    },
    async uploadFile(file, tag) {
      let isImage = await this.checkImgType(file.file)
      if (!isImage) {
        message.error(this.$t('l_Image_format_error'))
        return
      }

      this.customRequest(file, tag)
    },
    async checkImgType(file) {
      if (!/\.(jpg|jpeg|png||JPG|PNG|JPEG)$/.test(file.name)) {
        return false
      } else {
        return true
      }
    },
    async customRequest(file, key) {
      file = file.file
      if (!file) {
        console.log('file is empty')
        return
      }
      console.log(file.name)
      let param = new FormData()
      param.append('image', file || file.name)
      param.append('book_id', this.id)
      let res = await http({
        url: '/books/stock/upload',
        method: 'POST',
        data: param,
        onUploadProgress: function (e) {
          file.onProgress = (e.loaded / e.total) * 100
        }
      })
      if (res) {
        file.onProgress = 100
        // this.info[key] = '/public/get_resource?name=' + res.data.path
        if (file.onSuccess) {
          file.onSuccess(res.data, file)
        }

        return true
      } else {
        return false
      }
    },
    filterOption(input, option) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onLoad() {
      if (this.dataList.length == 0) {
        AuthApi('books', { query: { limit: 20, offset: 0 } }, 'GET').then((res) => {
          if (res.data.message === 'success') {
            this.dataList = res.data.result.books.map((e) => ({
              value: e.id,
              label: e.title
            }))
            //  console.log(this.dataList)
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
