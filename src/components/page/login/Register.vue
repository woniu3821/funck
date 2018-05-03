<template>
  <el-dialog title="注册" :visible.sync="dialogFormVisible" :before-close="closeDialog" width="500px" center>
    <el-form :model="form" status-icon ref="form" :label-position="label_position" label-width="100px" :rules="rules">
      <el-form-item label="组织&姓名" required>
        <el-col :span="15">
          <el-form-item prop="groups">
            <el-cascader class="cascader_width" style="width:100%" v-model="form.groups" :options="groups" placeholder="试试搜索:网络部" @change="handleItemChange" filterable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="8">
          <el-form-item prop="name">
            <el-input style="width:100%" v-model="form.name" placeholder="真实姓名" auto-complete="true"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="设置密码" prop="pass">
        <el-input type="password" v-model="form.pass" placeholder="支持数字、字母、下划线的5-15长度" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" required>
        <el-form-item prop="checked">
          <el-col :span="6">
            <el-input type="text" v-model="form.checked"></el-input>
          </el-col>
          <el-col :offset="1" :span="8">
            <div @click="changeCaptcha" v-html="Captcha"></div>
          </el-col>
          <el-col :offset="1" :span="8">
            <a style="color:#333" @click="changeCaptcha" href="javascript:;">看不清楚？换一张</a>
          </el-col>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="success" @click="submitForm('form')" :loading="loading">注 册</el-button>
      <router-link to="/login">
        <el-button size="medium" type="primary" plain>
          登 陆
        </el-button>
      </router-link>
    </div>
  </el-dialog>
</template>
<style>
.line {
  text-align: center;
}
.el-dialog--center .el-dialog__body {
  padding-bottom: 0 !important;
}
.dialog-footer button[type="button"] {
  margin: 0 15px;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else {
        this.getCaptcha(value).then(res => {
          if (res.data === "pass") {
            callback();
          } else {
            this.Captcha = res.data;
            callback(new Error("验证错误"));
          }
        });
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        this.getName(value).then(res => {
          if (res.data === "pass") {
            callback(new Error("姓名已存在"));
          } else {
            callback();
          }
        });
      }
    };
    return {
      dialogFormVisible: true,
      loading: false,
      label_position: "left",
      form: {
        name: "",
        pass: "",
        checkPass: "",
        checked: "",
        groups: []
      },
      Captcha: "",
      groups: [],
      rules: {
        name: [{ required: true, validator: validatePass4, trigger: "blur" }],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_]{5,15}$/,
            message: "密码只能是数字、字母、下划线的5-15位组合",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_]{5,15}$/,
            message: "密码只能是数字、字母、下划线的5-15位组合",
            trigger: "blur"
          }
        ],
        groups: [
          {
            type: "array",
            required: true,
            message: "请选择你所属的组织",
            trigger: "change"
          }
        ],
        checked: [{ required: true, validator: validatePass3, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getCaptcha()
      .then(res => {
        this.Captcha = res.data;
      })
      .catch(err => {});
    this.getGroup()
      .then(res => {
        this.groups = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    closeDialog(done) {
      this.$confirm("取消注册去登陆？")
        .then(_ => {
          done();
          // location.reload();
          this.$router.replace("/login");
        })
        .catch(_ => {});
    },
    changeCaptcha() {
      this.getCaptcha()
        .then(res => {
          this.Captcha = res.data;
        })
        .catch(err => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.form.name,
            password: this.form.pass,
            groups: this.form.groups
          };
          this.loading = true;
          this.addAcount(data)
            .then(res => {
              if (res.success) {
                this.loading = false;
                this.$message({
                  message: res.message,
                  type: res.type,
                  center: true
                });
                setTimeout(() => {
                  this.$router.replace({
                    //注册成功跳转到登录页
                    name: "login",
                    path: "/login",
                    params: {
                      name: this.form.name
                    }
                  });
                  this.$refs[formName].resetFields();
                }, 2000);
              }
            })
            .catch(err => {
              console.log(err);
            });
          return false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleItemChange(val) {
      this.groups.length != 0 && (this.form.groups = val);
    },
    ...mapActions({
      register: "addAcount",
      getCaptcha: "user/getCaptcha",
      addAcount: "user/addAcount",
      getName: "user/getName",
      getGroup: "user/getGroup"
    })
  }
};
</script>
