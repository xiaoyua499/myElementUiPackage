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
    console.log(this);
    this.$root.onClose(123)
  }
}
}
</script>

<style>

</style>