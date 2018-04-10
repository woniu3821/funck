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
      width="100">
      <template slot-scope="scope">
        <el-button  @click.native.prevent="handleClick(scope.row,scope.$index,tableData)" :loading="loading" type="success" size="small">接受</el-button>
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
import { bus,timeParse } from "../../util/uniTool";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      tableData: [],
      countObj: {},
      loading:false,
    };
  },
  methods: {
    handleClick(row,index,tabledata) {
      this.loading=true;
      this.getWating(row.missionid).then(res => {
        tabledata.splice(index,1)
        this.loading=false;
      });
    },
    endFormat(row, column) {
      return timeParse(row.timeend);
    },
    begainFormat(row, column) {
      return timeParse(row.timebegain);
    },
    sendCount() {
      this.countObj[this.$route.path] = this.tableData.length;
      bus.$emit("getCount", this.countObj);
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