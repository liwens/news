<template>
  <section
    v-infinite-scroll="getnewsData"
    infinite-scroll-disabled="thisLoading"
    infinite-scroll-distanc=10>
    <ul>
      <template v-for="data in listdata">
        <li class="detail_list" @click="toNewsContent(data.id)">
          <div class="content">
            <h1 class="title">{{ data.title }}</h1>
            <div class="abstract">
              <div class="type">{{ data.type }}</div>
              <time class="time">{{ data.time }}</time>
            </div>
          </div>
          <div class="photo" >
            <img  v-if="data.img" v-lazy="data.img">
          </div>

        </li>
      </template>

    </ul>
    <i class="loading" v-if="loading">
      <mt-spinner type="snake" color="rgb(229,150,115)"></mt-spinner>
    </i>

  </section>
</template>

<script>
  import {requestNewList} from '../api/requestNewList'
  import { Spinner } from 'mint-ui';
  import {mapGetters} from 'vuex';
  import {thinArr} from "../common/js/tool";
  // import Lazy from 'vue-lazyload'
  export default {
    components: {
      "mtSpinner": Spinner
    },
    name: "test",
    props: {
      type: ''
    },
    data() {
      return {
        listdata: [],
        page: 1,
        loading: false
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
        }
      }
    },
    methods: {
      toNewsContent(id) {
        this.$router.push({path: `/content/${id}`})
      },
      getnewsData() {
        if(this.curType == this.type) {
          let params = {
            page: this.page,
            type: this.type
          };
          this.loading = true
          requestNewList(params).then((res) => {
            console.log(res)
            if(this.listdata.length == 0) {
              this.listdata = res
            }else{
              this.listdata.push(res);
              this.listdata = thinArr(this.listdata);
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
    .loading{
      text-align: center;
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    ul {
      margin-top: $nav-height;
      width: 100%;
      overflow: auto;
      li.detail_list {
        width: 100%;
        height: 100px;
        padding: 10px;
        padding-right:20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
        .content {

          margin-top: 10px;
          position: relative;
          .title {
            font-size: $font-size-large;
            line-height: 24px;
          }
          .abstract {
            width: 100%;
            position: absolute;
            bottom: 3px;
            display: flex;
            justify-content: space-between;
            .type {
              border: 1px solid #b3b3b3;
              color: #b3b3b3;
              font-size: $font-size-medium;
              padding: 2px;
            }
            .time {
              font-size: $font-size-medium;
              color: #b3b3b3;
              line-height: 16px;
            }
          }
        }
        .photo {
          margin-right: 5%;
          margin-left: 3%;
          width: 80px;
          height: 80px;
          align-self: center;
          border-radius: 3px;
            img{
            width:80px;
            height:80px;
          }
        }
      }
    }
  }

</style>
