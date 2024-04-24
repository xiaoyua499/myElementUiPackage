<template>
  <!-- 传入表单数据、表单列表，生成表单 -->
  <div class="form">
    <el-form ref="form" :model="formData" class="form">
      <el-row :gutter="20" v-for="item in form" :key="item.id">
        <el-col :span="span" v-for="formItem in item">
          <el-form-item
            :label="formItem.label"
            :prop="item.id"
            :rules="item.rules"
          >
            <component
              :is="getComponentName(formItem.type)"
              :value="formData[formItem.id]"
              :disabled="formItem.isDisabled"
              :placeholder="formItem.placeholder"
              :options="formItem.options"
              :min="formItem.min"
              :max="formItem.max"
              :step="formItem.step"
              :format="formItem.format"
              :rows="formItem.rows"
              :maxlength="formItem.maxlength"
              :rules="formItem.rules"
              @blur="handleBlur(formItem.id)"
              @change="handleChange(formItem.id)"
              @upload-success="handleUploadSuccess(formItem.id)"
              @before-upload="beforeUpload"
              @remove="handleRemove"
            >
            </component>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表单操作按钮 -->
      <div v-if="btnConfig.showBtn" class="btnBox">
        <el-form-item>
          <el-button
            v-for="btn in btnConfig.buttons"
            :key="btn.label"
            :type="btn.type"
            @click="clickBtn(btn.fun)"
            >{{ btn.label }}</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Input from "./input/input.vue";
export default {
  name: "Form",
  components: { Input },
  props: {
    formList: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    colNum: {
      type: Number || String,
      required: false,
      default: 2,
    },
    btnConfig: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: [],
    };
  },
  computed: {
    span() {
      return 24 / this.colNum;
    },
  },
  methods: {
    getComponentName(type) {
      switch (type) {
        case "input":
          return "Input";
        case "autocomplete":
          return "AutocompleteElement";
        case "select":
          return "SelectElement";
        // 添加其他组件
        default:
          return "Input"; // 默认使用 InputElement 组件
      }
    },
    initForm(formList, groupSize) {
      console.log(formList, groupSize);
      if (!Array.isArray(formList) || formList.length === 0 || groupSize <= 0) {
        return [];
      }
      const groupedArr = [];
      let currentGroup = [];
      for (let i = 0; i < formList.length; i++) {
        const currentItem = formList[i];
        if (currentItem.isWaklkAlone || currentItem.type === "textarea") {
          if (currentGroup.length > 0) {
            groupedArr.push(currentGroup);
            currentGroup = [];
          }
          groupedArr.push([currentItem]);
        } else {
          currentGroup.push(currentItem);
        }

        if (currentGroup.length === groupSize) {
          groupedArr.push(currentGroup);
          currentGroup = [];
        }
      }
      if (currentGroup.length > 0) {
        groupedArr.push(currentGroup);
      }
      this.form = groupedArr;
      console.log(this.form);
    },
    querySearchAsync(queryString, callback) {
      this.$emit("querySearchAsync", queryString, (res) => {
        const restaurants = res;
        callback(restaurants);
      });
    },
    clickBtn(fun) {
      switch (fun) {
        case "submit":
          this.submitForm();
          break;
        case "reset":
          this.resetForm();
          break;
        default:
          this.other();
          break;
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$listeners["on-submit"]) {
            this.$emit("on-submit", this.formData);
          } else {
            console.log("请传入on-submit");
            return;
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      if (this.$listeners["on-reset"]) {
        this.$emit("on-reset");
      } else {
        console.log("请传入on-reset");
        return;
      }
    },
    other() {
      if (this.$listeners["on-other"]) {
        this.$emit("on-other", this.formData);
      } else {
        console.log("请传入on-other");
        return;
      }
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    beforeUpload(file) {
      console.log(file);
      // 返回 false 以阻止上传
      return true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleBlur(id) {
      // 处理组件的 blur 事件
      console.log(`Blur event for ${id}`);
    },
    handleChange(id) {
      // 处理组件的 change 事件
      console.log(`Change event for ${id}`);
    },
    handleUploadSuccess(id) {
      // 处理组件的上传成功事件
      console.log(`Upload success event for ${id}`);
    },
  },
  mounted() {
    this.initForm(this.formList, this.colNum);
  },
};
</script>

<style></style>
