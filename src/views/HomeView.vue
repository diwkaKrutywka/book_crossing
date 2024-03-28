<template>
  <div class="home" :class="{ 'g-mobile': !$store.$state.isBigWin }">
    <a-layout :style="{ height: 100 + '%' }">
      <a-layout class="layout-content">
        <a-layout-header class="header" style="height: 60px">
          <div style="width: 40%; display: flex; align-items: center;">
            <img style="padding: 10px; margin: 0 40px; height: 50px;" src="@/assets/images/logo.svg">

            <h2 style="margin-right: 40px; font-weight: 300" @click="goToPage(item.name)" v-for="item in navList">{{
    item.label }}</h2>
          </div>
          <div>
            <a-button class='button'>
              {{ $t('l_Signup') }}
            </a-button>
            <a-button class='button'>
              {{ $t('l_Login') }}
            </a-button>
          </div>
        </a-layout-header>
        <div class="own">
          <h2 v-for="item in ownList" @click="goToPage(item.name)">{{ item.name }}</h2>

        </div>
        <a-layout-content class="router-area">
          <router-view></router-view>
          <FooterPage>

          </FooterPage>
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
export default {
  components: {
    FooterPage
  },
  data() {
    return {
      navList: [{
        label: "Home",
        name: "HomePage"
      },
      {
        label: "Books",
        name: 'BookList'
      },
      {
        label: "About",
        name: 'AboutUs'
      },
      {
        label: "Quizzess",
        name: 'Quizzess'
      }
      ],
      ownList: [{
        label: "My books",
        name: "MyBooks"
      },
      {
        label: "My collections",
        name: 'BookList'
      },
      {
        label: "My friends",
        name: 'AboutUs'
      },
      {
        label: "Settings",
        name: 'Profile'
      }
      ]
    }
  },
  computed: {
    langTag() {
      return this.$i18n.locale
    },
  },
  methods: {
    setLanguage(e) {
      this.$i18n.locale = e
      localStorage.setItem("currentLang", e)
    },
    goToPage(name) {
      this.$router.push({
        name: name
      })
    }
    // -- end --
  },
}
</script>
<style lang="scss" scoped>
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
        color: #F89E0F;
        text-decoration: underline;
        // margin-top: 10px;
      }
    }
  }

  .header {
    background: #006B61;
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
      }
    }
  }

  .button {
    background-color: #006B61;
    color: #ffffff;
    font-weight: bolder;
    margin-left: 10px;

    :hover {
      background-color: #F89E0F;
      ;
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
    padding: 10px;
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
      content: "";
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
</style>
