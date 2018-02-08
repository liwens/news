<template>
  <section>
    <ul>
      {{type}}
      {{listdata}}
      <template v-for="data in listdata">

      </template>

    </ul>
  </section>
</template>

<script>
  import {requestNewList} from '../api/requestNewList'
  import {mapGetters} from 'vuex'
    export default {
      name: "test",
      props: {
          type:''
      },
      data() {
        return {
          listdata: [],
          page: 1
        }
      },
      watch: {
        curType: function (newType) {
          if(newType === this.type) {
            this.getnewsData();
          }
        }
      },
      methods: {
        getnewsData() {
          let params = {
            page: this.page,
            type: this.type
          }
          requestNewList(params).then((res)=> {
            this.listdata = res;
          })
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

</style>
