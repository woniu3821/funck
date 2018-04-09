<template>
<div>
  <Index></Index>
  <el-table class="waiting_table"
    :data="tableData"
    border
    tooltip-effect="light"
    >
    <el-table-column
      fixed
      prop="missionid"
      label="任务ID"
      width="80"
     >
    </el-table-column>
    <el-table-column
      prop="title"
      label="任务名称"
      min-width="220"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="发起人"
      width="80"
      :show-overflow-tooltip="true"
     >
    </el-table-column>
    <el-table-column
      prop="peoples"
      label="执行人"
      min-width="120"
      >
    </el-table-column>
    <el-table-column
      prop="detail"
      label="任务简介"
      min-width="500"
      :show-overflow-tooltip="true"
     >
    </el-table-column>
    <el-table-column
      prop="timebegain"
      label="发起时间"
      width="140"
      :formatter="begainFormat"
      >
    </el-table-column>
    <el-table-column
      prop="timeend"
      label="截止时间"
      width="140"
      :formatter="endFormat"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">接受</el-button>
        <el-button type="success" :loading="true" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<style>
.waiting_table {
  text-align: left;
}
.el-tooltip__popper.is-light {
  left: 50% !important;
  max-width: 500px !important;
  line-height: 20px;
  font-size: 14px;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
import { bus } from "../../util/uniTool";
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
      // console.log(row);
    },
    endFormat(row, column) {
      return this.timestampToTime(row.timeend);
    },
    begainFormat(row, column) {
      return this.timestampToTime(row.timebegain);
    },
    timestampToTime(timestamp) {
      let date = new Date(timestamp * 1000);
      let Y = date.getFullYear() + "/";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes();
      // s = date.getSeconds();
      return Y + M + D + h + m;
    },
    sendCount() {
      bus.$emit("getCount", {0:this.tableData.length}); 
    },
    ...mapActions(["getWating"])
  },
  mounted() {
    this.getWating().then(res => {
      this.tableData = res.data;
      this.sendCount();
    });
  }
};
</script>