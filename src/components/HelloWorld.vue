<template>
  <div class="hello">
    <el-button @click="openDrawer">打开</el-button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  methods:{
    openDrawer(){
      this.$Drawer.open({
        direction:'rtl',
        onClose:()=>{
          console.log(123);
        },
        component: ()=>import('./common/123.vue'),
        params:{
          
        }
      }).then(res=>{
        console.log(res);
      })
    }
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
