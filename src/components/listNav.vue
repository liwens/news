<template>
  <nav class="list_nav">
    <ul class="new_lists" ref="ul">
      <li v-for="list in listdata" class="new_type" @click="onClickAndChangeType(list)"
          :class="{active:curType == list}">{{ list }}
      </li>
    </ul>
  </nav>
</template>

<script>
  import {requestTypeList} from '../api/requestTypeList';
  import {mapMutations, mapGetters} from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: "list-nav",
    data() {
      return {
        listdata: []
      }
    },
    watch: {
      curType: function (newtype) {
        this.moveNav()
      }
    },
    computed: {
      ...mapGetters([
        'curType'
      ])
    },
    created() {
      this.$nextTick(() => {
        requestTypeList().then((res) => {
          this.listdata = res;
          this.set_list_typs(res);
          this.setULwidth();
        })
      })
    },
    methods: {
      setULwidth() {
        this.$nextTick(() => {
          let ul = document.querySelector('.new_lists'),
            li = ul.querySelectorAll('li.new_type');
          console.log(ul);
          console.log(li);
          let liWidth = 0;
          for (let i = 0; i < li.length; i++) {
            liWidth += li[i].getBoundingClientRect().width;
          }
          ul.style.width = liWidth + "px";
        })

      },
      onClickAndChangeType(list) {
        this.set_news_type(list);
      },
      ...mapMutations({
        set_news_type: types.SET_CUR_TYPE,
        set_list_typs: types.SET_LIST_TYPES
      }),
      moveNav() {
        this.$nextTick(() => {
          let dom = document.querySelector('.active');
          let ul = document.querySelector('.new_lists');
          let window_offsetWidth = window.innerWidth; //屏幕宽度;
          if (dom) {
            let
              //中间位置的left =( 屏幕宽度 - li宽度 ) / 2;
              diffWidth = (window_offsetWidth - dom.getBoundingClientRect().width) / 2,
              //目标值 = offsetLeft - 中间值的left
              targetOffset = dom.offsetLeft;

            // console.log( ul.getBoundingClientRect().width)
            // console.log('diff:'+diffWidth)
            // console.log("宽度" + ul.getBoundingClientRect().width)
            // console.log('left:' + ul.getBoundingClientRect().left)
            // console.log('liLeft:'+ dom.offsetLeft)
            // console.log("目标值：" + targetOffset)
            // console.log(`计算值： ${targetOffset +  diffWidth + dom.getBoundingClientRect().width}`)
            // //开始
            // if (targetOffset < 0) {
            //   ul.style.transform = `translateX(0px)`;
            //   return;
            // }
            //结束
            if(targetOffset > ul.getBoundingClientRect().width - window_offsetWidth) {
             console.log(ul.getBoundingClientRect().width - window_offsetWidth)
              ul.style.tranform = `translateX(${ul.getBoundingClientRect().width - window_offsetWidth + 40}px)`;
              return;
            }
            ul.style.transform = `translateX(${-targetOffset}px)`;
          }
        })
      }
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";

  .list_nav {
    position: relative;
    z-index: 100;
    border-top: 1px solid $color-theme;
    border-bottom: 1px solid #dddddd;
    height: $nav-height;
    overflow-x: scroll;
    background: $color-text-nd;

    &::-webkit-scrollbar {
      display: none;
    }
    .new_lists {
      position: absolute;
      background: #f4f5f6;
      .new_type {
        display: inline-block;
        text-align: center;
        padding: 10px 16px;
        font-size: 16px;

        &.active {
          color: $color-theme;
          -webkit-box-sizing: border-box;
          border-bottom: 2px solid $color-theme-d !important;
        }
      }
    }
  }

</style>
