<template>
  <div>
    <!--分类列表-->
    <list-nav></list-nav>
    <!--新闻详细列表-->
    <news-list></news-list>
  </div>

</template>

<script>
    import listNav from './listNav'
    import newsList from './newsListContainer'
    export default {
      components: {
        listNav,
        newsList
      }
    }
</script>

<style scoped rel='stylesheet/scss' lang="scss">

</style>
