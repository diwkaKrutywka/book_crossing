<template>
  <div class="add-photo">
    <h2>Add a profile picture</h2>
    <p>
      Add a profile picture so that your friends know it’s you. Everyone will be able to see your
      picture.
    </p>
    <div>
      <a-upload
        style="margin-right: 40px"
        :fileList="fileList"
        @change="handleChange"
        :customRequest="(e) => uploadFile(e, 'path')"
        list-type="picture"
      >
        <div v-if="!imageUrl">
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
        </div>
        <img
          v-else
          :src="imageUrl"
          alt="Selected Image"
          style="max-width: 100%; max-height: 200px"
        />
      </a-upload>
    </div>
    <div class="buttons">
      <button @click="onSubmit()">Add a picture</button>
    </div>
  </div>
</template>

<script>
import { Upload as AUpload } from 'ant-design-vue'
import http from '@/utils/http'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

export default {
  data() {
    return {
      fileList: [],
      loading: false,
      imageUrl: '',
      path: '',
      file: null
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'done') {
        this.imageUrl = URL.createObjectURL(info.file.originFileObj)
        this.file = info.file.originFileObj // Save the file object for submission
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },

    async onSubmit() {
      let param = new FormData()
      param.append('image', this.file.file || this.file, this.file.name)
      try {
        let res = await http({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: '/users/profile/image',
          method: 'POST',
          data: param
        })
        if (res) {
          this.file.onProgress = 100
          this.path = res.data.result.image_url
          message.success('You added successfully')

          if (this.file.onSuccess) {
            this.file.onSuccess(res.data, this.file)
          }
          this.onCancel()
          return true
        }
      } catch (error) {
        console.error('Upload failed:', error)
      }
      return false
    },
    handleSearch(value) {
      this.searchText = value
    },
    onBack() {
      this.$router.back()
    },
    onCancel() {
      this.open = false
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
    }
  }
}
</script>

<style scoped lang="scss">
.add-photo {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #f89e0f;
  }
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
button {
  width: 150px;
  border-radius: 5px;
  padding: 5px;

  &:first-child {
    color: #fff;
    background-color: #f89e0f;
    border: transparent;
  }

  &:last-child {
    color: #f89e0f;
    background-color: #fff;
    border: 1px solid #f89e0f;
  }
}
</style>
