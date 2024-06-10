<template>
  <div>
    <div
      style="
        display: flex;
        width: 80%;
        margin: auto;
        padding: 40px;
        justify-content: space-between;
        margin-bottom: 50px;
      "
    >
      <div style="width: 60%">
        <h1>ABOUT US</h1>
        <h2>
          Welcome to Bookers, a vibrant community where book lovers unite to share their passion for
          reading, exchange ideas, and foster connections through the power of literature. At
          Bookers, we believe in the transformative power of books. Whether you're a seasoned
          bibliophile or just beginning your literary journey, our platform offers a welcoming space
          to discover new stories, engage in thought-provoking discussions, and connect with fellow
          book enthusiasts from around the world.
        </h2>
        <div class="info">
          <div>
            <h1>56</h1>
            <h3>Exchanged books</h3>
          </div>
          <div>
            <h1>45</h1>
            <h3>Signed up users</h3>
          </div>
          <div>
            <h1>11</h1>
            <h3>Different genres</h3>
          </div>
        </div>
      </div>
      <div>
        <img src="@/assets/images/Unsplash.svg" style="width: 300px" />
      </div>
    </div>

    <!-- mission -->
    <div style="width: 80%; margin: auto; padding: 40px">
      <div style="display: flex; margin-bottom: 50px; justify-content: space-between">
        <div style="width: 100%">
          <h3 style="font-weight: 900; color: #005555">-- Our mission</h3>
          <h2 style="color: #f89e0f">Explore our Top Categories</h2>
        </div>
        <div>
          <h2>
            Our mission is simple: to promote a love of reading and cultivate a community of
            creative and critical thinkers. We believe that books have the power to inspire,
            educate, and spark meaningful conversations. By bringing readers together, we aim to
            ncelebrate the diversity of voices and perspectives found within the pages of our
            favorite books.
          </h2>
        </div>
      </div>
      <div style="display: flex">
        <div
          v-for="item in cardList"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
            margin: 0 20px;
          "
        >
          <img v-if="item.img == '1'" src="@/assets/images/abte.svg" style="width: 300px" />
          <img v-if="item.img == '2'" src="@/assets/images/abte1.svg" style="width: 300px" />
          <img v-if="item.img == '3'" src="@/assets/images/abte2.svg" style="width: 300px" />
          <h2 style="color: #005555">{{ item.name }}</h2>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <!-- missiion end -->

    <div style="text-align: center; margin-bottom: 50px">
      <div
        style="
          background-color: #005555;
          color: white;
          margin: 40px auto 10px auto;
          width: fit-content;
          /* height: 50px; */
          padding: 20px 150px;
          text-align: center;
          align-items: center;
        "
      >
        <h1 style="color: white">HAVE A QUESTION?</h1>
      </div>
      <h4>WRITE TO EMAIL BOOKERSINKZ@GMAIL.COM</h4>
    </div>

    <div style="margin: 60px 70px">
      <h2
        style="
          color: #006b61;
          justify-content: left;
          font-size: 20px;
          font-weight: 800;
          margin-left: 20px;
        "
      >
        Reviews
      </h2>
      <a-row>
        <a-col :span="12" v-for="item in dataList">
          <div style="display: flex; padding: 30px">
            <div style="margin-right: 30px">
              <img src="@/assets/images/user.svg" />
            </div>
            <div>
              <a-rate :value="item.rate" allow-half></a-rate>
              <p>{{ item.comment }}</p>
              <h3>{{ item.user }}</h3>
              <p>{{ item.createdAt }}</p>
            </div>
            <hr />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { AuthApi } from '@/api/auth'

export default {
  data() {
    return {
      bookList: [],
      cardList: [
        {
          img: '1',
          name: 'Book sharing',
          desc: 'Share your favorite books with others and discover new titles recommended by fellow community members.'
        },
        {
          img: '2',
          name: 'Discussion Forums',
          desc: 'Connect with fellow readers for encouragement, recommendations, and support on your reading journey.'
        },
        {
          img: '3',
          name: 'Enhance your knowledge',
          desc: 'Engage in lively discussions about literature, authors, and literary themes with like-minded individuals via quizzes.'
        }
      ],
      dataList: [
        {
          rate: 5,
          comment:
            'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
          user: 'Jenny Wilson',
          createdAt: 'January28, 2021'
        },
        {
          rate: 4.5,
          comment:
            'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
          user: 'Jenny Wilson',
          createdAt: 'January28, 2021'
        },
        {
          rate: 5,
          comment:
            'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
          user: 'Jenny Wilson',
          createdAt: 'January28, 2021'
        },
        {
          rate: 4.5,
          comment:
            'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
          user: 'Jenny Wilson',
          createdAt: 'January28, 2021'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 30px;
  color: #006b61;
  // text-align: center;
  font-weight: bolder;
}

.box {
  padding: 20px;
  background-color: #006b61;
  border-radius: 20px;
  color: white;
  margin: 50px auto;

  .content {
    display: flex;
    align-items: center;
    padding: 20px;

    img {
      max-height: 300px;
      max-width: 250px;
    }

    p {
      font-size: 15px;
    }
  }
}

.info {
  max-width: 400px;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;

  h1 {
    color: #f89e0f;
  }
}
</style>
