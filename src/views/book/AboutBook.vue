<template>
  <div style="max-width: 1300px; margin: auto">
    <div style="display: flex">
      <div>
        <div class="about">
          <div class="img-box">
            <img style="height: 300px" src="@/assets/images/book8.svg" />
          </div>
          <div style="display: block; padding: 20px">
            <h1>Куриный бульон</h1>
            <div style="height: 5px; background-color: #f89e0f; margin-bottom: 10px"></div>
            <h3>Michael Josh</h3>
            <p style="margin-top: 20px">
              <span style="color: #006b61; font-weight: 600; font-size: 15px">Genre: </span>Drama
            </p>

            <h2>Overview</h2>
            <p>
              ibulum nisl efficitur. Praesent ultrices diam enim. In ut tellus sed sem placerat
              sollicitudin. Donec quis mollis dolor. Etiam viverra, arcu cursus porttitor porttitor,
              diam nunc auctor nisl, quis placerat magna erat et odio.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="available">
      <p>Available books for exchanging:</p>
      <a-row :gutter="[16, 16]">
        <a-col :xs="6" :lg="6" :md="6">
          <div class="card">
            <img class="book" src="@/assets/images/book2.svg" />
            <div class="bottom">
              <h3>@saiman</h3>
              <img class="img" src="@/assets/images/person.jpg" />
            </div>
            <a-button type="primary" class="w-100">Go to exchange</a-button>
          </div>
        </a-col>
        <a-col :xs="6" :lg="6" :md="6">
          <div class="card">
            <img class="book" src="@/assets/images/book2.svg" />
            <div class="bottom">
              <h3>@saiman</h3>
              <img class="img" src="@/assets/images/person.jpg" />
            </div>
            <a-button type="primary" class="w-100">Go to exchange</a-button>
          </div>
        </a-col>
        <a-col :xs="6" :lg="6" :md="6">
          <div class="card">
            <img class="book" src="@/assets/images/book2.svg" />
            <div class="bottom">
              <h3>@saiman</h3>
              <img class="img" src="@/assets/images/person.jpg" />
            </div>
            <a-button type="primary" class="w-100">Go to exchange</a-button>
          </div>
        </a-col>
        <a-col :xs="6" :lg="6" :md="6">
          <div class="card">
            <img class="book" src="@/assets/images/book2.svg" />
            <div class="bottom">
              <h3>@saiman</h3>
              <img class="img" src="@/assets/images/person.jpg" />
            </div>
            <a-button type="primary" class="w-100">Go to exchange</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div style="display: flex; margin: 100px 0">
      <div class="reviews">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <div style="display: flex">
            <h2 style="margin-right: 10px">{{ rate }}</h2>
            <a-rate v-model:value="rate" allow-half />
          </div>
          <p>10 reviewers</p>
        </div>
        <div style="padding: 20px">
          <div class="rate">
            <a-rate :value="5" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="4" count="4" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="3" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="2" />
            <a-progress :percent="30" />
          </div>

          <div class="rate">
            <a-rate :value="0" count="1" />
            <a-progress :percent="30" />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; margin: auto">
        <a-button type="primary">Write a review</a-button>
        <a-button style="margin-top: 20px" type="primary" ghost>See all reviewes</a-button>
      </div>
    </div>

    <div style="margin: 60px 0px">
      <h2 class="letter">Reviews</h2>
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
export default {
  data() {
    return {
      rate: 4.6,
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
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
h1 {
  color: #006b61;
  font-size: 30px;
  font-weight: 900;
}
.letter {
  color: #006b61;
  justify-content: left;
  font-size: 20px;
  font-weight: 800;
  margin-left: 20px;
}
h2 {
  color: #006b61;
  font-size: 25px;
  font-weight: 700;
}
.about {
  display: flex;
  width: 700px;
  border: 1px #f1f1f1 solid;
  padding: 20px;
  margin-right: 40px;

  .img-box {
    padding: 20px 20px 20px 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-right: 60px;
  }
}
.reviews {
  width: 600px;

  .rate {
    display: flex;
  }
}
.available {
  text-align: center;
  margin: auto;
  padding: 100px 0;

  p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 70px;
  }
  .card {
    text-align: center;
    max-width: 170px;
    .book {
      height: 230px;
      position: relative;
    }
    .img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      z-index: 1;
      top: -35px;
      right: -25px;
      position: relative;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
