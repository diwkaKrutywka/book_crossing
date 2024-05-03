<template>
  <div class="box">
    <div class="items">
      <img src="@/assets/images/logo.svg" />
      <h2 style="margin-top: 30px">
        Clarity gives you the blocks and <br />
        components you need to create <br />
        a truly professional website.
      </h2>
    </div>
    <div class="items">
      <h1>COMPANY</h1>
      <h2 v-for="item in navList">{{ item.label }}</h2>
    </div>
    <div class="items">
      <h1>HELP</h1>
      <h2 v-for="item in helpList">{{ item.label }}</h2>
    </div>
    <div class="items">
      <h3>NEWSLETTER</h3>
      <a-input
        style="margin-top: 20px"
        v-model:value="email"
        placeholder="Ente email address"
      ></a-input>
      <a-button style="margin-top: 20px; width: 100%" type="primary">Subscribe now</a-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      navList: [
        {
          label: 'Home',
          name: 'Home'
        },
        {
          label: 'Books',
          name: 'BooksList'
        },
        {
          label: 'About',
          name: 'About'
        },
        {
          label: 'Profile',
          name: 'Profile'
        },
        {
          label: 'Quizzess',
          name: 'Quizzess'
        }
      ],
      helpList: [
        {
          label: 'Customer Support'
        },
        {
          label: 'Delivery Details'
        },
        {
          label: 'Terms & Conditions'
        },
        {
          label: 'Privacy Policy'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  display: flex;
  justify-content: space-between;
  background-color: #006b61;
  color: white;
  font-family: 'Poppins';
  .items {
    padding: 60px;
    align-items: center;
  }
}

h1 {
  color: #f89e0f;
  font-weight: bolder;
  font-size: 18px;
}
</style>
