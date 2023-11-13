<template>
  <div class="hello">
    <el-button @click="openDrawer">打开</el-button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  methods: {
    openDrawer() {
      this.$drawer.open(
        {
          direction: 'ltr',
          title: '标题',
          component: () => require('../components/test.vue'),
          params: {}
        }
      )
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
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
