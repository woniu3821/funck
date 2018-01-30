<template>
  <el-dialog :title="showTitle" :visible.sync="dialogFormVisible" :before-close="closeDialog"  width="500px" status-icon center>
  <el-form :model="loginForm" status-icon ref="loginForm" :rules="rules">
    <el-form-item label="账号" prop="name">
      <el-input placeholder="请输入账号" v-model="loginForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="密码" prop="password">
    <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="8"><el-checkbox v-model="loginForm.checked">一周之内免登陆</el-checkbox></el-col>
      <el-col :span="3"><router-link to="/register">注 册</router-link></el-col>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitForm('loginForm')">登 录</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button> 
  </div>
</el-dialog>
</template>
<style scoped>
.el-col-3 a {
  color: yellowgreen;
}
</style>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: true,
      loginForm: {
        name: "",
        password: "",
        checked: false
      },
      sys_error: "",
      validate: false,
      rules: {
        name: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    showTitle(){
      let user = this.$route.params;
      if(user.name){
        return `欢迎 ${user.name} , 请登录`
      }
      return '登录'
    }
  },
  methods: {
    closeDialog(done) {
      this.$confirm("确认取消登录？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    ...mapActions({
      loginByEmail: "user/loginByEmail",
      getOutfit: "getOutfit",//登录成功获取用户列表数据
      getCreated:'getCreated',//获取已建任务列表
    }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.loginForm.name,
            password: this.loginForm.password
            // checked: this.loginForm.checked
          };
          this.loginByEmail(data).then(res => {
            if (res.data.login) {
              this.getOutfit()
              this.getCreated()
              this.$notify({
                title: "成功",
                message:res.data.message,
                type: "success"
              });
              this.$router.push("/work");
              
            } else {
              this.$notify({
                title: "警告",
                message:res.data.message,
                type: "warning"
              });
              // this.validate = res.data.validate;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
