<template>
  <div>
    <Index></Index>
    <el-table :data="tableData.length?tableData.slice((currentPage-1)*pagesize,currentPage*pagesize):[]" style="width: 100%" :default-sort="{prop: 'ID', order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="日志详情">
              <span v-html="props.row.content"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="日志 ID" sortable prop="ID">
      </el-table-column>
      <el-table-column label="添加日期" prop="intime">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="changeLog(scope.row)" size="small">
            修改
          </el-button>
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
  width: 90px;
  color: #99a9bf;
}
.el-pagination {
  margin: 25px auto;
}
</style>

<script>
import { mapActions } from "vuex";
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5
    };
  },
  mounted() {
    this.getMyDaily().then(res => {
      if (res.success) this.tableData = res.data;
    });
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    changeLog(row) {
      this.$router.push({
        path: "/adddaily",
        name: "adddaily",
        params: row
      });
    },
    ...mapActions(["getMyDaily"])
  }
};
</script>