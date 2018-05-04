<template>
  <div>
    <Index></Index>
    <el-row :gutter="30" type="flex" justify="space-around">
      <el-col :span="6">
        <el-button type="success" class="peoples">月新增用户：{{now}}</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" class="peoples">去年同期(月)：{{old}}</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="warning" class="peoples">同比增长(月)：{{now-old}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="myCharLine"></div>
      </el-col>
    </el-row>
  </div>
</template>
</div>
<style>
.peoples {
  width: 100%;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
}
#myCharLine {
  margin-top: 20px;
  width: 100%;
  height: 60%;
  min-height: 440px;
}
</style>
<script>
import Index from "./index";
import { mapActions, mapGetters } from "vuex";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  components: {
    Index
  },
  data() {
    return {
      now: "",
      old: "",
      total: ""
    };
  },
  mounted() {
    this.getUserMap().then(res => {
      let nowArray = this.tranData(res.now);
      this.now = this.getMonthData(nowArray, "now");
      let pastArray = this.tranData(res.past);
      this.old = this.getMonthData(pastArray, "past");
      this.LineOption(nowArray, pastArray);
    });
  },
  methods: {
    tranData(data) {
      let monthdata = [];
      let total = [];
      if (Array.isArray(data) && data.length) {
        for (let { months, usertotal } of data) {
          monthdata.push(months);
          total.push(usertotal);
        }
      }
      return [monthdata, total];
    },
    getMonthData(odata, now) {
      let date = new Date();
      let Y = "";
      now == "now"
        ? (Y = date.getFullYear() + "-")
        : (Y = date.getFullYear() - 1 + "-");
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      if (odata[0].indexOf(Y + M) == -1) {
        return 0;
      } else {
        return odata[1][odata[0].indexOf(Y + M)];
      }
    },
    LineOption(nowdata, pastdata) {
      let myCharLine = echarts.init(document.getElementById("myCharLine"));
      var colors = ["#85ce61", "#66b1ff", "#675bba"];
      myCharLine.setOption({
        color: colors,
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["今年", "去年"]
        },
        grid: {
          top: 50,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "注册量 " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: pastdata[0]
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "注册量 " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: nowdata[0]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "今年",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: nowdata[1]
          },
          {
            name: "去年",
            type: "line",
            smooth: true,
            data: pastdata[1]
          }
        ]
      });
    },
    ...mapActions(["getUserMap"])
  },
  computed: {}
};
</script>