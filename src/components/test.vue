<template>
  <el-button @click="close">关闭</el-button>
</template>

<script>
export default {
methods:{
  close(){
    this.$drawer.closeAll({ 
      confirm :true,
    })
  }
}
}
</script>

<style>

</style>