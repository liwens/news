<template>
    <nav class="">
      <ul class="newlists">
        <li v-for="list in listdata" class="newtype">{{ list }}</li>
      </ul>
    </nav>
</template>

<script>
  import {requestTypeList} from '../api/requestTypeList';
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
