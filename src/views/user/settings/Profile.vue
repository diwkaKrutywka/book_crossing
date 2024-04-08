<template>
    <div class="box">
        <div style="margin-right: 40px;">
            <img style="width: 100px" src="@/assets/images/user.svg">
            <h3>Change photo</h3>
        </div>
        <div>
            <a-form ref="form" layout="vertical" :model="info">
                <a-form-item :label="$t('l_Name')" :rules="[{ required: true }]">
                    <a-input v-model:value="info.name"></a-input>
                </a-form-item>
                <a-form-item :label="$t('l_Email')" :rules="[{ required: true }]">
                    <a-input v-model:value="info.email"></a-input>
                </a-form-item>
                <a-form-item :label="$t('l_New_password')" :rules="[{ required: true }]">
                    <a-input-password v-model:value="info.password"></a-input-password>
                </a-form-item>
            </a-form>
            <a-button type="primary">Confirm</a-button>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            info: {
                name: 'Aruzhan',
                email: 'aru.1888@gmail.com',
                password: ''
            }
        }
    }
}
</script>
<style scoped>
.box {
    display: flex;
    padding: 30px;
    border: 2px #f1f1f1 solid;
    max-width: 700px;
    justify-content: space-around;
    border-radius: 16px;
    margin: 30px auto;
}
</style>