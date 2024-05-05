<template>
  <a-modal v-model:open="open" title="Notifications" style="top: 0" @ok="handleClose()">
    <div>
      <div class="card">
        <div><img src="@/assets/images/person.svg" /></div>
        <div>
          <h1>@aru<span>sent request to exchange your book</span></h1>
          <h3>book</h3>
          <div>
            <a-button type="primary">Accept</a-button>
            <a-button danger>Decline</a-button>
          </div>
          <div style="height: 1px; background-color: #006b61"></div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { AuthApi } from '@/api/auth'

// import { AuthApi } from '@/api/auth'
export default {
  data() {
    return {
      friendList: [],
      open: false
    }
  },

  methods: {
    getFriends() {
      AuthApi('users/friends/received', {}, 'GET').then((res) => {
        if (res) {
          this.friendList = JSON.parse(JSON.stringify(res.data.results))
        }
      })
    },
    onLoad() {},
    show() {
      this.open = true
      this.getFriends()
    },
    handleClose() {
      this.open = false
    }
  }
}
</script>
