<template>
    <div class="add-photo">
        <h2>Add a profile picture</h2>
        <p>Add a profile picture so that your friends know it’s you. Everyone will be able to see your picture.</p>
        <div>
            <a-upload    
                v-model:file-list="fileList"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
        </div>
        <div class="buttons">
            <button>Add a picture</button>
        </div>
    </div>
</template>

<script>
import { Upload as AUpload } from "ant-design-vue";

export default {
    data() {
        return{
            fileList: [],
            loading: false,
            imageUrl: ''
        }
    },
    methods: {
        handleChange(info){
        if (info.file.status === 'uploading') {
            loading.value = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (base64Url) => {
            imageUrl.value = base64Url;
            loading.value = false;
            });
        }
        if (info.file.status === 'error') {
            loading.value = false;
            message.error('upload error');
        }
        }
    }
}
</script>

<style scoped lang="scss">
.add-photo{
    display: flex;
    flex-direction: column;
    align-items: center;

    h2{
        color: #F89E0F;
    }
}
    .buttons{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    button{
        width: 150px;
        border-radius: 5px;
        padding: 5px;

        &:first-child{
            color: #fff;
            background-color: #F89E0F;
            border: transparent;
        }

        &:last-child{
            color: #F89E0F;
            background-color: #fff;
            border: 1px solid #F89E0F;
        }
    }
</style>