<template>
  <div class="home" :class="{ 'g-mobile': !$store.$state.isBigWin }">
    <a-layout :style="{ height: 100 + '%' }">
      <a-layout class="layout-content">
        <a-layout-header class="header" style="height: 60px">
          <div style="width: 40%; display: flex; align-items: center">
            <img
              style="padding: 10px; margin: 0 40px; height: 50px"
              src="@/assets/images/logo.svg"
            />

            <h2
              style="margin-right: 40px; font-weight: 300"
              @click="goToPage(item.name)"
              v-for="item in navList"
            >
              {{ item.label }}
            </h2>
          </div>
          <div style="max-width: 400px; display: flex">
            <div v-if="!hasLogin">
              <a-button class="button" @click="goToPage('LoginView')">
                {{ $t('l_Signup') }}
              </a-button>
              <a-button class="button" @click="goToPage('LoginView')">
                {{ $t('l_Login') }}
              </a-button>
            </div>

            <!-- njj -->
            <div style="display: flex">
              <div class="align-center pointer" @click.prevent>
                <div v-if="hasLogin" style="align-items: center">
                  Hi,
                  {{ this.$store.userInfo.user.username }}
                </div>
              </div>
              <div class="header-right active">
                <div class="right-item">
                  <a-dropdown>
                    <span
                      class="pointer"
                      style="color: white; margin-right: 3px; white-space: nowrap"
                    >
                      <span v-if="langTag == 'kz'">Қазақша</span>
                      <span v-if="langTag == 'rus'">Русский</span>
                      <span v-if="langTag == 'en'">English</span>
                    </span>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item>
                          <a
                            :style="{ color: langTag == 'kz' ? '#40a9ff' : '#000' }"
                            href="#"
                            @click="setLanguage('kz')"
                            >Қазақша</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            :style="{
                              color: langTag == 'rus' ? '#40a9ff' : '#000'
                            }"
                            href="#"
                            @click="setLanguage('rus')"
                            >Русский</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            :style="{ color: langTag == 'en' ? '#40a9ff' : '#000' }"
                            href="#"
                            @click="setLanguage('en')"
                            >English</a
                          >
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                  <div style="display: flex; gap: 5px">
                    <span
                      @click="seeNotifications()"
                      class="icon material-symbols-outlined"
                      style="cursor: pointer"
                    >
                      notifications
                    </span>
                    <span
                      v-if="hasLogin"
                      @click="$store.signOut()"
                      class="material-symbols-outlined"
                      style="cursor: pointer"
                    >
                      logout
                    </span>
                  </div>
                  <div>
                    <a-modal
                      v-model:open="open"
                      title="Notifications"
                      style="top: 0; right: 0"
                      @ok="handleClose()"
                      :footer="null"
                    >
                      <div>
                        <div class="card" v-for="item in friendList">
                          <div>
                            <!-- <img
                            :src="
                              item.profile_pic ? item.profile_pic : '@/assets/images.person.svg'
                            "
                          /> -->
                            <img src="@/assets/images/person.svg" />
                          </div>
                          <div>
                            <h1>@{{ item.username }} <span>sent request to friens</span></h1>

                            <div>
                              <a-button
                                style="margin-right: 15px"
                                type="primary"
                                size="small"
                                @click="onAccept(item.id)"
                                >Accept</a-button
                              >
                              <!-- <a-button danger size="small">Decline</a-button> -->
                            </div>
                          </div>
                          <div style="height: 1px; background-color: #006b61"></div>
                        </div>
                      </div>
                      <div>
                        <div class="card" v-for="item in exchangeList">
                          <div style="width: 100px; height: 100%; margin-right: 10px;"><img v-if="item.sender_book" :src="item.sender_book.image" alt="No Img"/></div>
                          <div>
                              <h1>@{{ item.sender.username }}<span> sent request to exchange your book</span></h1>
                              <h3>book</h3>
                              <div>
                                <a-button type="primary" v-if="item.sender_book" @click="onBookAccept(item.sender_book.id)">Accept</a-button>
                              </div>
                              <div style="height: 1px; background-color: #006b61; margin-top: 10px;"></div>
                          </div>
                        </div>
                      </div>
                    </a-modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- hb -->
        </a-layout-header>
        <div class="own" v-if="hasLogin">
          <h2 v-for="item in ownList" @click="goToPage(item.name)">{{ item.label }}</h2>
        </div>
        <a-layout-content class="router-area">
          <router-view></router-view>
          <FooterPage> </FooterPage>
        </a-layout-content>
        <!-- <a-layout-footer>
          <FooterPage></FooterPage>
        </a-layout-footer> -->
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue'
import { AuthApi } from '@/api/auth'
import { message } from 'ant-design-vue'
//import AddEditBook from './user/books/AddEditBook.vue'
export default {
  components: {
    FooterPage
    // AddEditBook
  },
  data() {
    return {
      open: false,
      friendList: [],
      exchangeList: [],
      navList: [
        {
          label: 'Home',
          name: 'HomePage'
        },
        {
          label: 'Books',
          name: 'BookList'
        },
        {
          label: 'About',
          name: 'AboutUs'
        },
        {
          label: 'Quizzess',
          name: 'LendingPage'
        }
      ],
      ownList: [
        {
          label: 'My books',
          name: 'MyBooks'
        },
        {
          label: 'My collections',
          name: 'MyCollections'
        },
        {
          label: 'My friends',
          name: 'MyFriends'
        },
        {
          label: 'Settings',
          name: 'Profile'
        }
      ]
    }
  },
  computed: {
    langTag() {
      return this.$i18n.locale
    },
    hasLogin() {
      return this.$store.hasLogin
    }
  },
  methods: {
    onAccept(e) {
      let path = 'users/friends/' + e + '/accept'
      AuthApi(path, {}, 'PUT').then((res) => {
        if (res) {
          message.success('You have 1 more friend!')
          this.getFriends()
        }
      })
    },
    onBookAccept(e){
      let path = 'books/request/'+ e + '/approve'
      AuthApi(path, {}, 'PUT').then((res) => {
        if(res){
          message.success('You successfully exchanged!')
          this.getExchanges()
        }
      })
    },
    setLanguage(e) {
      this.$i18n.locale = e
      localStorage.setItem('currentLang', e)
    },
    goToPage(name) {
      this.$router.push({
        name: name
      })
    },
    seeNotifications() {
      this.getFriends()
      this.getExchanges()
      this.open = true
    },
    getFriends() {
      AuthApi('users/friends/received', {}, 'GET').then((res) => {
        if (res) {
          this.friendList = JSON.parse(JSON.stringify(res.data.result.friends))
        }
      })
    },
    getExchanges() {
      AuthApi('books/request', {}, 'GET').then((res) => {
        if (res) {
          this.exchangeList = JSON.parse(JSON.stringify(res.data.requests))
        }
      })
    },
    handleClose() {
      this.open = false
    }
    // -- end --
  }
}
</script>
<style lang="scss" scoped>
h2 {
  cursor: pointer;

  &:hover {
    color: #f89e0f;
    text-decoration: underline;
    font-weight: 900;
    // margin-top: 10px;
  }
}
.home {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;

  .own {
    display: flex;
    width: 50%;
    justify-content: space-around;
    margin: 20px auto;

    h2 {
      font-weight: 700;
      margin-right: 40px;
      cursor: pointer;

      &:hover {
        color: #f89e0f;
        text-decoration: underline;
        // margin-top: 10px;
      }
    }
  }

  .header {
    background: #006b61;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;

    .header-right {
      display: flex;
      align-items: center;

      .right-item {
        margin-left: 15px;
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
        }
      }
    }
  }

  .button {
    background-color: #006b61;
    color: #ffffff;
    font-weight: bolder;
    margin-left: 10px;

    :hover {
      background-color: #f89e0f;
    }
  }

  .menus {
    margin-top: 20px;
    overflow: hidden;

    .menus-item {
      display: flex;
      flex-direction: column;

      .row {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        color: #f1f1f1;
        transition: all 0.2s;
        white-space: nowrap;

        &:hover {
          transform: translate(5px);
        }

        .icon-right {
          transition: all 0.2s;

          &.show {
            transform: rotate(90deg);
          }
        }
      }

      .icon {
        height: 100%;
        font-size: 20px;
        cursor: pointer;
        margin: auto 0;
      }

      .text {
        height: 100%;
        margin-left: 8px;
        cursor: pointer;
      }

      &.collapsible {
        justify-content: center;

        .icon {
          font-size: 25px;
        }
      }

      .active {
        color: #fff;
        background-color: #1677ff;
        display: flex;
        align-items: center;
      }
    }
  }

  .layout-content {
    overflow-y: hidden;
  }

  .layout-footer {
    position: relative;
  }

  .router-area {
    overflow-y: auto;
    margin: 15px;
    //padding: 10px;
    background: #fff;
    min-height: 280px;
    box-sizing: border-box;
    border-radius: 20px;
    //overflow-x: hidden;
  }

  #task {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 9;
    border: 1px solid #ccc;
    border-top-left-radius: 10px;
    padding: 5px 8px;
    box-sizing: border-box;
    background: #fff;
    opacity: 0.7;
    transform: translateY(calc(100% - 23px)) translateX(calc(100% - 68px));
    transition: all 0.5s;
    min-width: 60px;

    &.show {
      transform: translateY(0) translateX(0);
      opacity: 1;
      box-shadow: -3px -3px 8px rgba(0, 0, 0, 0.2);
    }

    .title {
      display: flex;
      height: 20px;
      align-items: center;
      font-weight: bold;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      font-size: 10px;
      position: relative;

      .icon {
        font-size: 20px;
      }

      .close-icon {
        position: absolute;
        left: -20px;
        top: -20px;
        background: #cccccc;
        color: #fff;
        border-radius: 100%;
        font-size: 22px;
        transform: scale(0);
        transition: transform 0.5s;

        &.show {
          transform: scale(1);
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
      min-height: 150px;
      padding: 8px 0;

      .item {
        display: flex;
        gap: 10px;
        cursor: pointer;
      }
    }
  }
}

.mobile-icon-size {
  font-size: 24px;
}

// mobile
.m-menus {
  .m-menu {
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 0 8px;
    box-sizing: border-box;
    white-space: nowrap;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      height: 10px;
      margin: auto;
      background-color: #1677ff;
      transform: scale(0);
      border-radius: 8px;
      transition: transform 0.3s;
    }

    &.active {
      &::before {
        transform: scale(1);
      }
    }
  }
}
.card {
  display: flex;
  justify-content: space-around;
  img {
    width: 80px;
  }
}
</style>
