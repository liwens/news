<template>
  <div class="detail_container">
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
    data() {
      return {
        contentData: null
      }
    },
    methods: {
      /**
       * 根据路由的params值，拿到新闻id发送请求获取新闻详细页
       * */
      getContent() {
        let id = this.$route.params.id;
        let params = {
          id
        }
        requestNewContent(params).then((res) => {
          this.contentData = res;
          this.$nextTick(() => {
            this.$refs.content.innerHTML = res.html;
            this.hideCopy()
          })
        }).catch((err) => {
          alert('网络错误，错误代码:'+ err.toString())
        })
      },
      hideCopy() {
        let strong = document.querySelectorAll('strong');
        let patt1 = new RegExp('凤凰网')
        let patt2 = new RegExp('追究法律责任')
        strong.forEach(el=> {
          let ret1 = patt1.test(el.innerHTML);
          let ret2 = patt2.test(el.innerHTML);
          if(ret1 && ret2) {
            el.parentNode.removeChild(el);
          }
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
      .yc_con_txt,.js_selection_area{
        width:100%;
        p{
          width:100%;
          font-size: $font-size-medium-x;
          line-height: 24px;
          margin:14px auto;
          img{
            width:100% !important;
            margin: 0 !important;
            height:auto;

          }
          span.ifengLogo{
            img{
              width:16px !important;
              display:none;

            }
          }
        }

        p.detailPic{
          width:100%;
          border:1px solid #ccc;
          margin:10px auto;
        }
        p.picIntro{
          text-align:center;
          margin-top:0;
          font-size:$font-size-medium;
          line-height:18px;
        }
      }


    }
  }
</style>
