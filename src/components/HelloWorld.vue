<template>
  <div class="hello">
    <Form :formList="formList" :formData="formData" :btnConfig="btnConfig" @on-submit="handleSubmit"
      @on-reset="handleReset"></Form>
  </div>
</template>

<script>
import Form from './common/Form/index.vue'
export default {
  name: 'HelloWorld',
  data() {
    return {
      formList: [
        {
          id: "name",
          label: "姓名",
          type: "input",
          placeholder: "请输入姓名",
          rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        },
        {
          id: "email",
          label: "邮箱",
          type: "input",
          placeholder: "请输入邮箱",
          rules: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { type: "email", message: "邮箱格式不正确", trigger: ["blur", "change"] },
          ],
        },
        {
          id: "gender",
          label: "性别",
          type: "radio",
          options: [
            { label: "男", value: "male" },
            { label: "女", value: "female" },
          ],
        },
        {
          id: "interests",
          label: "兴趣爱好",
          type: "checkbox",
          options: [
            { label: "篮球", value: "basketball" },
            { label: "足球", value: "football" },
            { label: "音乐", value: "music" },
          ],
        },
        {
          id: "birthDate",
          label: "出生日期",
          type: "datepicker",
        },
        {
          id: "avatar",
          label: "头像",
          type: "upload",
        },
      ],
      formData: {
        name: "",
        email: "",
        gender: "",
        interests: [],
        birthDate: null,
        avatar: null,
      },
      btnConfig: {
        showBtn: true,
        buttons: [
          { label: "提交", type: "primary", fun: "submit" },
          { label: "重置", type: "default", fun: "reset" },
        ],
      },
    }
  },
  components: {
    Form
  },
  methods: {
    handleSubmit(data) {
      // 处理表单提交逻辑
      console.log("Form submitted with data:", data);
    },
    handleReset() {
      // 处理表单重置逻辑
      console.log("Form reset");
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
