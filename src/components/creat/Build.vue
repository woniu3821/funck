<template>
  <div>
    <Index></Index>
    <el-form :model="buildForm" :rules="rules" ref="buildForm" label-width="100px" class="demo-buildForm">
      <el-row :gutter="20">
        <el-col :lg="10" :xl="10">
          <el-form-item label="任务名称:" prop="title">
            <el-input v-model="buildForm.title"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-form-item label="截止日期">
              <el-col :md="16" :lg="14" :xl="16">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="buildForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="10" :xl="8">
                <el-form-item prop="date2">
                  <el-time-select style="width:100%" v-model="buildForm.date2" :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '17:30'
            }" placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item label="执行人" required>
            <el-input placeholder="试试搜索网络部" v-model="filterText">
            </el-input>
          </el-form-item>
          <el-form-item prop="peoples">
            <el-tree class="filter-tree" :data="options" :props="defaultProps" node-key="id" show-checkbox :indent=20 :filter-node-method="filterNode" @check-change="getCheckedKeys" ref="tree">
            </el-tree>
          </el-form-item>
        </el-col>
        <el-col :lg="14" :xl="14">
          <el-form-item label="任务详情" prop="desc">
            <el-input type="textarea" rows="15" v-model="buildForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" :loading="loading" @click="submitForm('buildForm')">立即创建</el-button>
            <el-button @click="resetForm('buildForm')">取消</el-button>
          </el-form-item>
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
.line {
  text-align: center;
}
</style>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      loading: false,
      buildForm: {
        title: "",
        date1: "",
        date2: "",
        peoples: [],
        desc: "",
        id: ""
      },
      change: false,
      oldpeople: [],
      newpeople: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      options: [],
      rules: {
        title: [
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
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        peoples: [
          {
            type: "array",
            required: true,
            message: "请选择执行人",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写任务详情", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.options = this.getOutfit;
    let fromData = this.$route.params.dataObj; //路由传参传回修改任务的数据
    if (fromData) {
      this.change = true;
      fromData.date1 = new Date(fromData.date1); //后台传回的参数要处理一下
      this.buildForm = fromData;
      this.setCheckedKeys(fromData.peoples);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    "buildForm.peoples"(val, old) {
      let _this = this;
      if (this.oldpeople == "") this.buildForm.peoples = this.oldpeople = val;
      if (this.change) {
        this.newpeople = val.filter(function(item1) {
          return _this.oldpeople.every(function(item2) {
            return item2 !== item1;
          });
        });
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let data = {
            title: this.buildForm.title,
            times: this.linkData,
            peoples: this.buildForm.peoples,
            detail: this.buildForm.desc,
            id: this.buildForm.id
          };

          this.buildSubmit(data)
            .then(res => {
              this.loading = false;
              switch (res.type) {
                case "success":
                  let oldpeople = this.oldpeople.length
                    ? this.oldpeople
                    : data.peoples;
                  this.$socket.emit("build_mission", {
                    old: oldpeople,
                    new: this.newpeople,
                    change: this.change
                  });

                  this.resetForm(formName);
                  this.change = false;
                  this.oldpeople = [];
                  this.newpeople = [];
                  break;
                default:
                  break;
              }
            })
            .catch(err => {
              //TODO 失败尝试重新提交数据
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCheckedKeys() {
      this.buildForm.peoples = this.$refs.tree.getCheckedKeys(true);
    },
    setCheckedKeys(peoples) {
      this.$refs.tree.setCheckedKeys(peoples);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    resetForm(formName) {
      this.resetChecked(); //强制将选择的用户重置
      this.$refs[formName].resetFields();
    },
    ...mapActions({
      buildSubmit: "buildSubmit"
    })
  },
  computed: {
    linkData() {
      let date = this.buildForm.date1;
      let time = this.buildForm.date2.split(":");
      if (date && time) {
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let day = new Date(date).getDate();
        let hours = time[0];
        let minutes = time[1];
        let seconds = 0;
        let times = new Date(year, month, day, hours, minutes, seconds);
        return times;
      }
    },
    ...mapGetters(["getOutfit"])
  }
};
</script>