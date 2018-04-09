<template>
<div>
  <Index></Index>
  <el-table class="waiting_table"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="missionid"
      label="任务ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="任务名称"
      width="250">
    </el-table-column>
    <el-table-column
      prop="province"
      label="发起人"
      width="80">
    </el-table-column>
    <el-table-column
      prop="peoples"
      label="执行人"
      width="200">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="任务简介"
      width="500">
    </el-table-column>
    <el-table-column
      prop="timebegain"
      label="发起时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="timeend"
      label="截止时间"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">接受</el-button>
        <el-button type="success" :loading="true" size="small">查看</el-button>
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
import { mapActions, mapGetters } from "vuex";
import Index from "./index";
export default {
  components: {
    Index
  },
    data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    ...mapActions(['getWating'])
  },
  mounted(){
    this.getWating().then(res=>{
      this.tableData=res.data;
      console.log(res.data)
    })
  }
};
</script>