<!-- Input.vue -->
<template>
  <el-input class="input" v-model="localModel" :disabled="disabled" :placeholder="placeholder" :rules="rules"
    @blur="handleBlur" ref="input">
  </el-input>
</template>

<script>
export default {
  props: {
    model: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    rules: Array,
  },
  data() {
    return {
      localModel: this.model,
    };
  },
  watch: {
    model(newVal) {
      // 当父组件传递的 model 发生变化时更新本地的 localModel
      this.localModel = newVal;
    },
  },
  methods: {
    handleBlur() {
      // 使用 Element UI 的表单校验方法
      this.$nextTick(() => {
        this.$parent.$refs.form.validate((valid, error) => {
          if (!valid) {
            // 处理校验失败的逻辑
            console.error(error);
          }
        });
      });
    },
  },
};
</script>

<style></style>
