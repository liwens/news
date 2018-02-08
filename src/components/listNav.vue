<template>
    <nav class="list_nav">
      <ul class="new_lists">
        <li v-for="list in listdata" class="new_type" @click="onRequestNewList(list)">{{ list }}</li>
      </ul>
    </nav>
</template>

<script>
  import {requestTypeList} from '../api/requestTypeList';
  import {requestNewList} from '../api/requestNewList'
  import {mapMutations} from 'vuex'
  import * as types from '../store/mutation-types'
  export default {
    name: "list-nav",
    data(){
      return{
        listdata: []
      }

    },
    created() {
      this.$nextTick(() =>{
        requestTypeList().then((res)=> {
          this.listdata = res;
        })
      })
    },
    methods: {
      onRequestNewList(list) {
        console.log(list)
        // list  = encodeURI(encodeURI(list));
        let parames = {
          type: list,
          page:1
        };

        requestNewList(parames).then((res)=> {
          console.log(res);
        })
      },
      ...mapMutations({
        set_news_type: types.SET_CUR_TYPE
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
      }
    }
  }

</style>
