<template>
  <div style="max-width: 1300px; margin: auto">
    <a-row>
      <a-col :span="12" v-for="item in dataList">
        <div class="card">
          <div>
            <div class="img-border">
              <img style="height: 250px" src="@/assets/images/mybook1.svg" />
            </div>
            <h2 class="h2">
              {{ item.title }}
            </h2>
          </div>
          <div>
            <h2>{{ item.title }}</h2>
            <h3>{{ item.author }}</h3>
            <a-rate :value="5" />
            <p style="margin-top: 20px">{{ item.abt }}</p>
            <p>{{ item.overview }}</p>
            <a-button type="primary" @click="onEdit()">Edit</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
    <div style="text-align: center">
      <a-button style="margin: 70px auto; height: 50px" type="primary" @click="onUpload()"
        >Upload new book</a-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          img: '',
          title: 'Great Travel At Desert',
          author: 'Sanchit Howdy',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......'
        },
        {
          img: '',
          title: 'Great Travel At Desert',
          author: 'Sanchit Howdy',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......'
        },
        {
          img: '',
          title: 'Great Travel At Desert',
          author: 'Sanchit Howdy',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......'
        },
        {
          img: '',
          title: 'Great Travel At Desert',
          author: 'Sanchit Howdy',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......'
        },
        {
          img: '',
          title: 'Great Travel At Desert',
          author: 'Sanchit Howdy',
          abt: 'J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine',
          overview:
            'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......'
        }
      ]
    }
  },
  methods: {
    onEdit() {},
    onUpload() {
      this.$router.push({
        name: 'AddEditBooks'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  margin: 40px;
  .h2 {
    text-align: center;
    color: #393280;
    margin-top: 10px;
    font-size: 16px;
    margin-right: 30px;
  }
  .img-border {
    margin-right: 30px;
    padding: 5px;

    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
}
</style>
