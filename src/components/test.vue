<template>
  <div style="width: 30%;margin: 0 auto;">
    <!-- <ProgressLoading/> -->
    <el-button type="primary" @click="onClick">主要按钮</el-button>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      ruleForm: {
        region: '',
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      percentage: 0,
      text: ''
    };
  },
  watch: {
  },
  methods: {
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
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
      // setTimeout(() => {
      //   ploading.close()
      // }, 5000)
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.dialogVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields();
    }
  }
}
</script>
