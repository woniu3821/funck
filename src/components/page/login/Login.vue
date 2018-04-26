<template>
  <el-dialog :title="showTitle" :visible.sync="dialogFormVisible" :before-close="closeDialog" width="450px" status-icon center>
    <el-form :model="loginForm" status-icon ref="loginForm" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号" v-model="loginForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入密码" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-row type="flex" justify="end">
        <router-link class="findpass" v-if="mount>2" to="/findpass">
          密码丢失？
          <span>点击找回密码</span>
        </router-link>
        <el-checkbox v-else v-model="checked">7天免登陆</el-checkbox>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="submitForm('loginForm')" :loading="loading">登 录</el-button>
      <router-link to="/register">
        <el-button type="success" plain size="medium">注 册</el-button>
      </router-link>
    </div>
  </el-dialog>
</template>
<style scoped>
.el-col-3 a {
  color: yellowgreen;
}
.dialog-footer button[type="button"] {
  margin: 0 15px;
}
.findpass {
  color: red;
  font-size: 14px;
  text-decoration: none;
}
.findpass span {
  cursor: pointer;
  text-decoration: underline;
  color: #333;
}
</style>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      mount: 0,
      checked: false,
      dialogFormVisible: true,
      loading: false,
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入登陆账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    showTitle() {
      let user = this.$route.params;
      if (user.name) {
        return `欢迎 ${user.name} , 请登录`;
      }
      return "登录";
    }
  },
  methods: {
    closeDialog(done) {
      this.$confirm("是否重载当前窗口？")
        .then(_ => {
          done();
          location.reload();
        })
        .catch(_ => {});
    },
    ...mapActions({
      loginSys: "user/loginSys"
    }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.loginForm.name,
            password: this.loginForm.password,
            checked: this.checked
          };
          this.loading = true;
          this.loginSys(data).then(res => {
            this.loading = false;
            if (res.data.login) {
              this.mount = 0;
              this.$notify({
                title: "成功",
                message: res.data.message,
                type: "success"
              });
              this.$router.replace("/home");
            } else {
              this.$refs[formName].resetFields();
              this.mount++;
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
