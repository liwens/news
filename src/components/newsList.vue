<template>
  <section v-scroll>
    <ul id="list_container">
      <template v-for="(data, index) in curListData">
        <!--ad-->
        <li v-if="index % 10 == 0 && index != 0" class="ad_list"><div id="ws-zl-dybanner263" ></div></li>
        <!--ad-->
        <li class="detail_list" @click="toNewsContent(data.id)">
          <div class="content">
            <h1 class="title">{{ data.title }}</h1>
            <time class="time">{{ data.time }}</time>
          </div>
          <div class="photo" v-if="data.img">
            <img v-lazy="data.img">
          </div>
        </li>
      </template>
    </ul>
    <i class="loading" v-if="loadingIconVis">
      <mt-spinner type="triple-bounce" color="rgb(38,162,255)"></mt-spinner>
    </i>
    <mt-popup
      v-model=noData
      position="top"
      popup-transition="popup-fade">
      <div class="noData">没有数据了...</div>
    </mt-popup>
  </section>
</template>

<script>

  import {requestNewList} from '../api/requestNewList'
  import {mapGetters, mapMutations} from 'vuex';
  import * as types from '../store/mutation-types'

  export default {
    directives: {
      /**
       * 滚动加载的自定义指令
       */
      scroll: {
        bind: function (el, binding, vnode) {
          window.addEventListener('scroll', vnode.context.scrollLoad)
        },
        unbind: function (el,binding, vnode) {
          window.removeEventListener('scroll', vnode.context.scrollLoad)
        }
      }
    },
    name: "n_newslist",
    data() {
      return {
        listdata: [],
        page: 1,
        noData: false,
        loading: false,
        loadingIconVis: false
      }
    },
    watch: {
      /**
       * 记录当前频道
       * */
      curType: function (newType) {
        this.initData();
        this.getnewsData();
      }
    },
    computed: {
      ...mapGetters([
        'curType',
        'curListData',
        'listPage'
      ])
    },
    mounted() {
      if (this.curListData.length == 0) {
        this.getnewsData();
      }
    },
    methods: {
      /**
       * 清除上一条广告的id
       * */
      remove_ad() {
        let last_ad_con =  document.getElementById('ws-zl-dybanner263');
        if(last_ad_con) {
          last_ad_con.removeAttribute('id');
        }
      },
      /**
       * 加载广告
       * */
      get_ad() {
          let adjs = document.createElement('script');
          adjs.src='http://nads.wuaiso.com/newswap/wap/js/asyunion.js ';
          document.body.appendChild(adjs);
      },
      scrollLoad() {
        //滚动条高度（页面被卷去高度）
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //文档高度
        let bodyHeight = document.body.scrollHeight ||  document.documentElement.scrollHeight;

        if (scrollTop + window.innerHeight >= bodyHeight - 50) {
          //判断请求发送标志位，避免重复请求
          if (this.loading) return;
          //发送请求
          this.getnewsData();
        }
      },
      /**
       * 前往新闻详细页，传入新闻ID值
       * */
      toNewsContent(id) {
        sessionStorage.setItem('donLoading', 'don');
        this.set_loadingVis(true);
        this.$router.push({path: `/content/${id}`})
      },
      /**
       * 切换频道时，重置vuex里记录的新闻列表数据和page
       * */
      initData() {
        this.remove_curListData();
        this.page = 1;
      },
      /**
       * 请求数据
       * */
      getnewsData() {
        let params = {
          page: this.listPage,
          type: this.curType
        };
        console.log(this.listPage)
        if (this.curType == '') return
        this.loading = true
        this.loadingIconVis = true;
        requestNewList(params).then((res) => {
          //没有数据
          if (res.length == 0) {
            this.noData = true;
            this.loadingIconVis = false;
            setTimeout(() => {
              this.noData = false;

            }, 2000)
            return;
          }
          this.set_curListData(res);
          this.set_list_page()
          this.loading = false;
          this.loadingIconVis = false;
          //加载广告
             // this.remove_ad();
             // this.get_ad();
        })
      },
      ...mapMutations({
        set_curListData: types.SET_CUR_LIST_DATA,
        remove_curListData: types.REMOVE_CUR_LIST_DATA,
        set_loadingVis : types.SET_LOADING_VIS,
        set_list_page : types.SET_LIST_PAGE
      }),
      destroyed() {

      }
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";

  .loading {
    text-align: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .noData {
    color: $color-theme;
    padding: 15px 10px;
    border-radius: 5px;
    background-color: $color-text-nd;
  }

 #list_container {
    margin-top: $nav-height;
    width: 100%;
    overflow: auto;
    padding: 0 10px;
    box-sizing: border-box;
    li.detail_list {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eaeaea;
      padding: 5px 0;
      /*padding-top:20px;*/
      .content {
        max-width: 90%;
        margin-top: 10px;
        position: relative;
        .title {
          font-size: $font-size-large;
          line-height: 22px;
          height: 44px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .time {
          font-size: $font-size-small;
          color: #b3b3b3;
          line-height: 16px;
          position: absolute;
          bottom: 15px;
        }
      }
      .photo {
        margin-left: 10px;
        /*width: 85px;*/
        /*height: 85px;*/
        align-self: center;
        img {
          width: 110px;
          height: 75px;
        }
      }
    }
  }


</style>
