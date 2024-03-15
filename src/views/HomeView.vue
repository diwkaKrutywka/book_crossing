<template>
  <div class="home" :class="{ 'g-mobile': !$store.$state.isBigWin }">
    <!-- dev mobile -->
    <a-drawer v-if="!$store.$state.isBigWin" v-model:open="collapsed" width="250" class="custom-class" :title="null"
      :closable="false" placement="left" :bodyStyle="{
    background: '#f1f1f1',
    padding: 0,
    overflowY: 'auto',
    height: '100vh',
  }">
      <menu @select="collapsed = !collapsed"></menu>
    </a-drawer>
    <!-- end -->
    <a-layout :style="{ height: 100 + '%' }">
      <a-layout-sider width="250" v-if="$store.$state.isBigWin" v-model:collapsed="collapsed" theme="light"
        :trigger="null" collapsible>
        <menu></menu>
        <div class="bt-h"></div>
      </a-layout-sider>
      <a-layout class="layout-content">
        <a-layout-header class="header" style="height: 60px">
          <div v-if="!$store.$state.isBigWin" class="header-left-icon"
            :class="{ 'mobile-icon-size': this.$store.$state.isBigWin == false }" style="margin-right: 5px">
            <menu-unfold-outlined v-if="collapsed" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else @click="() => (collapsed = !collapsed)" />
          </div>

          <div class="flex-1" style="min-width: 10px"></div>
          <div class="align-center pointer" @click.prevent>
            <span style="color:white" class="icon material-symbols-outlined">
              person
            </span>
            <div v-if="$store.hasLogin" class="ellipsis" style="max-width: 110px; color: white">
              {{ $store.userInfo.user_info.fullname || "-" }}
            </div>
          </div>
          <div class="header-right active">
            <div class="right-item">
              <a-dropdown>
                <span class="pointer" style="color: white; margin-right: 3px; white-space: nowrap">
                  <span v-if="langTag == 'kz'">Қазақша</span>
                  <span v-if="langTag == 'rus'">Русский</span>
                  <span v-if="langTag == 'en'">English</span>
                </span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a :style="{ color: langTag == 'kz' ? '#40a9ff' : '#000' }" href="#"
                        @click="setLanguage('kz')">Қазақша</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a :style="{
    color: langTag == 'rus' ? '#40a9ff' : '#000',
  }" href="#" @click="setLanguage('rus')">Русский</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a :style="{ color: langTag == 'en' ? '#40a9ff' : '#000' }" href="#"
                        @click="setLanguage('en')">English</a>
                    </a-menu-item>

                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content class="router-area">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue"

export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Menu,
  },
  data() {
    return {
      collapsed: false,
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

  .header {
    background: #6e24b3;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-right {
      display: flex;
      align-items: center;

      .right-item {
        margin-left: 15px;
      }
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
