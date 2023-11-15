<template>
  <!-- 传入表单数据、表单列表，生成表单 -->
  <div class="form">
      <el-form ref="form" :model="formData" class="form">
          <el-row :gutter="20" v-for="item in form" :key="item.id">
            <el-col :span="span" v-for="formItem in item">
              <el-form-item  :label="formItem.label" :prop="formItem.id" :rules="formItem.rules">
                <!-- 输入框 -->
                <template v-if="formItem.type === 'input'">
                  <el-input v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder"></el-input>
                </template>
                <!-- 自动完成输入框 -->
                <template v-else-if="formItem.type === 'autocomplete'">
                  <el-autocomplete v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder" :fetch-suggestions="querySearchAsync" :trigger-on-focus="false"></el-autocomplete>
                </template>
                <!-- 下拉选择框 -->
                <template v-else-if="formItem.type === 'select'">
                  <el-select v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder">
                    <el-option :label="option.label" :value="option.value" v-for="(option, index) in formItem.options" :key="index"></el-option>
                  </el-select>
                </template>
                <!-- 级联选择框 -->
                <template v-else-if="formItem.type === 'cascader'">
                  <el-cascader v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder" :options="formItem.options" :props="formItem.props" clearable :show-all-levels="false"></el-cascader>
                </template>
                <!-- 文本域 -->
                <template v-else-if="formItem.type === 'textarea'">
                  <el-input type="textarea" :rows="formItem.rows ? formItem.rows : '8'" resize="none" :maxlength="formItem.maxlength ? formItem.maxlength : '1000'" show-word-limit v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder"></el-input>
                </template>
                <!-- 日期选择器 -->
                <template v-else-if="formItem.type === 'datepicker'">
                  <el-date-picker v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :placeholder="formItem.placeholder" type="date" :format="formItem.format ? formItem.format : 'yyyy-MM-dd'"></el-date-picker>
                </template>
                <!-- 文件上传 -->
                <template v-else-if="formItem.type === 'upload'">
                  <el-upload
                    class="upload-demo"
                    action="/upload"
                    :disabled="formItem.isDisabled"
                    :show-file-list="false"
                    :on-success="handleUploadSuccess"
                    :before-upload="beforeUpload"
                    :on-remove="handleRemove">
                    <el-button slot="trigger" size="small" :disabled="formItem.isDisabled">点击上传</el-button>
                  </el-upload>
                </template>
                <!-- 单选框 -->
                <template v-else-if="formItem.type === 'radio'">
                  <el-radio-group v-model="formData[formItem.id]" :disabled="formItem.isDisabled">
                    <el-radio :label="option.label" v-for="(option, index) in formItem.options" :key="index">{{ option.label }}</el-radio>
                  </el-radio-group>
                </template>
                <!-- 多选框 -->
                <template v-else-if="formItem.type === 'checkbox'">
                  <el-checkbox-group v-model="formData[formItem.id]" :disabled="formItem.isDisabled">
                    <el-checkbox :label="option.label" v-for="(option, index) in formItem.options" :key="index">{{ option.label }}</el-checkbox>
                  </el-checkbox-group>
                </template>
                <!-- 开关 -->
                <template v-else-if="formItem.type === 'switch'">
                  <el-switch v-model="formData[formItem.id]" :disabled="formItem.isDisabled"></el-switch>
                </template>
                <!-- 滑块 -->
                <template v-else-if="formItem.type === 'slider'">
                  <el-slider v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :min="formItem.min" :max="formItem.max" :step="formItem.step"></el-slider>
                </template>
                <!-- 评分 -->
                <template v-else-if="formItem.type === 'rate'">
                  <el-rate v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :max="formItem.max"></el-rate>
                </template>
                <!-- 添加其他 Element UI 表单元素类型的处理 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 表单操作按钮 -->
          <div v-if="btnConfig.showBtn" class="btnBox">
            <el-form-item>
              <el-button v-for="btn in btnConfig.buttons" :key="btn.label" :type="btn.type" @click="clickBtn(btn.fun)">{{ btn.label }}</el-button>
            </el-form-item>
          </div>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    formList: {
      type: Array,
      required: true
    },
    formData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    colNum: {
      type: Number || String,
      required: false,
      default: 2,
    },
    btnConfig: {
      type: Object,
      required: false,
      default: () => ({})
    }
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
    initForm(formList, groupSize) {
      console.log(formList, groupSize);
      if (!Array.isArray(formList) || formList.length === 0 || groupSize <= 0) {
        return [];
      }
      const groupedArr = [];
      let currentGroup = [];
      for (let i = 0; i < formList.length; i++) {
        const currentItem = formList[i];
        if (currentItem.isWaklkAlone || currentItem.type === 'textarea') {
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
      this.$emit('querySearchAsync', queryString, (res) => {
        const restaurants = res
        callback(restaurants)
      })
    },
    clickBtn(fun) {
      switch (fun) {
        case 'submit':
          this.submitForm()
          break;
        case 'reset':
          this.resetForm()
          break;
        default:
          this.other()
          break;
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$listeners['on-submit']) {
            this.$emit('on-submit', this.formData)
          } else {
            console.log('请传入on-submit');
            return
          }
        } else {
          console.log('error submit');
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
      if (this.$listeners['on-reset']) {
        this.$emit('on-reset')
      } else {
        console.log('请传入on-reset');
        return
      }
    },
    other() {
      if (this.$listeners['on-other']) {
        this.$emit('on-other', this.formData)
      } else {
        console.log('请传入on-other');
        return
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
  },
  mounted() {
    this.initForm(this.formList, this.colNum);
  },
};
</script>

<style></style>
