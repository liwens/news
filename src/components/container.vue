<template>
  <div>
    <!--分类列表-->
      <keep-alive>
        <list-nav></list-nav>
      </keep-alive>
    <!--新闻详细列表-->
      <news-list></news-list>
  </div>
</template>

<script>
    import listNav from './listNav'
    import newsList from './newsList'
    export default {
      components: {
        listNav,
        newsList
      }
    }
</script>

<style scoped rel='stylesheet/scss' lang="scss">

</style>
