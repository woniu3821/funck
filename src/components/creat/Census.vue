<template>
<div>
  <Index></Index>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-row>
  <el-col :span="14">
    <el-form-item label="任务名称:" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="截止日期" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="多人任务" prop="delivery"> 
      <el-col :span="1"><el-switch v-model="ruleForm.delivery"></el-switch> </el-col>
    </el-form-item>
    <el-form-item v-if="ruleForm.delivery"
      v-for="(steps, index) in ruleForm.steps"
      :label="'步骤' + (index+1)"
      :key="steps.key"
      :prop="'steps.' + index + '.value'"
      :rules="{
        required: true, message: '步骤详情不能为空', trigger: 'blur'
      }"
    >
  <el-col :span="19"><el-input type="textarea" v-model="steps.value"></el-input></el-col>
  <el-col :offset="1" :span="4"><el-button style="width:100%" size="small" type="danger" icon="el-icon-delete" @click.prevent="removeSteps(steps)">删除</el-button></el-col>
  </el-form-item>
  <el-form-item label="执行人">
    <el-transfer class="tranform"
      v-model="value3"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['用户列表', '已选执行人']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
    </el-transfer>
    </el-form-item>
    <el-form-item label="">
    <el-col :push="15"  :span="4">
      <el-button  size="small" style="width:100%" v-if="ruleForm.delivery" type="primary" icon="el-icon-circle-plus" @click="addSteps">下一步</el-button>
    </el-col>
    </el-form-item>
    <el-form-item label="任务详情" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="上传附件">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>

  </el-col>
  <el-col :span="10">

  </el-col>
  </el-row>

  </el-form>
</div>
</template>
<style scoped>
#usually {
  text-align: left;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.tranform {
  text-align: left;
}
.upload-demo {
  text-align: left;
}
</style>
<script>
import Index from "./index"
export default {
  name: "build",
  components: {
    Index
  },
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `程序${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        steps: [
          {
            value: ""
          }
        ],
        delivery: false,
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写任务详情", trigger: "blur" }]
      },
      data: generateData(),
      value3: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeSteps(item) {
      var index = this.ruleForm.steps.indexOf(item);
      if (index !== -1) {
        this.ruleForm.steps.splice(index, 1);
      }
    },
    addSteps() {
      this.ruleForm.steps.push({
        value: "",
        key: Date.now()
      });
    },
    //文件上传
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>