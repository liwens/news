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
  import {velocity} from 'velocity-animate';
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
    mounted(){
    },
    methods: {
      setULwidth() {
        this.$nextTick( () =>{
          let ul = document.querySelector('.new_lists'),

            // let li = document.getElementsByClassName('.new_type');
            li = ul.querySelectorAll('li.new_type');
          console.log(ul);
          console.log(li);
          let liWidth = 0;
          for( let i=0; i<li.length; i++){
            // console.log(li[i].getBoundingClientRect().width)
            liWidth += li[i].getBoundingClientRect().width;
          }
          ul.style.width = liWidth + "px";
          // console.log(ul.offsetWidth);
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
          // let li = ul.querySelectorAll('.new_type');
          let window_offsetWidth = window.innerWidth; //屏幕宽度;
          // let speed = 0,timer=null;
          if (dom) {
            let
              //中间位置的left =( 屏幕宽度 - li宽度 ) / 2;
              diffWidth = (window_offsetWidth - dom.getBoundingClientRect().width) / 2,
              //目标值 = offsetLeft - 中间值的left
              targetOffset = dom.offsetLeft - diffWidth;

             console.log(window_offsetWidth);
             console.log(ul.getBoundingClientRect().width);
            console.log(ul.getBoundingClientRect().left);

            if (targetOffset < 0 ) {

              ul.style.tranform = `translateX(0px)`;
              return;
            }
            else{
              ul.style.transform = `translateX(${-targetOffset}px)`;

              // Velocity(ul,{left:-targetOffset},
              //   {duration:400},
              //   { easing:"swing"});
            }



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
