# elememt-package

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## Drawer组件

在main.js中通过全局引入的方式引入抽屉组件

```vue
//全局引用抽屉组件
import Drawer from '@/components/common/Drawer/index';
Vue.prototype.$drawer = Drawer
```

调用示例

```js
//打开单个抽屉
this.$drawer.open(
  {
    direction: 'ltr',//抽屉弹出的位置（'rtl' 或 'ltr'） rtl:屏幕右侧弹出 ltr：屏幕左侧弹出 默认为rtl
    title:'标题',//抽屉标题，可选
    component: () => require('./common/123.vue'),//传入的组件
    params: {}//传入的参数
  }
)
//打开两个抽屉
const options1 = {
direction: 'rtl',
component: () => require('../123.vue'),
params: {}
};
const options2 = {
direction: 'ltr',
component: () => require('../123.vue'),
params: {}
};
Drawer.doubleOpen([options1, options2]);
/**
*  关闭单个抽屉
*  @param {String} id - 抽屉的id，可通过this.$parent.id获取当前抽屉的id
*  @param {Function} userOnClose - 抽屉关闭的回调函数
*/
this.$drawer.close(id, userOnClose)

//关闭页面打开的所有抽屉
this.$drawer.closeAll()
```

# Form组件

### 1. 导入组件

首先，确保已经导入 `Element UI` 组件库，然后导入自定义的表单组件。

```vue
<template>
  <!-- 在你的组件中使用表单组件 -->
  <Form :form-list="yourFormList" :form-data="yourFormData" :col-num="yourColumnNumber" :btn-config="yourButtonConfig" />
</template>

<script>
// 导入自定义表单组件
import Form from "@/path/to/Form.vue";

export default {
  components: {
    Form,
  },
  data() {
    return {
      // 定义表单数据
      yourFormData: {
        // 初始化表单数据...
      },
      // 定义表单配置
      yourFormList: [
        // 配置项参考组件中的 props 描述
        // 示例配置...
      ],
      // 定义列数
      yourColumnNumber: 2,
      // 定义按钮配置
      yourButtonConfig: {
        // 配置按钮是否显示及按钮列表
        // 示例配置...
      },
    };
  },
};
</script>

```
### 2. 表单配置项

在 `yourFormList` 中定义表单配置项，每个配置项对应一个表单元素。根据需要选择不同的表单元素类型，例如输入框、下拉选择框等。

```javascript
// 示例表单配置项
yourFormList: [
  {
    id: "username",
    label: "用户名",
    type: "input",
    isDisabled: false,
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  },
  {
    id: "email",
    label: "邮箱",
    type: "input",
    isDisabled: false,
    placeholder: "请输入邮箱",
    rules: [
      { required: true, message: "邮箱不能为空", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱格式", trigger: ["blur", "change"] },
    ],
  },
  // 其他表单配置项...
],

```
### 3. 列数配置

通过 `yourColumnNumber` 定义表单元素每行显示的列数，根据实际需要进行配置。

```javascript
// 示例列数配置
yourColumnNumber: 2,
```

### 4. 按钮配置

通过 `yourButtonConfig` 定义表单操作按钮的配置，包括按钮是否显示及按钮列表。

```javascript
// 示例按钮配置
yourButtonConfig: {
  showBtn: true, // 是否显示按钮
  buttons: [
    { label: "提交", type: "primary", fun: "submit" }, // 提交按钮
    { label: "重置", type: "default", fun: "reset" }, // 重置按钮
    // 其他按钮配置...
  ],
},
```

### 5. 事件监听

如果需要监听表单提交、重置或其他操作，可以通过以下方式进行配置：

```javascript
<template>
  <!-- 在你的组件中使用表单组件，并监听相应事件 -->
  <Form
    :form-list="yourFormList"
    :form-data="yourFormData"
    :col-num="yourColumnNumber"
    :btn-config="yourButtonConfig"
    @on-submit="handleFormSubmit"
    @on-reset="handleFormReset"
    @on-other="handleOtherAction"
  />
</template>

<script>
export default {
  methods: {
    // 处理表单提交事件
    handleFormSubmit(formData) {
      // 处理表单提交逻辑，formData 为表单数据
      console.log("表单提交", formData);
    },

    // 处理表单重置事件
    handleFormReset() {
      // 处理表单重置逻辑
      console.log("表单重置");
    },

    // 处理其他操作事件
    handleOtherAction(formData) {
      // 处理其他操作逻辑，formData 为表单数据
      console.log("其他操作", formData);
    },
  },
};
</script>
```

# Table组件

组件可以配置是否开启插入/删除当前行的功能，`:insertOrDelete="true"`启用

## 1.Table配置项

| 参数           | 说明                   | 类型    | 可选值 | 默认值 |
| :------------- | :--------------------- | :------ | :----- | :----- |
| headers        | 表头列表               | array   | —      | —      |
| tableData      | 表格数据               | array   | —      | —      |
| insertOrDelete | 启用表格插入、删除功能 | boolean | —      | false  |

## 2.Tbale事件

| 事件名          | 说明               | 参数                 |
| :-------------- | :----------------- | :------------------- |
| row-mouse-enter | 当鼠标移入行时触发 | row, rowIndex, event |
| row-mouse-leave | 当鼠标移出行时触发 | row, rowIndex, event |

## 3.导入组件

```vue
<template>
  <MyTable
    :headers="headers"
    :tableData="tableData"
    :insertOrDelete="true"
  ></MyTable>
</template>

<script>
import MyTable from './common/Table/index.vue'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      headers: [
        {
          id: 1,
          name: '列1'
        },
        {
          id: 2,
          name: '列2'
        }
      ],
      tableData: [
        {
          '1': 123123,
          '2': 123123
        },
        {
          '1': 123123,
          '2': 123123
        }
      ],
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
```

