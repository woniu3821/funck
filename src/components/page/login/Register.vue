<template>
  <el-dialog title="注册" :visible.sync="dialogFormVisible" :before-close="closeDialog" width="500px"  center>
  <el-form :model="form" status-icon ref="form" :rules="rules">
    <el-form-item label="组织&姓名" required>
      <el-row>
        <el-col>
            <el-col :span="14">
              <el-form-item prop="groups">
                <el-cascader
                v-model="form.groups"
                style="width:100%"
                :options="groups"
                placeholder="试试搜索:网络部"
                @change="handleItemChange"
                filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="8">
              <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="请输入真实姓名" auto-complete="true"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" placeholder="支持数字、字母、下划线的5-15长度" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" required>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="checked">
              <el-input type="text" v-model="form.checked"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="5">
            <div @click="changeCaptcha" v-html="Captcha"></div>
          </el-col>
          <el-col :span="6"><a style="color:#333" @click="changeCaptcha" href="javascript:;">看不清楚？换一张</a></el-col>
        </el-row>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="success" @click="submitForm('form')" :loading="loading">注 册</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
</el-dialog>
</template>
<style scoped>
.line {
  text-align: center;
}
.el-form-item {
  /* margin-bottom: 0; */
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
        this.groups=res;
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  },
  methods: {
    closeDialog(done) {
      this.$confirm("确认取消注册？")
        .then(_ => {
          done();
          location.reload();
          console.log(this.from);
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
            groups: this.form.groups[this.form.groups.length-1]
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
                  // this.$refs[formName].resetFields();
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
