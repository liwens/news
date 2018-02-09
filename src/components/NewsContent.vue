<template>

  <div class="detail_container">
    <!--{{contentData}}-->
    <h1 class="title">{{ contentData.title }}</h1>
    <time class="time">{{ contentData.time }}</time>
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

            console.log(document.querySelectorAll('p'))
            console.log(res)
          })


        }).catch((err) => {
          console.log(err)
        })
      }
    }

  }
</script>

<style  rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";
  .detail_container {
    padding: 10px;

    h1.title {
      font-size: $font-size-large-x;
      line-height: 26px;
      margin: 10px 0;

    }
    time.time{
      font-size:$font-size-small;
    }
    article {
      width: 100%;
      text-align:left;
      .js_selection_area{
        width:100%;
        p{
          width:100%;
          font-size: $font-size-medium-x;
          line-height: 22px;
          margin:10px auto;
          img{
            width:100%;
            /*margin-left:0;*/
            border:1px solid #ccc;
            margin:10px auto;
          }
          span.ifengLogo{
            img{
              width:16px;
              border:none;
            }
          }
        }
        p:first-child{
          font-size:$font-size-medium;
        }
        p.detailPic{


        }
      }


    }
  }
</style>
