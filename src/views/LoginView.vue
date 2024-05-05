<template>
  <div class="login-area">
    <a-card class="login-box">
      <a-tabs value="login" size="large" v-model:value="activeTab" @change="onTabChange">
        <a-tab-pane :tab="$t('l_Signup')" key="signup">
          <a-form ref="form" layout="vertical" :model="info">
            <a-form-item :label="$t('l_Username')" :rules="[{ required: true }]">
              <a-input v-model:value="info.username"></a-input>
            </a-form-item>
            <a-form-item :label="$t('l_Email')" :rules="[{ required: true }]">
              <a-input v-model:value="info.email"></a-input>
            </a-form-item>
            <a-form-item :label="$t('l_User_password')" :rules="[{ required: true }]">
              <a-input-password v-model:value="info.password"></a-input-password>
            </a-form-item>
            <!-- <a-form-item :label="$t('l_Repeat_password')" :rules="[{ required: true }]">
                            <a-input-password v-model:value="info.password2"></a-input-password>
                        </a-form-item> -->
            <a-button
              class="confirm"
              type="primary"
              html-type="submit"
              style="width: 100%; margin-top: 15px"
              @click="onSignUp()"
            >
              {{ $t('l_Signup') }}
            </a-button>
          </a-form>
        </a-tab-pane>
        <a-tab-pane :tab="$t('l_Login')" key="login">
          <a-form ref="form" layout="vertical" :model="info">
            <a-form-item :label="$t('l_Username')" :rules="[{ required: true }]">
              <a-input v-model:value="info2.username"></a-input>
            </a-form-item>
            <a-form-item :label="$t('l_User_password')" :rules="[{ required: true }]">
              <a-input-password v-model:value="info2.password"></a-input-password>
            </a-form-item>
            <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 24 }">
              <a-checkbox v-model:checked="remember">Remember me</a-checkbox>
            </a-form-item>
            <a-button
              class="confirm"
              type="primary"
              html-type="submit"
              style="width: 100%; margin-top: 15px"
              @click="onLogin()"
            >
              {{ $t('l_Login') }}
            </a-button>
          </a-form>
        </a-tab-pane>
      </a-tabs>
      <a-modal v-model:open="open">
        <template #footer></template>
        <AddPhoto></AddPhoto>
      </a-modal>
    </a-card>
    <div
      style="
        background-color: #006b61;
        width: 50%;
        position: relative;
        display: flex;
        flex-direction: column;
      "
    >
      <div
        style="
          position: absolute;
          margin: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <img
          v-if="$store.isBigWin"
          style="max-width: 600px"
          src="../assets/images/login-logo.svg"
        />
        <div v-if="activeTab === 'signup'" style="margin-bottom: 50px">
          <h2>HELLO, FRIEND!</h2>
          <p>
            Enter your personal details and <br />
            start your journey with us
          </p>
          <a-button
            class="confirm"
            type="primary"
            html-type="submit"
            style="width: 100%; margin-top: 15px; text-align: center"
            @click="onLogin()"
          >
            {{ $t('l_Login') }}
          </a-button>
        </div>
        <div v-else style="margin-bottom: 50px">
          <h2>WELCOME BACK!</h2>
          <p>
            To keep connected with us please <br />
            login with your personal info
          </p>
          <a-button
            class="confirm"
            type="primary"
            html-type="submit"
            style="width: 100%; margin-top: 15px"
            @click="onLogin()"
          >
            {{ $t('l_Signup') }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthApi } from '@/api/auth'
import { message } from 'ant-design-vue'
import AddPhoto from '@/components/AddPhoto.vue'

export default {
  components: {
    AddPhoto
  },
  data() {
    return {
      activeTab: 'signup',
      open: false,
      info: {
        username: '',
        password: '',
        email: ''
        // password2: ''
      },
      info2: {
        username: '',
        password: ''
      },
      remember: true,
      passwordCheck: ''
    }
  },
  methods: {
    onTabChange(key) {
      this.activeTab = key
    },
    onLogin() {
      this.$refs.form
        .validate()
        .then(() => {
          AuthApi('auth', this.info2)
            .then((res) => {
              // console.log(res.data)
              if (res.data.status_code === 200) {
                this.$store.setUserInfo(res.data.result)
                //     console.log(res.data.result)
                this.$router.replace({
                  name: 'HomePage'
                })
                //   console.log(res)
                console.log(this.$store?.userInfo)
              } else if (res.data.status_code === 404) {
                //   message.error(res.data)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleOk(e) {
      this.open = false
    },

    onSignUp() {
      AuthApi('users', this.info).then((res) => {
        message.success('You registered successfully!')
        this.open = true
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-area {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  // background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(132, 47, 194, 1) 74%, rgba(98, 0, 255, 0.1658788515406162) 100%);
  background-color: #fef7eb;

  .login-box {
    margin: auto;
    width: 100%;
    max-width: 400px;
    min-height: 300px;
  }

  .confirm {
    width: 400px;
    max-width: 460px;
    height: 60px;
    display: flex;
    justify-content: center;
    border-radius: 16px;
    background: #f89e0f;
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    color: #fef7eb;
    align-items: center;
    padding: 20px;
    margin: auto;
  }
}

h2 {
  color: #f89e0f;
  font-family: Poppins;
  font-size: 50px;
  font-weight: 600;
  line-height: 75px;
  letter-spacing: -0.02em;
  text-align: center;
}

p {
  font-family: Poppins;
  font-size: 22px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fef7eb;
}
</style>
