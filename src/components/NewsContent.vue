<template>
  <div class="detail_container" >
    <h1 class="title">{{ newsData.title }}</h1>
    <time class="time">{{ newsData.time }}</time>
    <article ref="art"></article>
    <div id="ws-zl-dybanner263"></div>
    <content-in-list></content-in-list>

  </div>
</template>

<script>
  import {requestNewContent} from '../api/requestNewsContent'
  import {mapMutations,mapGetters} from 'vuex'
  import * as types from '../store/mutation-types'
  import lazy from '../common/js/myLazyload'
  import { Toast,MessageBox } from 'mint-ui';
  import ContentInList from './contentInList';

  export default {
    name: "news-content",
    components: {
      ContentInList
    },
    created() {
      this.get_ad();
      this.getContent();
    },
    data() {
      return {
        newsData: {},
        lazyObj : null,
        inputFouc: false,
        isZan: false,
        textinput: ''
      }
    },
    mounted() {
      this.check();
    },
    computed: {
      ...mapGetters([
        'contentData'
      ])
    },
    watch: {
      contentData:function(newData) {
        this.newsData = newData;
        this.$refs.art.innerHTML = newData.html.replace(/src/g, 'src = "" data-src');
        this.hideCopy();
        new lazy({
          imgs:document.querySelectorAll('img')
        });
        this.setScrollTop();
      }
    },
    methods: {
      /**
       * 检测低版本浏览器，并给出提示
       * */
      check() {
        let nav = window.navigator;
        let userAgent = nav.userAgent;
        let v = userAgent.match(/Chrome\/(.*?)+/g);
        if(v) {
          v =  v[0].replace('Chrome/', "");
          if(v) {
            v = parseInt(v)
            if(v < 50 && !sessionStorage.getItem('donshow')) {
              MessageBox.confirm('检测到你的浏览器版本过低，如不能正常浏览，请升级或更换浏览器' +
                '（点击取消，不再显示这条内容）').then(()=>{
              }).catch((err)=> {
               sessionStorage.setItem('donshow', 1)
              })
            }
          }
        }
      },
      /**
       * 请求广告
       * */
      get_ad() {
       return new Promise((resolve, reject)=> {
         let adjs = document.createElement('script');
         adjs.src='http://nads.wuaiso.com/newswap/wap/js/asyunion.js ';
         document.body.appendChild(adjs);
         adjs.onload = function () {
           return resolve();
         }
        })
      },
      /**
       * 修改第一个广告id
       * */
      change_ad_container_id() {
        let last_ad_con =  document.getElementById('ws-zl-dybanner263');
        let id = last_ad_con.id;
        last_ad_con.setAttribute('id', id+1);
      },
      /**
       * 生成广告容器。
       * */
      add_ad() {
       let ad = document.createElement('div');
       ad.setAttribute('id', 'ws-zl-dybanner263');
       document.querySelector('.detail_container').appendChild(ad);
       this.get_ad();
      },
      bindscroll() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let windowHeight = window.innerHeight;
        let bodyHeight = document.body.scrollHeight ||  document.documentElement.scrollHeight;

        // window.addEventListener('scroll', function () {
        //
        // })
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
          // this.newsData = res;
          // console.log(res);
          this.set_content_data(res);

          this.$nextTick(() => {
            this.$refs.art.innerHTML = res.html.replace(/src/g, 'src = "" data-src');
            this.hideCopy();
            //隐藏过度动画
            this.set_loadingVis(false);
            this.lazyObj = new lazy({
              imgs:document.querySelectorAll('img')
            });
          })

        }).catch((err) => {
          alert('网络错误，错误代码:'+ err.toString())
        })
      },
      setScrollTop() {
        document.body.scrollTop = 0 +'px'
        document.documentElement.scrollTop = 0 + 'px'
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
        set_loadingVis : types.SET_LOADING_VIS,
        set_content_data: types.SET_CONTENT_DATA
      }),
    }
  }
</script>

<style  rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";
  .detail_container {
   padding: 5px 10px;

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
          font-size: $font-size-large;
          line-height: 30px;
          margin:14px auto;
          font-weight: 400;
          img{
            width:100% !important;
            /*margin: 0 !important;*/
            margin: 5px 0;
            height:auto;

          }
          span.ifengLogo{
            img{
              width:16px !important;
              display:none !important;
            }
          }
        }
        span.ifengLogo{
          img{
            width:16px !important;
            display:none !important;
          }
        }
        p.detailPic{
          width:100%;
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
