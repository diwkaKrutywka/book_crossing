<template>
    <div class="login-area">
        <a-card class="login-box">
            <a-tabs value="login">
                <a-tab-pane :tab="$t('l_Login')" key="login">
                    <a-form ref="form" layout="vertical" :model="info">
                        <a-form-item :label="$t('l_Username')" :rules="[{ required: true }]">
                            <a-input v-model:value="info.username"></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('l_Password')" :rules="[{ required: true }]">
                            <a-input-password v-model:value="info.password"></a-input-password>
                        </a-form-item>
                        <a-button type="primary" html-type="submit" style="width: 100%; margin-top: 15px"
                            @click="onLogin()"> {{ $t("l_Login")
                            }} </a-button>

                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </a-card>
        <img v-if="$store.isBigWin" style="max-height: 400px; margin: auto;" src="../assets/images/edu.svg">
    </div>
</template>

<script>
import { AuthApi } from "@/api/auth"
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            info: {
                username: "+7",
                password: "",
            },
            passwordCheck: '',
        }
    },
    methods: {
        onLogin() {
        },

        onSignUp() {

        }
    }
}
</script>

<style lang="scss">
.login-area {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(132, 47, 194, 1) 74%, rgba(98, 0, 255, 0.1658788515406162) 100%);

    .login-box {
        margin: auto;
        width: 90%;
        max-width: 500px;
        min-height: 300px;

    }
}
</style>
