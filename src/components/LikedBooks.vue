<template>
  <div>
    <span
      class="icon material-symbols-outlined"
      @click="toFav(bookId)"
      :style="{ color: isLiked ? 'red' : 'black' }"
    >
      favorite
    </span>
  </div>
</template>

<script>
import { AuthApi } from '@/api/auth'
export default {
  props: {
    bookId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLiked: false
    }
  },
  methods: {
    toFav(bookId) {
      if (this.isLiked) {
        console.log(bookId)
        // Book is already liked, remove from liked books
        AuthApi('users/liked-books', { book_id: bookId }, 'DELETE').then((res) => {
          if (res) {
            this.isLiked = false
          }
        })
      } else {
        // Book is not liked, add to liked books
        AuthApi('users/liked-books', { book_id: bookId }).then((res) => {
          if (res) {
            this.isLiked = true
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.icon {
  display: flex;
  justify-content: end;
}
</style>
