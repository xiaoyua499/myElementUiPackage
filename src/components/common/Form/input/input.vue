<template>
  <div class="t-input">
    <el-input
      type="text"
      :placeholder="placeholder"
      clearable
      @clear="clearValue"
      :value="currentVal"
      @input="value=>$emit('input',value)"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'TInput',
  data() {
    return {
      currentVal: this.value
    }
  },
  props: {
    isTip: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: '请输入金额'
    },
    isShow: { // 是否显示尾缀
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'currency'
    },
  },
  watch: {
    value: {
      handler(val) {
        // console.log('组件watch', val)
        this.currentVal = val
      }
    }
  },
  methods: {
    clearValue() {
      this.$emit('clearInput', this.currentVal)
    },
    toThousandsNoZero(num) {
      return num ? ((isNaN(parseFloat(num.toString().replace(/,/g, ''))) ? 1 : parseFloat(num.toString().replace(/,/g, '')))).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
      }) : ''
    }
  }
}
</script>
