<template>
<div>
  <Index></Index>
  <el-row :gutter="30">
    <el-col :lg="9" :xl="5">
    <el-col class="title">增加组织</el-col>
      <el-form :model="form" class="demo-form-inline" label-width="80px" :rules="rules"  ref="form">
      <el-form-item label="公司" prop="company">
        <el-select
        v-model="form.company"
        multiple
        filterable
        :multiple-limit="limit"
        @change="changeCompany"
        allow-create
        default-first-option
        placeholder="请选择或添加公司">
        <el-option
          v-for="item in options"
          :key="item.cid"
          :label="item.tags"
          :value="item.cid">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="groups">
        <el-select
        v-model="form.groups"
        multiple
        filterable
        @change="changeGroups"
        :multiple-limit="limit"
        :disabled="disabled1"
        allow-create
        default-first-option
        placeholder="请选择或添加部门">
        <el-option
          v-for="item in options1"
          :key="item.cid"
          :label="item.tags"
          :value="item.cid">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="组织" prop="organize">
        <el-select
        v-model="form.organize"
        multiple
        @change="changeOrganize"
        filterable
        :multiple-limit="limit"
        :disabled="disabled2"
        allow-create
        default-first-option
        placeholder="请选择或添加组织">
        <el-option
          v-for="item in options2"
          :key="item.cid"
          :label="item.tags"
          :value="item.cid">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="小组" prop="team">
        <el-select
        v-model="form.team"
        multiple
        filterable
        :multiple-limit="limit"
        :disabled="disabled3"
        allow-create
        default-first-option
        placeholder="请选择或添加小组">
        <el-option
          v-for="item in options3"
          :key="item.cid"
          :label="item.tags"
          :value="item.cid">
        </el-option>
      </el-select>
      </el-form-item>
      <el-col class="title">
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">确认添加</el-button>
            <el-button type="info" @click="resetForm('form')">清除</el-button>
      </el-col>
      </el-form>
    </el-col>
    <el-col  :lg="15" :xl="19">
      <el-col class="title">组织结构图</el-col>
      <div id="myChart" style="min-height:420px;"></div>
    </el-col>
</el-row>
</div>
</template>
<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  margin-top:15px;
  margin-bottom: 25px;
}
.el-select{
  width: 100%;
}
</style>

<script>
import Index from "./index";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/tree");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Index
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请选择或添加公司"));
      } else {
        callback();
      }
    };
    return {
      limit: 1,
      loading: false,
      disabled1: true,
      disabled2: true,
      disabled3: true,
      form: {
        company: [],
        groups: [],
        organize: [],
        team: []
      },
      options: [],
      options1: [],
      options2: [],
      options3: [],
      value10: [],
      rules: {
        company: [
          {
            type: "array",
            required: true,
            validator: validatePass,
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.remoteMethod();
    this.getGroupTree().then(res => {
      this.drawLine(res);
    });
  },
  methods: {
    changeCompany(value) {
      this.disabled1 = true;
      if (this.form.company.length == 1) {
        this.setGroup(value)
          .then(res => {
            this.options1 = res;
            this.disabled1 = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeGroups(value) {
      this.disabled2 = true;
      if (this.form.groups.length == 1) {
        this.setGroup(value)
          .then(res => {
            this.options2 = res;
            this.disabled2 = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeOrganize(value) {
      this.disabled3 = true;
      if (this.form.organize.length == 1) {
        this.setGroup(value)
          .then(res => {
            this.options3 = res;
            this.disabled3 = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    remoteMethod() {
      this.setGroup("")
        .then(res => {
          this.options = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let data = {
            company: this.form.company[0],
            groups: this.form.groups[0],
            organize: this.form.organize[0],
            team: this.form.team[0],
            end: true
          };
          this.setGroup(data)
            .then(res => {
              this.loading = false;
              res.type == "success" && this.resetForm("form");
              this.getGroupTree().then(res => {
                this.drawLine(res);
              });
              this.$message({
                message: res.message,
                type: res.type
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.disabled1 = this.disabled2 = this.disabled3 = true;
    },
    ...mapActions({
      setGroup: "user/setGroup",
      getGroupTree: "user/getGroupTree"
    }),
    drawLine(res) {
      let data = {
        name: "新生集团",
        children: res
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.hideLoading();
      echarts.util.each(data.children, function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
      });
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            data: [data],
            top: "1%",
            symbolSize: 10,
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 12
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });
    }
  }
};
</script>