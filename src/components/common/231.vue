<template>
  <el-button @click="close">231</el-button>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    close() {
      this.$drawer.closeAll()
    }
  },
  mounted(){
    console.log(this.$parent.params.id);
  }
}
</script>

<style></style>