<template>
<div>
  <Index></Index>
  <el-table class="waiting_table"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="任务ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="任务名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="province"
      label="发起人"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="执行人"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="任务简介"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="发起时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="截止时间"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
          <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="success"
          size="small">
          完成
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<style scoped>
.waiting_table {
  text-align: left;
}
</style>
<script>
import Index from "./index";
export default {
  components: {
    Index
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      //此处提交请求，成功后移除
      rows.splice(index, 1);
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>