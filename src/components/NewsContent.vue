<template>
  <div class="detail_container" >
    <!--<i class="loading" v-if="!loading">-->
      <!--<mt-spinner type="snake" color="rgb(229,150,115)"></mt-spinner>-->
    <!--</i>-->
    <h1 class="title">{{ contentData.title }}</h1>
    <time class="time">{{ contentData.time }}</time>
    <article ref="art"></article>
    <!--<div class="ad">-->
      <!--<script type="text/javascript">-->
        <!--var wososspconfig = {-->
          <!--aid: "964"-->
        <!--};-->
      <!--</script>-->
      <!--<script type="text/javascript" src="http://sspj.woso.cn/sitegc/wososearch_ssp.js" ></script>-->
    <!--</div>-->

    <div id="ad" class="ad" ref="ad"></div>
  </div>
</template>

<script>
  import {requestNewContent} from '../api/requestNewsContent'
  import {mapMutations} from 'vuex'
  import * as types from '../store/mutation-types'
  import lazy from '../common/js/myLazyload'
  export default {
    name: "news-content",
    created() {
     this.get_ad();
      this.getContent();
    },
    data() {
      return {
        contentData: {},
        lazyObj : null
      }
    },
    mounted() {
    },
    methods: {
      get_ad() {
        let ad_iframe = document.createElement("iframe");
        ad_iframe.src="static/ad.html";
        ad_iframe.border = 0;
        ad_iframe.width = "100%";
        ad_iframe.height = "100";
        ad_iframe.scrolling= "no";
        document.body.appendChild(ad_iframe);
      },
      /**
       * 根据路由的params值，拿到新闻id发送请求获取新闻详细页
       * */
      getContent() {
        let id = this.$route.params.id;
        let params = {
          id
        };

        //显示过度动画
        this.set_loadingVis(true);
        requestNewContent(params).then((res) => {
          this.contentData = res;
          this.$nextTick(() => {
            this.$refs.art.innerHTML = res.html.replace(/src/g, 'src = "" data-src');
            this.hideCopy()
            //隐藏过度动画
            this.set_loadingVis(false);
            // this.lazyObj = new lazy({
            //   imgs:document.querySelectorAll('img')
            // });
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
      },
      ...mapMutations({
        set_loadingVis : types.SET_LOADING_VIS
      }),
    }
  }
</script>

<style  rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";
  .detail_container {
    padding: 10px 20px;
    .loading{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
