<template>
  <mt-tab-container :value="activetype" :swipeable=true>
    <template v-for="type in listTypes">
      <mt-tab-container-item :id="type" class="item">
        {{ type }}
      </mt-tab-container-item>
    </template>

  </mt-tab-container>

</template>

<script>
  import {TabContainer, TabContainerItem} from 'mint-ui';
  import {requestTypeList} from '../api/requestTypeList';
  import {mapGetters} from 'vuex'

  export default {
    name: "news-list",
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
      }
    },
    mounted() {
      this.setActiveType()
    },
    components: {
      "mtTabContainer": TabContainer,
      "mtTabContainerItem": TabContainerItem
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
      }
    }
  }
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  .item{
    height: 400px;

  }
</style>
