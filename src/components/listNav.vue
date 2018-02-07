<template>
    <nav class="">
      <ul class="newlists">
        <li v-for="list in listdata" class="newtype" @click="onRequestNewList(list)">{{ list }}</li>
      </ul>
    </nav>
</template>

<script>
  import {requestTypeList} from '../api/requestTypeList';
  import {requestNewList} from '../api/requestNewList'
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
      }
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  .newlists{
    .newtype{
      display: inline-block;
      padding: 10px;
    }
  }
</style>
