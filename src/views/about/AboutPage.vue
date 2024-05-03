<template>
  <div>
    <h1>About us</h1>
    <div style="max-width: 900px" class="box">
      <div class="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus
          ornare vestibulum et, feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus.
          Curabitur maximus est sed porta scelerisque. Sed suscipit, arcu volutpat feugiat posuere,
          eros nisi tristique nibh, mollis vehicula lectus tortor eu purus. Donec ut tortor blandit,
          sagittis diam eget, suscipit eros. Quisque at magna neque. Nulla faucibus mi at nunc
          mattis placerat. Pellentesque quis augue quis elit tristique auctor. Integer varius est
          orci, vel egestas felis dictum nec.
        </p>
        <img src="@/assets/images/abt1.svg" />
      </div>
    </div>
    <div style="max-width: 700px" class="box">
      <div class="content">
        <img src="@/assets/images/abt2.svg" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus
          ornare vestibulum et, feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus.
          Curabitur maximus est sed porta scelerisque. Sed suscipit, arcu volutpat feugiat posuere,
          eros nisi tristique nibh, mollis vehicula lectus tortor eu purus. Donec ut tortor blandit,
          sagittis diam eget, suscipit eros. Quisque at magna neque. Nulla faucibus mi at nunc
          mattis placerat. Pellentesque quis augue quis elit tristique auctor. Integer varius est
          orci, vel egestas felis dictum nec.
        </p>
      </div>
      <div class="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus
          ornare vestibulum et, feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus.
          Curabitur maximus est sed porta scelerisque. Sed suscipit, arcu volutpat feugiat posuere,
          eros nisi tristique nibh, mollis vehicula lectus tortor eu purus. Donec ut tortor blandit,
          sagittis diam eget, suscipit eros. Quisque at magna neque. Nulla faucibus mi at nunc
          mattis placerat. Pellentesque quis augue quis elit tristique auctor. Integer varius est
          orci, vel egestas felis dictum nec.
        </p>
        <img src="@/assets/images/abt3.svg" />
      </div>
    </div>
    <div class="info">
      <div>
        <h1>856</h1>
        <h3>Exchanged books</h3>
      </div>
      <div>
        <h1>145</h1>
        <h3>Signed up users</h3>
      </div>
      <div>
        <h1>11</h1>
        <h3>Different genres</h3>
      </div>
    </div>
    <div style="text-align: center; margin-bottom: 50px">
      <div
        style="
          background-color: #005555;
          color: white;
          margin: 40px auto 10px auto;
          width: fit-content;
          height: 50px;
          text-align: center;
          align-items: center;
        "
      >
        <h1>HAVE A QUESTION?</h1>
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
  font-size: 40px;
  text-align: center;
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
  background-color: #fef7eb;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 20px;

  h1 {
    color: #f89e0f;
  }
}
</style>
