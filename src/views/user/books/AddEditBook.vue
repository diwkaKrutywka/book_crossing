<template>
    <div>
        <a-page-header :title="$t('l_Add_edit_book')" @back="onBack()">
            <!-- <template #extra>
                <a-button type="primary" @click="onSubmit()">
                    {{ $t("l_Submit") }}
                </a-button>
            </template> -->
        </a-page-header>
        <div style=" max-width: 600px" class="input-box-style">
            <div style="display: flex;">
                <a-upload style="width: 100%; margin-right: 40px"
                    :fileList="info.img_url ? [{ url: baseURL + info.img_url, name: $getFileName(info.img_url) }] : []"
                    @change="(e) => (e.fileList[0] ? '' : (info.img_url = ''))"
                    :customRequest="(e) => uploadFile(e, 'img_url')" list-type="picture">
                    <div v-if="!info.img_url">
                        <div style="background-color: #f1f1f1; width: 150px; height: 200px; display: flex; flex-direction:
                        column;
                        justify-content: center; align-items: center; gap: 8px; border-radius: 10px; font-size: 11px;
                        padding:
                        10px; box-sizing: border-box">
                            <plus-outlined></plus-outlined>
                            <div class="ant-upload-text">Upload</div>
                        </div>
                        <h3 style="color: #F89E0F; text-align: center;">upload book cover</h3>
                    </div>
                </a-upload>
                <a-form ref="form" layout="horizontal" :labelCol="labelCol" labelAlign="left" :model="info">
                    <a-row wrap :gutter="[16, 0]">
                        <a-col :xs="24" :sm="24">
                            <a-form-item class="input-box" :label="$t('l_Title')" name="title"
                                :rules="[{ required: true }]">
                                <a-input style="width: 100%" v-model:value="info.title"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24">
                            <a-form-item class="input-box" :label="$t('l_Author')" name="title"
                                :rules="[{ required: true }]">
                                <a-input style="width: 100%" v-model:value="info.title"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24">
                            <a-form-item class="input-box" :label="$t('l_Category')" name="title"
                                :rules="[{ required: true }]">
                                <a-input style="width: 100%" v-model:value="info.title"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24">
                            <a-form-item class="input-box" :label="$t('l_Description')" name="title"
                                :rules="[{ required: true }]">
                                <a-textarea style="width: 100%" v-model:value="info.title"></a-textarea>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24">
                            <a-form-item class="input-box" :label="$t('l_Rate')" name="title"
                                :rules="[{ required: true }]">
                                <a-rate v-model:value="info.rate" allow-half />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div style="text-align: center; margin: 30px auto;">
                <a-button type="primary" @click="onSubmit()">
                    {{ $t("l_Submit") }}
                </a-button>
            </div>
        </div>

    </div>
</template>

<script>
import http from "@/utils/http"
import config from "@/config/index.js"
import { message } from "ant-design-vue"
import { PlusOutlined } from "@ant-design/icons-vue"


export default {
    components: {
        PlusOutlined,
    },
    data() {
        return {
            id: null,
            labelCol: {
                style: {
                    width: '130px',
                },
            },
            info: {
                img_url: "",
                banner: "",
                parent_id: null,
                title: "",
                rate: 2.5,
                sort: "",
                can_view: [], //[admin worker, web, App]
                visible: 1,
                languages: [],
            },

            baseURL: config.baseURL + "/service/",
        }
    },
    mounted() {
        let id = this.$route.params.id
        if (id && id != "add") {
            this.id = id
            this.getInfo()
        }
    },

    methods: {
        getInfo() {
        },

        onSubmit() {

        },

        onBack() {
            this.$router.back()
        },
        async uploadFile(file, tag) {
            let isImage = await this.checkImgType(file.file)
            if (!isImage) {
                message.error(this.$t("l_Image_format_error"))
                return;
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
                console.log("file is empty")
                return
            }
            let param = new FormData()
            param.append("file", file.file || file, file.name)
            param.append("uid", this.info.uid)
            let res = await http({
                url: "/admin/faq/upload_file",
                method: "POST",
                data: param,
                onUploadProgress: function (e) {
                    file.onProgress = (e.loaded / e.total) * 100
                },
            })
            if (res.result_code == 0) {
                file.onProgress = 100
                this.info[key] = "/public/get_resource?name=" + res.data.path
                if (file.onSuccess) {
                    file.onSuccess(res.data, file)
                }

                return true
            } else {
                return false
            }
        },
        getCategoryList() {
            if (this.categoryList.length > 0) {
                return
            }
            let info = {
                length: -1,
            }
            FaqApi("category_list", info).then(res => {
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
        },
    },
}
</script>

<style scoped>
.input-box-style {
    padding: 20px;
    border: 1px #f89e0f solid;
    margin-bottom: 50px;

}
</style>
