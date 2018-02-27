<template>
  <div id="app">
    <i class="loading" v-if="loadingVis">
      <mt-spinner type="snake" color="rgb(229,150,115)"></mt-spinner>
    </i>
      <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'loadingVis'
    ])

  },
  methods: {

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


