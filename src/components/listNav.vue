<template>
  <nav class="list_nav">
    <ul class="new_lists">
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
        })
      })
    },
    methods: {
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
          let ul = document.querySelector('.new_lists')
          let window_offsetWidth = window.innerWidth; //屏幕宽度;
          if (dom) {
            let domoffsetWidth = dom.offsetLeft,
              //中间值 =( 屏幕宽度 - li宽度 ) / 2;
              diffWidth = (window_offsetWidth - dom.getBoundingClientRect().width) / 2,
              //目标值 = offset - 中间值
              targetOffset = domoffsetWidth - diffWidth;
            console.log(ul.getBoundingClientRect())
            if (targetOffset < 0) {
              ul.style.left = '0px';
              return;
            }
            ul.style.left = -targetOffset + 'px'

            // console.log(`ul left:` + ul.getBoundingClientRect().left)
            // console.log(`bounding:` + boundingLeft)
            // console.log('offsetLeft: ' + dom.offsetLeft)
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
    border-top: 1px solid $color-theme;
    border-bottom: 1px solid #dddddd;
    height: 38px;
    /*overflow: hidden;*/
    overflow-x: scroll;
    background: $color-text-d;
    &::-webkit-scrollbar {
      display: none;
    }
    .new_lists {
      position: absolute;

      background: #f4f5f6;
      /*width: 2050px;*/
      /*min-width: 2050px;*/
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
