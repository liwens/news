<template>
  <div>
    <h1>{{contentData.title}}</h1>
    <article ref="content"></article>
  </div>

</template>

<script>
  import {requestNewContent} from '../api/requestNewsContent'

  export default {
    name: "news-content",
    created() {
      this.getContent()
    },
    mounted() {

    },
    data() {
      return {
        contentData: null
      }
    },
    methods: {
      getContent() {
        let id = this.$route.params.id;
        let params = {
          id
        }
        requestNewContent(params).then((res) => {
          this.contentData = res;
          this.$nextTick(() => {
            this.$refs.content.innerHTML = res.html;
          })
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    }

  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">

</style>
