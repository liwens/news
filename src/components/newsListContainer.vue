<template>
  <mt-tab-container v-model="active" :swipeable=true>
    <mt-tab-container-item id="tab-container1">
      1
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2">
      2
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container3">
      3
    </mt-tab-container-item>

  </mt-tab-container>

</template>

<script>
  import {TabContainer, TabContainerItem} from 'mint-ui';

  export default {
    name: "news-list",
    data(){
      return {
        active:"tab-container3"
      }
    },
    components: {
      "mtTabContainer": TabContainer,
      "mtTabContainerItem": TabContainerItem
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">

</style>
