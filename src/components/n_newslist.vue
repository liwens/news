<template>
  <section
    v-infinite-scroll="getnewsData"
    infinite-scroll-disabled="loading"
    infinite-scroll-distanc=200
  >
    <ul>
      <template v-for="data in curListData.data">
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
      <mt-spinner type="snake" color="rgb(229,150,115)"></mt-spinner>
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
        curType: function (newType) {
          this.initData();
          this.getnewsData();
          //避免当前频道，滚动条被重置
            console.log("上个频道："+ sessionStorage.getItem('lastType'))
            console.log("当前频道："+ newType)
            // if(sessionStorage.getItem('lastType') && sessionStorage.getItem('lastType') !== newType) {
            //   // alert('重置滚动条')
            //   this.reCoverScroll();
            // }
        }
      },
      computed: {
        curdata() {
          return this.curListData;
        },
        ...mapGetters([
          'curType',
          'curListData'
        ])
      },
      mounted() {
        if(this.curListData.data.length == 0) {
          this.getnewsData();
        }
      },
      methods: {
        toNewsContent(id) {
          this.$router.push({path: `/content/${id}`})
        },
        initData() {
          this.remove_curListData()
          this.page = 1;
        },
        /**
         * 请求数据
         * */
        getnewsData() {
            let params = {
              page: this.curListData.page,
              type: this.curType
            };

          if(this.curType == '') return
            this.loading = true
            this.loadingIconVis = true;
            requestNewList(params).then((res) => {
              //没有数据
              if (res.length == 0) {
                this.noData = true;
                setTimeout(() => {
                  this.noData = false;
                  this.loading = true;
                  this.loadingIconVis = false;
                }, 1000)
                return;
              }
              this.set_curListData(res)
              this.loading = false;
              this.loadingIconVis = false;
            })
          },
        ...mapMutations({
          set_curListData: types.SET_CUR_LIST_DATA,
          remove_curListData: types.REMOVE_CUR_LIST_DATA
        })
      }
    }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";

  section {
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
    padding: 0 10px;
    box-sizing: border-box;
    ul {
      margin-top: $nav-height;
      width: 100%;
      overflow: auto;


      li.detail_list {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 20px;

        /*padding-top:20px;*/
        .content {
          max-width: 90%;
          margin-top: 10px;
          position: relative;
          .title {
            font-size: $font-size-medium-x;
            line-height: 22px;
            height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            /*display:-webkit-box;*/
            /*-webkit-box-orient:vertical;*/
            /*-webkit-line-clamp:2;*/
            /*overflow:hidden;*/

            /*overflow : hidden;*/
            /*text-overflow: ellipsis;*/
            /*display: -webkit-box;*/
            /*-webkit-line-clamp: 2;*/
            /*-webkit-box-orient: vertical;*/
          }

          .time {
            font-size: $font-size-medium;
            color: #b3b3b3;
            line-height: 16px;
            position:absolute;
            bottom:15px;
          }
        }
        .photo {
          margin-right: 20px;
          margin-left: 10px;
          width: 85px;
          height: 85px;
          align-self: center;
          img {
            width: 85px;
            height: 85px;
            border-radius: 5px;
          }
        }
      }
    }
  }

</style>
