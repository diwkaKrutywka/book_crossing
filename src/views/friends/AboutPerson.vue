<template>
  <div class="boxed">
    <div class="card">
      <img src="@/assets/images/person.svg" />
      <div>
        <h1>{{ info.name }} ({{ info.nickname }})</h1>
        <p>
          Favourite genre of books: <span v-for="fav in info.favs">{{ fav }}, </span>
        </p>
        <p>Friends: {{ info.friends }}</p>
        <p>Last login: <span style="color: #006b61"> now online</span></p>
        <p>Registered: 7 month ago</p>
        <p>Books: {{ info.books }}</p>
        <p>Exchanged with others: {{ info.exchange }} times</p>
      </div>
    </div>

    <h1>Книга, которая вы рассматриваете сейчас</h1>

    <div class="book">
      <span
        style="color: black; display: flex; justify-content: end"
        class="material-symbols-outlined"
      >
        favorite
      </span>
      <img style="height: 200px" src="@/assets/images/book5.svg" />
      <h3 style="color: #393280; display: flex; justify-content: center">Atomy habits</h3>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        name: 'Aruzhan',
        nickname: '@arujka03',
        favs: ['fantasy', 'psychology'],
        friends: 10,
        books: 8,
        exchange: 4
      }
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  padding: 30px;
  display: flex;
  border: 1px black solid;
  width: 500px;
  justify-content: space-around;
  border-radius: 16px;

  p {
    font-weight: 500;
  }
}

.book {
  padding: 13px;
  width: 200px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  text-align: center;
}
</style>
