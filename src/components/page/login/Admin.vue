<template>
<div>
<el-row type="flex" justify="center">
    <el-col :md="12" :lg="10" :xl="8">
        <el-form label-position="left" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" placeholder="工作邮箱设置" v-model="ruleForm2.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldpass">
                <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" prop="pass">
                <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" placeholder="请再次输入新密码" v-model="ruleForm2.checkPass"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改头像">
                <el-upload
                action="/upload"
                list-type="picture-card"
                :limit="1"
                :data="{uid:useruid}"
                :on-exceed="overFile"
                :on-preview="handlePictureCardPreview"
                :on-error="handleError"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button  size="medium" @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</el-row>
</div>
</template>
<script>
import { mapActions,mapState } from "vuex"
  export default {
    data() {
    var validatePass = (rule, value, callback) => {
        if(value!==""){
            if (this.ruleForm2.checkPass == "") {
                this.$refs.ruleForm2.validateField("checkPass");
                this.$refs.ruleForm2.validateField("oldpass");
            }
             callback();
        }else{
            if(this.ruleForm2.oldpass!==""){
            callback(new Error("请输入新的密码")); 
            }
        callback();
        }
    };
    var validatePass1 = (rule, value, callback) => {
        if (value !== this.ruleForm2.pass) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
       callback();
    };
    var validatePass2 = (rule, value, callback) => {
    if (this.ruleForm2.pass!==""||this.ruleForm2.checkPass!=="") {
        if(value==""){
            callback(new Error("请先输入旧密码验证"));
        }else{
            callback();
        }
    }else{
       this.$refs.ruleForm2.validateField("pass");
    } 
    callback();
    };
      return {
        ruleForm2: {
          pass: '',
          email:'',
          oldpass:"",
          checkPass:""
        },

        dialogImageUrl: '',
        dialogVisible: false,
        uidData:{},
        rules2: {
          pass: [
            {  validator: validatePass, trigger: "blur" },
            {
            pattern: /^[a-zA-Z0-9_]{5,15}$/,
            message: "密码只能是数字、字母、下划线的5-15位组合",
            trigger: "blur"
            }
          ],
          checkPass: [
            {  validator: validatePass1, trigger: "blur" }
          ],
          oldpass: [
            {  validator: validatePass2, trigger: "blur" }
          ],
          email:[
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               if(this.ruleForm2.email==""&&this.ruleForm2.pass==""){
                    this.$message({
                    message: "无效提交",
                    type:"warning"
                    });
                    return false;
               }
           this.setMyInfo(this.ruleForm2).then((res)=>{
               if(res.success){
                   this.resetForm(formName)
                   this.$message({
                    message: res.message,
                    type:res.type
                    });
               }else{
                    this.$message({
                    message: res.message,
                    type:res.type
                    });
                   this.ruleForm2.pass=""
                   this.ruleForm2.oldpass=""
                   this.ruleForm2.checkPass=""
               }
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleError(){
        this.$message({
          message: '图片上传失败',
          type: 'error'
        }); 
      },
      overFile(){
          this.$message({
          message: '只允许上传一张图片，请删除第一张重新上传',
          type: 'warning'
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSuccess(file){
        this.$message({
          message: '图片已上传成功',
          type: 'success'
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === ('image/jpeg'||'image/png')
        const isLt500 = file.size / 1024 <= 500;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt500) {
          this.$message.error('上传头像图片大小不能超过 500KB!');
        }
        return isJPG && isLt500;
      },
      ...mapActions({
          setMyInfo:"user/setMyInfo"
      })
    },
      computed: {
    ...mapState({
      useruid: state => state.user.uid
    })
  }
  }
</script>