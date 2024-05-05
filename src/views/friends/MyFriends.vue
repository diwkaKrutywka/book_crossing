<template>
  <div class="box">
    <h2>{{ this.friends.length }} Friends</h2>
    <div class="out">
      <div v-for="item in this.friends" class="card">
        <div style="display: flex">
          <img
            style="height: 70px; width: 70px; border-radius: 50%"
            src="@/assets/images/person.svg"
          />
          <div style="margin: 0 30px">
            <h1>{{ item.email }} ({{ item.username }})</h1>
            <p>
              Город <br />
              {{ item.city }}
            </p>
          </div>
        </div>
        <a-button @click="goTo(item.id)" style="width: 200px" size="large" type="primary"
          >Go to profile</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/utils/http'
export default {
  data() {
    return {
      friends: [],
      dataList: [
        {
          name: 'Diana Omarbayeva',
          nickname: '@diwkaa'
        },
        {
          name: 'Diana Omarbayeva',
          nickname: '@diwkaa'
        },
        {
          name: 'Diana Omarbayeva',
          nickname: '@diwkaa'
        }
      ]
    }
  },
  mounted() {
    this.fetchFriends()
  },
  methods: {
    goTo(e) {
      this.$router.push({
        name: 'SeePerson',
        params: {
          id: e
        }
      })
    },
    async fetchFriends() {
      let res = await http({
        url: '/users/friends',
        method: 'GET'
      })
      if (res) {
        this.friends = res.data.result.friends
      }
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  padding: 20px;
  max-width: 1200px;
  height: 100vh;
  margin: auto;
  h2 {
    margin-left: 30px;
  }
  .out {
    border: 1px #f1f1f1 solid;
    border-radius: 16px;
    padding: 20px;
  }

  .card {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    align-items: center;
  }
}
</style>
