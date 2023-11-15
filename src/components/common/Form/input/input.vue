<!-- Input.vue -->
<template>
  <el-input v-model="value" :disabled="disabled" :placeholder="placeholder" @blur="handleBlur"></el-input>
</template>

<script>
export default {
  props: {
    value: String,
    disabled: Boolean,
    placeholder: String,
  },
  data() {
    return {
      localValue: this.value, // 将 prop 的值赋给本地的 data 属性
    };
  },
  methods: {
    handleBlur() {
      // 这里可以添加其他处理逻辑
      this.$emit("blur", this.value);
    },
  },
};
</script>

<style></style>
