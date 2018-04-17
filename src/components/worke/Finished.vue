<template>
<div>
  <Index></Index>
 <el-row>
  <div v-if="hasData" id="myChartpie" style="height:500px;width:100%;"></div>
  <div v-else class="info">暂无统计信息</div>
 </el-row>
</div>
</template>
<style scoped>
.info{
  text-align:center;
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
      hasData:true
    }
  },
  mounted(){
    this.getMyCensus().then(res=>{
      if(!res.success){
        let ndata=[]
        let odata= ['已接收任务','未接收任务','已完成任务','超时任务']
        for(let index in res.data[0]){
          ndata.push({value:res.data[0][index],name:odata[index]})
        }
        this.pieOption(odata,ndata)
      }else{
        this.hasData=false;
      }

    })
  },
  methods:{
    pieOption(odata,ndata){
      let myChartpie = echarts.init(document.getElementById("myChartpie"));
      myChartpie.setOption({
       title : {
        text: '我的任务统计',
        x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: odata
        },
        series : [
            {
                name: '任务详情',
                type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
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
    ...mapActions(['getMyCensus'])
  }
}
</script>