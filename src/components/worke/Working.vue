<template>
  <div id="working">
    <Index></Index>
    <el-table :loading="loading" :data="tableData.length?tableData.slice((currentPage-1)*pagesize,currentPage*pagesize):[]" style="width:100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-row>
              <el-col :span="16">
                <el-form-item label="发起人">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="执行人">
                  <span>{{ props.row.peoples }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余时间">
                  <endTime class="timeend" :endTime="props.row.timeend" v-on:timeStop="endFun(props.row)" endText="已经结束了"></endTime>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="任务详情">
                <el-col>
                  <span>{{ props.row.detail }}</span>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="任务ID" width="80" prop="missionid">
      </el-table-column>
      <el-table-column label="任务名称" prop="title">
      </el-table-column>
      <el-table-column label="开始时间" width="140" :formatter="begainFormat" prop="timebegain">
      </el-table-column>
      <el-table-column label="截止时间" width="140" prop="timeend" :formatter="endFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="hasComplate(scope.row,scope.$index,tableData)" size="small">完成</el-button>
          <!-- <el-button type="danger" size="small">提交审核</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" v-if="tableData.length!==0" justify="center">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" prev-text="上一页" next-text="下一页" layout="sizes, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 80px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.timeend {
  font-size: 20px;
  color: yellowgreen;
}
.el-pagination {
  margin: 25px auto;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { bus, timeParse } from "../../util/uniTool";
import Index from "./index";
import endTime from "./endTime";
export default {
  components: {
    Index,
    endTime
  },
  data() {
    return {
      tableData: [],
      countObj: {},
      currentPage: 1,
      pagesize: 5,
      loading: false
    };
  },
  methods: {
    endFun(row) {
      let data = {
        id: row.missionid,
        overtime: true
      };
      this.getWorking(data).then(res => {});
    },
    endFormat(row, column) {
      return timeParse(row.timeend);
    },
    begainFormat(row, column) {
      return timeParse(row.timebegain);
    },
    // sendCount() {
    //   this.countObj[this.$route.path] = this.tableData.length;
    //   bus.$emit("getCount", this.countObj);
    // },
    hasComplate(row, index, table) {
      this.loading = true;
      let data = {
        id: row.missionid,
        overtime: false
      };
      this.getWorking(data).then(res => {
        this.loading = false;
        if (res.success) table.splice(index, 1);
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    ...mapActions(["getWorking"])
  },
  mounted() {
    this.getWorking().then(res => {
      if (res.success) {
        this.tableData = res.data;
        // this.sendCount();
      }
    });
  }
};
</script>

