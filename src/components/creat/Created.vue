<template>
  <div>
    <Index></Index>
    <el-table class="created_table" ref="totalTable" :data="tableData.length? tableData.slice((currentPage - 1) * pagesize,currentPage * pagesize):[]" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-row>
              <el-form-item label="执行人">
                <span>{{ props.row.peoples }}</span>
              </el-form-item>
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
      <el-table-column prop="ID" label="任务ID" width="80">
      </el-table-column>
      <el-table-column prop="title" label="任务名称">
      </el-table-column>
      <el-table-column prop="timebegain" label="发起时间" width="160">
      </el-table-column>
      <el-table-column prop="timeend" label="截止时间" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" @click.native.prevent="checkMission(scope.row,scope.$index)" :loading="loading" size="small">进度</el-button>
          <el-button @click="updateMission(scope.row)" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" v-if="tableData.length">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" prev-text="上一页" next-text="下一页" layout="sizes, prev, pager, next" :total="getCreated.length">
      </el-pagination>
    </el-row>
    <!-- 弹出框 -->
    <el-dialog :lock-scroll="true" title="任务进度" :visible.sync="dialogVisible" width="45%">
      <el-row class="mission_status">
        <el-col :span="6">共：{{tableData2.length}}人</el-col>
        <el-col :span="6">未完成：{{tableStatusPase.w}}人</el-col>
        <el-col :span="6">已完成：{{tableStatusPase.c}}人</el-col>
        <el-col :span="6">超时未完成：{{tableStatusPase.o}}人</el-col>
      </el-row>
      <el-table max-height="350" :data="tableData2" :default-sort="{prop: 'complatetime', order: 'descending'}" style="width: 100%;text-align:left;">
        <el-table-column label="执行人" prop="name" width="80">
        </el-table-column>
        <el-table-column label="接收时间" prop="accepttime" :formatter="acceptFormat">
        </el-table-column>
        <el-table-column label="完成时间" prop="complatetime" :formatter="complateFormat">
        </el-table-column>
        <el-table-column width="160" label="动态">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" :loading="footer_loading" @click="deleteMission(missionID,index)">删除任务</el-button>
        <el-button :loading="footer_loading" @click="doneMission(missionID,index)" type="primary">确认完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
.created_table {
  text-align: left;
}
.el-pagination {
  margin-top: 25px;
  margin-bottom: 25px;
}
.mission_status {
  border-bottom: 1px solid #ccc;
}
.el-dialog__header {
  background: #ecf5ff;
}
</style>
<script>
import { timeParse } from "../../util/uniTool";
import { mapActions, mapGetters } from "vuex";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      loading: false,
      tableData2: [],
      footer_loading: false,
      status: 0,
      missionID: null,
      index: null
    };
  },
  mounted() {
    this.tableData = this.getCreated.length ? this.getCreated : [];
  },
  watch: {},
  methods: {
    updateMission(row) {
      this.toUpdateMission(row.ID)
        .then(res => {
          this.$router.push({
            path: "/build",
            name: "build",
            params: {
              dataObj: res.data
            }
          });
        })
        .catch(err => {});
    },
    acceptFormat(row) {
      if (row.accepttime) {
        return timeParse(row.accepttime);
      } else {
        return "未接收";
      }
    },
    complateFormat(row) {
      if (row.complatetime) {
        return timeParse(row.complatetime);
      } else {
        return "未完成";
      }
    },

    checkMission(row, index) {
      this.loading = true;
      this.missionID = row.ID;
      this.index = index;
      this.getProgress({ id: row.ID, peoples: row.peoples }).then(res => {
        this.loading = false;
        if (!res.success) {
          this.tableData2 = res.data;
          this.dialogVisible = true;
        }
      });
    },

    deleteMission(id, index) {
      this.handleMission(id, 2, index);
    },
    doneMission(id, index) {
      this.handleMission(id, 1, index);
    },
    handleMission(id, status, index) {
      this.tableData.splice(index, 1);
      this.footer_loading = true;
      this.getProgress({ id: id, status: status }).then(_ => {
        this.footer_loading = false;
        this.dialogVisible = false;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    ...mapActions(["toUpdateMission", "getProgress"])
  },
  computed: {
    tableStatusPase() {
      let tableStatus = {
        w: 0,
        c: 0,
        o: 0
      };
      let data = this.tableData2;
      if (Array.isArray(data) && data.length) {
        for (let { status, intime } of data) {
          if (intime === 2) tableStatus.o++;
          if (intime === 0) tableStatus.w++;
          if (intime === 1) tableStatus.c++;
        }
      }
      return tableStatus;
    },
    ...mapGetters(["getCreated"])
  }
};
</script>