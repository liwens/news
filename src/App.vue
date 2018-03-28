<template>
  <div id="app">
    <i class="loading" v-if="loadingVis">
      <mt-spinner type="triple-bounce" color="rgb(38,162,255)"></mt-spinner>
    </i>
      <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import * as types from './store/mutation-types'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    if(localStorage.getItem('curType')){
      this.set_curType(localStorage.getItem('curType'));
    }
  },
  computed: {
    ...mapGetters([
      'loadingVis'
    ])

  },
  methods: {
    ...mapMutations({
      set_curType: types.SET_CUR_TYPE
    })
  }
}
</script>

<style scoped>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*position: relative;*/

}
.loading{
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
</style>
