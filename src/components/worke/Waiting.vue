<template>
  <div>
    <Index></Index>
    <el-table v-loading="loading" class="waiting_table" :data="tableData" border tooltip-effect="light" :row-class-name="tableRowClassName">
      <el-table-column fixed prop="missionid" label="任务ID" width="80">
      </el-table-column>
      <el-table-column prop="title" label="任务名称">
      </el-table-column>
      <el-table-column prop="name" label="发起人" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="peoples" label="执行人" min-width="120">
      </el-table-column>
      <el-table-column prop="detail" label="任务简介" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="timebegain" label="发起时间" width="140" :formatter="begainFormat">
      </el-table-column>
      <el-table-column prop="timeend" label="截止时间" width="140" :formatter="endFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-badge value="已修改" v-if="scope.row.status===2" class="item">
            <el-button @click.native.prevent="handleClick(scope.row,scope.$index,tableData)" plain="" type="infor" size="small">接受</el-button>
          </el-badge>
          <el-button v-else @click.native.prevent="handleClick(scope.row,scope.$index,tableData)" type="success" size="small">接受</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.waiting_table {
  text-align: left;
}
.item {
  font-size: 12px;
}
.el-badge__content.is-fixed {
  top: 10px;
}
.el-tooltip__popper.is-light {
  left: 50% !important;
  max-width: 50% !important;
  line-height: 20px;
  font-size: 14px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
import { bus, timeParse } from "../../util/uniTool";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      tableData: [],
      countObj: {},
      loading: false
    };
  },
  methods: {
    handleClick(row, index, tabledata) {
      this.loading = true;
      this.getWating(row.missionid).then(res => {
        tabledata.splice(index, 1);
        this.loading = false;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status === 2) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    endFormat(row, column) {
      return timeParse(row.timeend);
    },
    begainFormat(row, column) {
      return timeParse(row.timebegain);
    },
    ...mapActions(["getWating"])
  },
  mounted() {
    this.loading = true;
    this.getWating().then(res => {
      this.loading = false;
      if (res.success) {
        this.tableData = res.data;
      }
    });
  }
};
</script>