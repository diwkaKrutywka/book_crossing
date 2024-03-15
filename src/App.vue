<template>
  <div>
    <a-config-provider :theme="theme">
      <router-view />
    </a-config-provider>
    <div class="loading-mask" v-if="isLoading">
      <a-spin style="margin: auto" size="large" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme: {
        token: {
          colorPrimary: '#3ab06c',
          fontSize: 12,
          wireframe: false
        }
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store?.isLoading || false
    },
  },
  mounted() {
    this.watchChangeSize()
    window.onresize = () => {
      this.watchChangeSize()
    }
  },
  methods: {
    watchChangeSize() {
      let offsetWid = document.documentElement.clientWidth;
      if (offsetWid >= 900 && this.$store?.isBigWin == false) {
        // console.log('Big window');
        this.$store.isBigWin = true;
      } else if (offsetWid < 900 && this.$store?.isBigWin == true) {
        console.log('sml window');
        this.$store.isBigWin = false;
      }
      offsetWid = null
    },
  },
}
</script>
<style lang="scss">
.loading-mask {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  display: flex;
}
</style>
