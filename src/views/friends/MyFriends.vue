<template>
  <div class="box">
    <h2>{{ total }} Friends</h2>
    <div class="out">
      <div v-for="item in dataList" class="card">
        <div style="display: flex">
          <img
            style="height: 70px; width: 70px; border-radius: 50%"
            src="@/assets/images/person.svg"
          />
          <div style="margin: 0 30px">
            <h1>{{ item.name }} ({{ item.nickname }})</h1>
            <p>
              has 10 books for exchange <br />
              favourite genre: drama
            </p>
          </div>
        </div>
        <a-button @click="goTo()" style="width: 200px" size="large" type="primary"
          >Go to profile</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 16,
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
  methods: {
    goTo() {
      this.$router.push({
        name: 'AboutPerson'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  padding: 20px;
  max-width: 1200px;
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
