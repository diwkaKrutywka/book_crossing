<template>
<div style="padding: 30px; max-width: 1300px; margin: auto">
<h2>{{$t('l_Choose_book')}}</h2>
<div style="margin-top: 30px">
          <a-row :gutter="[16, 16]">
            <a-col :xs="8" :lg="8" :md="8" v-for="item in allList">
              <div
                style="
                  padding: 13px;
                  width: 200px;
                  box-shadow:
                    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
                  text-align: center;
                "
              >
                <LikedBooks :bookId="item.book.id"></LikedBooks>

                <img style="height: 200px; width: 150px" :src="item.image_url" @click="aboutBook(item.book_id)"/>
                <h3 style="color: #393280; display: flex; justify-content: center">
                  {{ item.book.title }}
                </h3>
                <h4
                  style="color: #f89e0f; display: flex; justify-content: end"
                  @click="goExchange(item.id, this.id)"
                >
                  {{$t('l_Choose')}}
                </h4>
              </div>
            </a-col>
          </a-row>
        </div>
</div>
</template>
<script>
import { AuthApi } from '@/api/auth'
export default{
    data(){
        return{
            id:null,
            u_id: null,
            choose :null,
allList:[]
        }
    },
    mounted(){
let id = this.$route.params.id
let u_id = this.$route.params.u_id
if(id && u_id){
this.id = id
this.u_id = u_id
this.getBook()
}
    },
    methods:{
        getBook(){
          let path = "users/" + this.u_id + "/stock"
 AuthApi(path, {}, 'GET').then((res) => {
        if (res) {
          this.allList = JSON.parse(JSON.stringify(res.data.result))
         // console.log(allList)
        }
      })
        },
        goExchange(b_id, id){
          let path = "books/request/" + id + "/received"
 AuthApi(path, {
  book_id: b_id
 }, 'PUT').then((res) => {
        if (res) {
          message.success('You send request to change')
          this.$router.back()
        }
      })
        },
        aboutBook(id){
           this.$router.push({
        name: 'AboutBook',
        params: {
          id: id
        }
      })
        }
    }
}
</script>
<style>
</style>