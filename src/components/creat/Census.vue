<template>
<div>
  <Index></Index>
  <el-row type="flex" justify="center">
    <div class="block">
        <el-date-picker
        @change="changedata"
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
        >
        </el-date-picker>
        <el-radio-group v-model="radio" @change="changeRadio">
            <el-radio-button label="个人"></el-radio-button>
            <el-radio-button label="总览"></el-radio-button>
        </el-radio-group>
    </div>
  </el-row>
 <el-row>
  <div v-if="hasData" id="myChartpie" style="height:450px;width:100%;"></div>
  <div v-else class="info">暂无统计信息</div>
 </el-row>
</div>
</template>
<style scoped>
.info{
  text-align:center;
}
.block{
    margin-bottom:20px;
}
</style>
<script>
import Index from "./index"
import { mapActions, mapGetters } from "vuex";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/component/legend")
export default {
  name: "build",
  components: {
    Index
  },
  data() {
    return{
      hasData:true,
      value:'',
      radio: '个人'
    }
  },
  mounted(){
    this.sendData()
  },
  methods:{
    sendData(){
        let data={
            timerange:this.value,
            radio:this.radio
        }
        this.getMyCensus(data).then(res=>{
        if(!res.success){
        let ndata=[]
        let odata= ['已完成任务','待完成任务','待接收任务','超时任务']
        for(let index in res.data[0]){
          ndata.push({value:res.data[0][index],name:odata[index]})
        }
        this.pieOption(odata,ndata)
      }else{
        this.hasData=false;
      }
        })
    },
    pieOption(odata,ndata){
      let myChartpie = echarts.init(document.getElementById("myChartpie"));
      myChartpie.setOption({
       title : {
        text: '任务完成统计',
        x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: odata
        },
        series : [
            {
                name: '任务详情',
                type: 'pie',
            radius : '55%',
            center: ['50%', '45%'],
            data:ndata,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]})
    },
    changedata(){
        this.sendData()
    },
    changeRadio(){
        this.sendData()
    },
    ...mapActions(['getMyCensus'])
  }
}
</script>