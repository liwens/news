<template>
  <mt-tab-container v-model="activetype" :swipeable=true>
    <template v-for="type in listTypes">
      <mt-tab-container-item :id="type" class="item">
        <news-list :type="type"></news-list>
      </mt-tab-container-item>
    </template>

  </mt-tab-container>

</template>

<script>
  import {TabContainer, TabContainerItem} from 'mint-ui';
  import {requestTypeList} from '../api/requestTypeList';
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../store/mutation-types'
  import NewsList from './newsList';

  export default {
    data() {
      return {
        activetype: ''
      }
    },
    computed: {
      ...mapGetters([
        'listTypes',
        'curType'
      ])
    },
    watch: {
      curType: function (newType) {
        this.activetype = newType;
      },
      /**
       * 滑动时，修改state的值
       * */
      activetype: function (curtype) {
        this.set_news_type(curtype);
      }
    },
    mounted() {
      this.setActiveType()
    },
    components: {
      "mtTabContainer": TabContainer,
      "mtTabContainerItem": TabContainerItem,
      NewsList
    },
    methods: {
      /**
       * 请求新闻分类列表，设置当前频道
       * */
      setActiveType() {
        this.$nextTick(() => {
          requestTypeList().then((res) => {
            this.activetype = res[0];
          })
        })
      },
      ...mapMutations({
        set_news_type: types.SET_CUR_TYPE,
      })
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  .item{


  }
</style>
