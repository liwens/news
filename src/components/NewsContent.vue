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
    padding: 10px 20px;

    h1.title {
      font-size: $font-size-large-x;
      line-height: 26px;
      margin: 10px 0;

    }
    time.time{
      font-size:$font-size-small;
      color:#b3b3b3;
    }
    article {
      width: 100%;
      text-align:left;
      .js_selection_area{
        width:100%;
        p{
          width:100%;
          font-size: $font-size-medium-x;
          line-height: 24px;
          margin:14px auto;
          img{
            width:100%;
            /*margin-left:0;*/

          }
          span.ifengLogo{
            img{
              width:16px;
            }
          }
        }
        p:first-child{
          font-size:$font-size-medium;
        }
        p.detailPic{
          width:100%;
          border:1px solid #ccc;
          margin:10px auto;

        }
      }


    }
  }
</style>
