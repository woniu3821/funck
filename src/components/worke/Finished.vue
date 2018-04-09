<template>
<div>
  <Index></Index>
  <el-table class="finished_table"
    :data="tableData2"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="任务ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="任务名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="发起人">
    </el-table-column>
    <el-table-column
      prop="address"
      label="完成人">
    </el-table-column>
    <el-table-column
      prop="address"
      label="完成时间">
    </el-table-column>
  </el-table>
</div>
</template>

<style scoped>
.finished_table{
  text-align: left;
}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>

<script>
  import Index from './index'
  export default {
  components: {
   Index
  },
    methods: {

    },
    data() {
      return {
        tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>