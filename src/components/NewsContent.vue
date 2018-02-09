<template>
  <div>新闻详细页<br/>
  {{contentData}}
  </div>

</template>

<script>
  import {requestNewContent}from '../api/requestNewsContent'
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
      getContent(){
        let id = this.$route.params.id;
        let params = {
          id
        }
        requestNewContent(params).then((res) => {
          this.contentData = res;
          console.log(res)
        }).catch((err)=> {
          console.log(err)
        })
      }
    }

  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">

</style>
