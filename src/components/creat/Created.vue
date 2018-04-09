<template>
<div>
  <Index></Index>
  <el-table class="created_table"
    :data="getCreated"
    border
    max-height="750"
    style="width: 100%">
    <el-table-column
      fixed
      prop="ID"
      label="任务ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="任务名称"
      width="200">
    </el-table-column>
    <!-- <el-table-column
      prop="province"
      label="发起人"
      width="80">
    </el-table-column> -->
    <el-table-column
      prop="peoples"
      label="执行人"
      width="250">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="任务简介"
      width="500">
    </el-table-column>
    <el-table-column
      prop="timebegain"
      label="发起时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="timeend"
      label="截止时间"
      width="160">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="updateMission(scope.row)" size="small">修改</el-button>
        <el-button type="success" @click="checkMission(scope.row)" size="small">审查</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 弹出框 -->
<el-dialog
  title="任务进度"
  :visible.sync="dialogVisible"
  width="45%"
  :before-close="handleClose">
    <el-table
    max-height="350"
    :data="tableData"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%;text-align:left;">
    <el-table-column
      label="时间节点"
      width="180"
      sortable
      prop="date"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="动态"
      >
      <template slot-scope="scope">
          <el-tag type="success" size="medium">{{ scope.row.title }}</el-tag>
          <el-tag type="info" size="medium">接收任务了任务{{scope.row.date}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="160"  label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteMission">取消任务</el-button>
    <el-button type="primary" @click="doneMission">确认完成</el-button>
  </span>
</el-dialog>
</div>
</template>
<style scoped>
.created_table {
  text-align: left;
}
</style>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-10",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-10",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-10",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
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
    checkMission(row) {
      console.log(row.ID);
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteMission() {
      this.$confirm("是否确认删除任务？")
        .then(_ => {
          this.dialogVisible = false;
          done();
        })
        .catch(_ => {});
    },
    doneMission() {
      this.$confirm("确认此任务已完成并结束任务？")
        .then(_ => {
          this.dialogVisible = false;
          done();
        })
        .catch(_ => {});
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    ...mapActions(["toUpdateMission"])
  },
  computed: {
    ...mapGetters(["getCreated"])
  }
};
</script>