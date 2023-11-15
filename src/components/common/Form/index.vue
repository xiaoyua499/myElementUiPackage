<template>
  <!-- 传入表单数据、表单列表，生成表单 -->
  <div class="form">
    <el-form ref="form" :model="formData" class="form">
      <el-row :gutter="20" v-for="item in form" :key="item.id">
        <el-col :span="span" v-for="formItem in item">
          <el-form-item :label="formItem.label" :prop="formItem.id" :rules="formItem.rules">
            <!-- 输入框 -->
            <template v-if="formItem.type === 'input'">
              <el-input v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder"></el-input>
            </template>
            <!-- 自动完成输入框 -->
            <template v-else-if="formItem.type === 'autocomplete'">
              <el-autocomplete v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder" :fetch-suggestions="querySearchAsync"
                :trigger-on-focus="false"></el-autocomplete>
            </template>
            <!-- 下拉选择框 -->
            <template v-else-if="formItem.type === 'select'">
              <el-select v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder">
                <el-option :label="option.label" :value="option.value" v-for="(option, index) in formItem.options"
                  :key="index"></el-option>
              </el-select>
            </template>
            <!-- 级联选择框 -->
            <template v-else-if="formItem.type === 'cascader'">
              <el-cascader v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder" :options="formItem.options" :props="formItem.props" clearable
                :show-all-levels="false"></el-cascader>
            </template>
            <!-- 文本域 -->
            <template v-else-if="formItem.type === 'textarea'">
              <el-input type="textarea" :rows="formItem.rows ? formItem.rows : '8'" resize="none"
                :maxlength="formItem.maxlength ? formItem.maxlength : '1000'" show-word-limit
                v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder"></el-input>
            </template>
            <!-- 日期选择器 -->
            <template v-else-if="formItem.type === 'datepicker'">
              <el-date-picker v-model="formData[formItem.id]" :disabled="formItem.isDisabled"
                :placeholder="formItem.placeholder" type="date"
                :format="formItem.format ? formItem.format : 'yyyy-MM-dd'"></el-date-picker>
            </template>
            <!-- 单选框 -->
            <template v-else-if="formItem.type === 'radio'">
              <el-radio-group v-model="formData[formItem.id]" :disabled="formItem.isDisabled">
                <el-radio :label="option.label" v-for="(option, index) in formItem.options" :key="index">{{ option.label
                }}</el-radio>
              </el-radio-group>
            </template>
            <!-- 多选框 -->
            <template v-else-if="formItem.type === 'checkbox'">
              <el-checkbox-group v-model="formData[formItem.id]" :disabled="formItem.isDisabled">
                <el-checkbox :label="option.label" v-for="(option, index) in formItem.options" :key="index">{{
                  option.label }}</el-checkbox>
              </el-checkbox-group>
            </template>
            <!-- 开关 -->
            <template v-else-if="formItem.type === 'switch'">
              <el-switch v-model="formData[formItem.id]" :disabled="formItem.isDisabled"></el-switch>
            </template>
            <!-- 滑块 -->
            <template v-else-if="formItem.type === 'slider'">
              <el-slider v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :min="formItem.min"
                :max="formItem.max" :step="formItem.step"></el-slider>
            </template>
            <!-- 评分 -->
            <template v-else-if="formItem.type === 'rate'">
              <el-rate v-model="formData[formItem.id]" :disabled="formItem.isDisabled" :max="formItem.max"></el-rate>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表单操作按钮 -->
      <div v-if="btnConfig.showBtn" class="btnBox">
        <el-form-item>
          <el-button v-for="btn in btnConfig.buttons" :key="btn.label" :type="btn.type" @click="clickBtn(btn.fun)">{{
            btn.label }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    /**
      * 表单配置组成的数组
      * @type {Array.<FormItem>}
      * @property {string} id - 表单元素的唯一标识符
      * @property {string} label - 表单元素的标签
      * @property {string} type - 表单元素的类型，支持 'input', 'autocomplete', 'select', 'cascader', 'textarea', 'datepicker', 'upload', 'radio', 'checkbox', 'switch', 'slider', 'rate' 等
      * @property {boolean} isDisabled - 表单元素是否禁用
      * @property {string} placeholder - 表单元素的占位符
      * @property {Array} options - 仅适用于 'select', 'radio', 'checkbox' 类型，表示选项列表
      * @property {string} rows - 仅适用于 'textarea' 类型，表示文本域的行数
      * @property {number} maxlength - 仅适用于 'textarea' 类型，表示文本域的最大长度
      * @property {string} format - 仅适用于 'datepicker' 类型，表示日期的格式
      * @property {string} min - 仅适用于 'slider' 类型，表示滑块的最小值
      * @property {string} max - 仅适用于 'slider' 类型，表示滑块的最大值
      * @property {string} step - 仅适用于 'slider' 类型，表示滑块的步长
      * @property {string} fun - 按钮点击时触发的函数，例如 'submit', 'reset', 'other'
      * @property {Array} rules - 表单校验规则，参考 Element UI Form 组件的校验规则
      * @property {boolean} isWaklkAlone - 是否独占一行，仅适用于 'textarea' 类型
     */
    formList: {
      type: Array,
      required: true
    },
    formData: {
      type: Object,
      required: true,
      default: {}
    },
    colNum: {
      type: [Number, String],
      required: false,
      default: 2,
    },
    btnConfig: {
      type: Object,
      required: false,
      default: {}
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
    /**
     * 初始化表单分组函数
     * @param {Array} formList - 包含表单项的数组
     * @param {number} groupSize - 每个组的大小
     * @returns {Array} - 分组后的表单数组
     */
    initForm(formList, groupSize) {
      // 检查输入是否合法
      if (!Array.isArray(formList) || formList.length === 0 || groupSize <= 0) {
        return [];
      }
      const groupedArr = [];
      let currentGroup = [];

      // 遍历表单列表
      for (let i = 0; i < formList.length; i++) {
        const currentItem = formList[i];
        // 检查是否需要单独成组
        if (currentItem.isWalkAlone || currentItem.type === 'textarea') {
          if (currentGroup.length > 0) {
            groupedArr.push(currentGroup);
            currentGroup = [];
          }
          // 单独的表单项成为一个组
          groupedArr.push([currentItem]);
        } else {
          // 将表单项添加到当前组
          currentGroup.push(currentItem);
        }
        // 检查是否达到指定组的大小
        if (currentGroup.length === groupSize) {
          groupedArr.push(currentGroup);
          currentGroup = [];
        }
      }

      // 如果当前组不为空，则将其添加到分组后的数组中
      if (currentGroup.length > 0) {
        groupedArr.push(currentGroup);
      }
      this.form = groupedArr;
    },

    /**
     * 异步查询远程搜索列表的函数
     * @param {string} queryString - 搜索的字符串
     * @param {function} callback - 回调函数，用于接收搜索结果
     */
    querySearchAsync(queryString, callback) {
      // 使用 $emit 发送 'querySearchAsync' 事件，并传递查询字符串和回调函数
      this.$emit('querySearchAsync', queryString, (res) => {
        const restaurants = res;
        // 调用回调函数，将搜索结果传递给调用者
        callback(restaurants);
      });
    },

    /**
     * 点击按钮触发相应操作的方法
     * @param {string} fun - 操作类型，可选值为 'submit'、'reset' 或其他
     */
    clickBtn(fun) {
      switch (fun) {
        case 'submit':
          // 如果操作类型为 'submit'，调用提交表单的方法
          this.submitForm();
          break;
        case 'reset':
          // 如果操作类型为 'reset'，调用重置表单的方法
          this.resetForm();
          break;
        default:
          // 对于其他操作类型，调用执行其他操作的方法
          this.other();
          break;
      }
    },

    //提交表单的方法
    submitForm() {
      // 使用 $refs 获取表单组件，并调用 validate 方法
      this.$refs.form.validate((valid) => {
        // 检查表单验证是否通过
        if (valid) {
          // 如果存在 'on-submit' 事件监听器，则触发 'on-submit' 事件并传递表单数据
          if (this.$listeners['on-submit']) {
            this.$emit('on-submit', this.formData);
          } else {
            console.log('请传入on-submit');
            return;
          }
        } else {
          // 如果表单验证未通过，打印错误信息并返回 false
          console.log('error submit');
          return false;
        }
      });
    },

    //重置表单的方法
    resetForm() {
      // 使用 $refs 获取表单组件，并调用 resetFields 方法重置表单
      this.$refs.form.resetFields();

      // 如果存在 'on-reset' 事件监听器，则触发 'on-reset' 事件
      if (this.$listeners['on-reset']) {
        this.$emit('on-reset');
      } else {
        console.log('请传入on-reset');
        return;
      }
    },

    //执行其他操作的方法
    other() {
      // 如果存在 'on-other' 事件监听器，则触发 'on-other' 事件并传递表单数据
      if (this.$listeners['on-other']) {
        this.$emit('on-other', this.formData);
      } else {
        console.log('请传入on-other');
        return;
      }
    },
  },
  mounted() {
    this.initForm(this.formList, this.colNum);
  },
};
</script>

<style></style>
