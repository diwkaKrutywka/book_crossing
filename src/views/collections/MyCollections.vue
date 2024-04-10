<template>
  <div style="max-width: 1200px; margin: auto">
    <div class="card" v-for="(item, index) in dataList">
      <div style="margin-right: 140px; text-align: center">
        <img src="@/assets/images/book8.svg" />
        <h1>{{ item.title }}</h1>
      </div>
      <div class="top">
        <div style="top: 0">
          <div style="display: flex; justify-content: space-between">
            <h2>Available</h2>
            <span class="material-symbols-outlined"> favorite </span>
          </div>
          <h3><span>Author: </span>{{ item.author }}</h3>
          <h3><span>Genre: </span>{{ item.genre }}</h3>
          <p>{{ item.overview }}</p>
        </div>
        <div class="bottom">
          <!-- <a-progress :percent="99" style="width: 80%" /> -->
          <div style="background-color: #f89e0f; height: 7px; width: 70%"></div>
          <h5>Go To Exchange</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          genre: 'Drama',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          genre: 'Drama',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        },
        {
          img: 'book1.svg',
          title: 'Catcher in the Rye',
          genre: 'Drama',
          author: 'J.D Salinger',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publication, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  display: flex;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 16px;
  margin-bottom: 50px;
  img {
    height: 200px;
  }
}
.top {
  display: flex;
  flex-direction: column;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  bottom: 0;
}
h1 {
  color: #393280;
  font-size: 12px;
  margin-top: 10px;
  font-weight: 800;
}
h2 {
  color: #006b61;
  font-size: 16px;
}
h5 {
  color: #006b61;
  font-weight: 800;
}
</style>
