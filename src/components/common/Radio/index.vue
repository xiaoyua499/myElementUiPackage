<template>
  <div>
    <el-radio-group v-model="radio" @input="change">
      <el-radio :label="1">选项1</el-radio>
      <el-radio :label="2">选项2</el-radio>
      <el-radio :label="3"><span @click="onClick">选项3</span></el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    vRadio: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      radio: this.vRadio,
      textarea: '',
    };
  },
  watch: {
    vRadio(newVal) {
      this.radio = newVal;
    }
  },
  methods: {
    change(e) {
      console.log(e);
      this.$emit('changeRadio', e)
    },
    onClick() {
      // this.radio = 3;
      if(this.radio===3){
        this.change(3);
        console.log('点击了选项3')
      }
      
    }
  }
}
</script>
