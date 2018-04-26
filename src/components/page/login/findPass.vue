<template>
  <div class="box">
    <el-row class="title">
      <span class="title_cell">
        BLOGSCN-找回密码
      </span>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :xs="18" :sm="12" :md="9" :lg="6" :xl="4">
        <el-form :model="passForm" ref="passForm" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="passForm.name" placeholder="请输入注册的姓名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入你的工作邮箱" v-model="passForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item prop="checked" label="验证码">
                <el-input type="text" v-model="passForm.checked"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-row type="flex" justify="center" align="bottom" style="height:80px;overflow:hidden;">
                <div class="captcha" v-html="Captcha"></div>
                <span v-loading="captchaLoading">
                  <a style="color:#333" @click="changeCaptcha" href="javascript:;">看不清楚？换一张</a>
                </span>
              </el-row>
            </el-col>
          </el-form-item>
          <el-form-item class="footersub">
            <el-button size="medium" type="primary" :loading="subLoading" @click="submitForm('passForm')">提交</el-button>
            <el-button size="medium" @click="resetForm('passForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.box {
  height: 100%;
}
.title {
  height: 25%;
  text-align: center;
  font-size: 20px;
  display: table;
  text-align: center;
  width: 100%;
}
.title_cell {
  display: table-cell;
  vertical-align: middle;
}
.footersub {
  margin-top: 15px;
  padding: 15px;
  text-align: center;
  border-radius: 3px;
}
.captcha {
  margin-bottom: -15px;
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  data() {
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
    return {
      passForm: {
        name: "",
        email: "",
        checked: ""
      },
      Captcha: "",
      captchaLoading: false,
      subLoading: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          {
            required: true,
            message: "请输入你的工作邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
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
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subLoading = true;
          this.findOldPass(this.passForm).then(res => {
            this.subLoading = false;
            this.$message({
              message: res.message,
              type: res.type
            });
            if (res.success) {
              this.resetForm(formName);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCaptcha() {
      this.captchaLoading = true;
      this.$nextTick(() => {
        this.getCaptcha()
          .then(res => {
            this.captchaLoading = false;
            this.Captcha = res.data;
          })
          .catch(err => {});
      });
    },
    ...mapActions({
      findOldPass: "user/findOldPass",
      getCaptcha: "user/getCaptcha"
    })
  }
};
</script>