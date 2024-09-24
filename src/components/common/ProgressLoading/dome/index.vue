<template>
  <div style="width: 30%;margin: 0 auto;">
    <el-button type="primary" @click="onClick">主要按钮</el-button>
  </div>
</template>

<script>
import ProgressLoading from './common/ProgressLoading/index.vue'
export default {
  name: 'text',
  components: {
    ProgressLoading
  },
  props: {
  },
  data() {
    return {
      percentage: 0,
      text: ''
    };
  },
  watch: {
  },
  methods: {
    onClick() {
      const ploading = this.$ploading({
        background: 'rgba(255, 255, 255, 0.8)',
        width: '50%',
        stateText: '加载中...',
        stateTextStyle: {
          color: '#ccc',
          fontSize: '20px',
        },
        showText:false
      });
      let time = setInterval(() => {
        this.percentage += 10;
        this.text = '加载中...'
        if (this.percentage > 100) {
          this.percentage = 100;
          this.text = '已完成!!!'
          time = null
          // setTimeout(()=>{
          //   ploading.close()
          // },100)
        }
        ploading.increase(this.percentage, this.text)
      }, 1000);
    },
  }
}
</script>
