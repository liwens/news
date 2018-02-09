<template>
  <section>
    <ul
      v-infinite-scroll="getnewsData"
      infinite-scroll-disabled="thisLoading"
      infinite-scroll-distanc=10
    >

      <template v-for="data in listdata">
        <li class="detail_list" @click="toNewsContent(data.id)">
          <div class="content">
            <h1 class="title">{{ data.title }}</h1>
            <div class="abstract">
              <div class="type">{{ data.type }}</div>
              <time class="time">{{ data.time }}</time>
            </div>
          </div>
          <img class="photo" v-lazy="data.img">
        </li>
        <!--<img src="" alt="" v-if="data.img=''">-->
      </template>

    </ul>
  </section>
</template>

<script>
  import {requestNewList} from '../api/requestNewList'

  import {mapGetters} from 'vuex';
  import {thinArr} from "../common/js/tool";
  // import Lazy from 'vue-lazyload'
  export default {
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
          console.log(newType)
          console.log('当前:'+this.type)
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
          }
          requestNewList(params).then((res) => {
            this.loading = true
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

  ul {
    width: 100%;
    overflow: auto;
    li.detail_list {
      width: 100%;
      height: 100px;
      padding: 10px;
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
      img.photo {
        margin-right: 5%;
        margin-left: 3%;
        width: 80px;
        height: 80px;
        align-self: center;
        border-radius: 3px;
      }
    }
  }
</style>
