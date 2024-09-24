<template>
  <div v-show="visible" class="ploadingBox" :style="{ backgroundColor: background || '' }">
    <div class="ploading-content">
      <el-progress
        class="loading-spinner"
        :style="{width: width||100,}"
        :percentage="percentage"
        :color="progressColor"
        :show-text="showText"
      ></el-progress>
      <p v-if="isShowStateText" class="ploading-text" :style="stateTextStyle">{{ stateText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressLoading',
  data() {
    return {
      visible: false,//是否显示loading
      width: null,//loading长度
      percentage: 0,//当前进度
      progressColor:'',//当前颜色
      showText:true,//是否显示进度文本,默认显示
      background:null,//背景颜色
      stateText:null,//进度条状态提示
      stateTextStyle:{},//进度条状态提示文本样式
      isShowStateText:true,//是否显示进度条状态提示文本,默认显示
    }
  }
}
</script>

<style lang="less" scoped>
.ploadingBox {
  position: fixed;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .ploading-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .loading-spinner {
      top: 50%;
      margin-top: -21px;
      width: 100%;
      text-align: center;
      position: absolute;
    }
    .ploading-text{
      margin-top: 24px;
    }
  }
}
</style>