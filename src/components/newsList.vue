<template>
  <section
    v-infinite-scroll="getnewsData"
    infinite-scroll-disabled="thisLoading"
    infinite-scroll-distanc=100>
    <ul>
      <template v-for="data in listdata">
        <li class="detail_list" @click="toNewsContent(data.id)">
          <div class="content">
            <h1 class="title">{{ data.title }}</h1>
            <time class="time">{{ data.time }}</time>

          </div>
          <div class="photo" v-if="data.img">
            <img  v-lazy="data.img">
          </div>
        </li>
      </template>
    </ul>
    <i class="loading" v-if="loading">
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
  import {mapGetters} from 'vuex';
  import {thinArr} from "../common/js/tool";

  export default {
    name: "test",
    props: {
      type: ''
    },
    data() {
      return {
        listdata: [],
        page: 1,
        loading: false,
        noData: false
      }
    },
    computed: {
      thisLoading() {
        return this.loading && this.type == this.curType;
      }
    },
    watch: {
      curType: function (newType) {
        if (newType === this.type) {
          this.getnewsData();
          //避免当前频道，滚动条被重置
          console.log("上个频道："+ sessionStorage.getItem('lastType'))
          console.log("当前频道："+ newType)
          if(sessionStorage.getItem('lastType') && sessionStorage.getItem('lastType') !== newType) {
            // alert('重置滚动条')
            this.reCoverScroll();
          }
        }
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 重设滚动条到顶部
       * */
      reCoverScroll() {
        if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0
        } else if (window.pageYOffset) {
          window.pageYOffset = 0
        } else {
          document.body.scrollTop = 0
        }
      },
      toNewsContent(id) {
        this.$router.push({path: `/content/${id}`})
      },
      getnewsData() {
        if (this.curType == this.type) {
          let params = {
            page: this.page,
            type: this.type
          };
          this.loading = true
          requestNewList(params).then((res) => {
            if (res.length == 0) {
              this.noData = true;
              setTimeout(() => {
                this.noData = false;
              }, 1000)
            }
            if (this.listdata.length == 0) {
              this.listdata = res
            } else {
              this.listdata = this.listdata.concat(res)
            }
            this.loading = false;
            this.page++
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'curType'
      ])
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
    ul {
      margin-top: $nav-height;
      width: 100%;
      overflow: auto;
      padding: 0 10px;
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
            height: 40px;
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
