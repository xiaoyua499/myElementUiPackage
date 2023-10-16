<template>
  <div>
    <el-drawer 
    title="我是标题" 
    :visible.sync="drawer" 
    :direction="direction" 
    :before-close="onClose"
    :modal=false
    :wrapperClosable=false
    >
      <slot>
        <span>我来啦!</span>
      </slot>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },
  methods: {
    onClose(done) {
      done()
      // this.drawer=true
      // console.log(data, 123);
    }
  }
}
</script>

<style></style>