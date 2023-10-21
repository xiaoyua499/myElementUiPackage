<template>
  <el-button @click="close">123</el-button>
</template>

<script>
export default {
data(){
  return{

  }
},
methods:{
  close(){
    this.$drawer.close(this.$parent.id,()=>{
      console.log(this.$parent.id,'关闭了');
    })
  }
}
}
</script>

<style>

</style>