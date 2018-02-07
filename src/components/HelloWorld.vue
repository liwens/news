<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <mt-button type="primary" size="small">你好呀</mt-button>

  </div>
</template>

<script>
  import {Button} from 'mint-ui';
  import {requestTypeList} from '../api/requestTypeList';

export default {
  name: 'HelloWorld',
  components: {
    "mtButton":Button
  },
  created() {
    this.$nextTick(() =>{
      requestTypeList().then((res)=> {
        console.log(res)
      })
    })

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
