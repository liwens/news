<template>
    <nav class="list_nav">
      <ul class="new_lists">
        <li v-for="list in listdata" class="new_type" @click="onClickAndChangeType(list)" :class="{active:curType == list}">{{ list }}</li>
      </ul>
    </nav>
</template>

<script>
  import {requestTypeList} from '../api/requestTypeList';

  import {mapMutations, mapGetters} from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: "list-nav",
    data(){
      return{
        listdata: []
      }

    },
    computed: {
      ...mapGetters([
        'curType'
      ])
    },
    created() {
      this.$nextTick(() =>{
        requestTypeList().then((res)=> {
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
      })
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  @import "../common/sass/variable";

  .list_nav{

    border-top:1px solid $color-theme;
    border-bottom:1px solid #dddddd;
    overflow-x: scroll;
    background:$color-text-d;
    &::-webkit-scrollbar{
      display: none;
    }
    .new_lists{
      background:#f4f5f6;
      width:2050px;
      .new_type{
        display: inline-block;
        text-align:center;
        padding:10px 16px;
        font-size:16px;

        &.active{
          color: $color-theme;
          -webkit-box-sizing:border-box;
          border-bottom:2px solid $color-theme-d !important;
        }
      }
    }
  }

</style>
