<template>
    <nav>
      <ul>
        <li v-for="list in listdata">{{ list }}</li>
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

</style>
