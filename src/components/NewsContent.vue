<template>
  <div class="detail_container" >
    <!--<div id="ws-zl-dybanner263"></div>-->
    <h1 class="title">{{ contentData.title }}</h1>
    <time class="time">{{ contentData.time }}</time>
    <article ref="art"></article>
    <span class="icon_container">
      <i class="iconfont icon-dianzanb" @click="onZan" v-if="!isZan"></i>
      <i class="iconfont icon-28dianzanfill" @click="onZan" v-else></i>
      <div class="zantext">点赞</div>
    </span>

    <div id="comment_container">
      <label for="textinput">评论</label>
      <input type="input" @focus.stop="onfouc" name="textinput" ref="textinput" v-model="textinput">
      <button type="default" size="small" @click="onsubmit">提交</button>
      <div class="tips">优质评论我们将优先展示</div>
    </div>
  </div>
</template>

<script>
  import {requestNewContent} from '../api/requestNewsContent'
  import {mapMutations} from 'vuex'
  import * as types from '../store/mutation-types'
  import lazy from '../common/js/myLazyload'
  import { Toast } from 'mint-ui';
  export default {
    name: "news-content",
    created() {
     // this.get_ad().then(()=> {
     //   this.change_ad_container_id();
     //   this.add_ad()
     // });
     this.getContent();
    },
    data() {
      return {
        contentData: {},
        lazyObj : null,
        inputFouc: false,
        isZan: false,
        textinput: ''
      }
    },
    mounted() {

    },
    methods: {
      onsubmit() {
        if(this.textinput == ('')) {
          Toast('请输入内容');
          return
        }
        Toast('您的评论已提交审核...');
        this.$refs.textinput.value = ''
        this.inputFouc = false;
      },
      onZan() {
        this.isZan = !this.isZan
      },
      onblur() {
        if(this.inputFouc) {
          this.inputFouc = false;
        }
      },
      onfouc() {
        if(!this.inputFouc) {
          this.inputFouc = true;
        }
      },
      /**
       * 请求广告
       * */
      get_ad() {
        // var ws_dy='zl-dybanner263';
        // var ws_width =300;
        // var ws_height=80;
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

        window.addEventListener('scroll', function () {

        })
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
    padding: 10px 20px 100px 10px;
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
    #comment_container{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #eee;
      overflow: hidden;
      height: 108px;

      line-height: 54px;
      label{
        padding-left: 35px;
        width: 30px;
        margin-left: 10px;
      }

      input[type='input']{
        border-radius: 4px;
        border: 1px solid #eee;
        height: 34px;
        margin: 0 5px;
        width: calc(100% - 175px);
        padding-left:5px;
      }

      button{
        width: 60px;
        text-align: center;
        float: right;
        margin-right: 10px;
        margin-top: 13px;
        height: 32px;
        border: none;
        border-radius: 4px;
        color: #ffffff;
        background-color: #999999;
      }

      .tips{
        text-align: center;
        color: #999999;
        padding-left: 35px;
      }
    }
  }
  .onzan{
   color: #d4221c !important;
  }

  .icon_container{
    position: fixed;
    top: 10%;
    right: 10px;
    i{
      color: #b8bbbf;
      width: 50px;
      font-size: 33px;
    }
    .zantext{
      display: block;
      background-color: #eeeeee;
      padding: 8px;
      border-radius: 5px;
      font-size: 10px;
      color: red;
      margin-right: 2px;
    }
    .icon-28dianzanfill {
      color: red;
    }
  }
</style>
