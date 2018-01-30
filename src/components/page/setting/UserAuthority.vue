<template>
<div>
  <Index></Index>
<el-form ref="form" :model="form" :rules="rules">
  <el-row :gutter="20">
    <el-col  :lg="10" :xl="8" >
          <el-form-item label="请选择修改对象" class="input_bottom" prop="peoples" >
              <el-input
                placeholder="试试搜索网络部"
                v-model="filterText">
              </el-input>
          </el-form-item>
            <div style="max-height:555px;overflow-y:auto;">
              <el-tree 
              style="height:100%"
                class="filter-tree"
                :data="peoples"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :indent=30
                :filter-node-method="filterNode"
                @check-change="getCheckedKeys"
                default-expand-all
                ref="tree">
              </el-tree>
              </div>
        </el-col>
        <el-col :lg="14" :xl="16">
            <el-form-item label="请设置界面权限"></el-form-item>
            <el-table
              ref="singleTable"
              :data="options"
               max-height="600"
              :default-sort="defaultSort"
              @selection-change="handleSelectionChange"
              >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="parentid"
                label="父栏目ID"
                width="80">
              </el-table-column>
              <el-table-column
                prop="fid"
                label="栏目ID"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="栏目名"
                width="100"
                >
              </el-table-column>
              <el-table-column
                label="权限按钮"
                >
                <template v-if="scope.row.button"  slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.permission">
                    <el-row class="buttonChecked" justify="space-around" type="flex">
                      <el-checkbox v-for="(item,index) in scope.row.button" :label="item"  :key="index">{{item}}</el-checkbox>
                    </el-row>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                label="排序"
                width="150"
                fixed="right"
                prop="orders"
                sortable
                >
                <template slot-scope="scope" >
                  <el-input-number  size="small" v-model="scope.row.orders" controls-position="right" :min="1" :max="options.length"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="button_bottom">
          <el-button type="info"  @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">提交修改</el-button>
    </el-row>
</el-form>
</div>
</template>
<style scoped>
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-checkbox__label {
  padding-left: 4px;
}
.buttonChecked {
  flex-wrap: wrap;
}
.input_bottom {
  margin-bottom: 20px;
}

.button_bottom button {
  margin: 20px;
  margin-top: 40px;
}
</style>
<script>
import Index from "./index";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Index
  },

  data() {
    return {
      form: {
        peoples: [],
        frames: [],
        permission: [],
        orders: [],
        fid:[]
      },
      loading: false,
      defaultSort: { prop: "orders", order: "ascending" },
      buttonKey: null,
      multipleSelection: [],
      peoples: [],
      options: [],
      frames2: [],
      frames: [],
      permission2: {},
      orders2: {},
      filterText: "",
      isOne: true,
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        peoples: [
          {
            type: "array",
            required: true,
            message: "请在下方至少选择一位设置对象",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.peoples = this.getOutfit;
    this.setFrameworke().then(res => {
      //初始化表格数据
      this.parseOption(res); //格式化数据
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          for (let { fid } of this.frames) {
            this.form.frames.push(fid);
          }
          for (let {fid, permission,orders } of this.$refs.singleTable.tableData) {
            this.form.permission.push(permission);
            this.form.orders.push(orders);
            this.form.fid.push(fid);
          }
          this.loading = true;
          this.setAuthority(this.form).then(_ => {
            this.loading = false;
            this.resetForm(); //重置表单
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.tree.setCheckedKeys([]); //重置树选项
      // this.form.peoples=[];
      this.form.fid=[],
      this.form.permission=[];
      this.form.orders=[];
      this.form.frames=[];
      this.frames=[];
      this.setFrameworke().then(res => {
        //初始化表格数据
        this.parseOption(res); //格式化数据
      });
    },
    getCheckedKeys() {
      if (this.isOne) {
        this.form.peoples = this.$refs.tree.getCheckedKeys(true);
        if (this.form.peoples.length == 1) {
          this.isOne = !this.isOne;
          this.setFrameworke(this.form.peoples[0]).then(res => {
            this.$refs.singleTable.clearSelection();
            if (Array.isArray(res) && res.length) {
              for (let { order, permission, fid } of res) {
                this.permission2[fid] = permission.split(",");
                this.orders2[fid] = order;
              }
              this.tableParse(
                this.$refs.singleTable.tableData,
                this.orders2,
                "orders"
              ); //更新表格oders数据项
              this.tableParse(
                this.$refs.singleTable.tableData,
                this.permission2,
                "permission"
              ); //更新表格permission数据项

              let nFrames = arrParseInt(res[0].frames.split(","));
              this.toggleSelection(nFrames); //设置表格默认选中
            }
            let tableData = this.$refs.singleTable.tableData;
            function arrParseInt(data) {
              return data.map(function(item) {
                return parseInt(item);
              });
            }
            this.isOne = !this.isOne;
          });
        } else {
          if (this.isOne) {
            this.isOne = !this.isOne;
            this.setFrameworke().then(res => {
              //初始化表格数据
              this.isOne = !this.isOne;
              this.parseOption(res); //格式化数据
            });
          }
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    tableParse(tabledata, ndata, tag) {
      tabledata.forEach((item, index) => {
        for (let id in ndata) {
          if (id == item.fid) {
            item[tag] = ndata[id];
          }
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.singleTable.tableData.map((value, index) => {
            if (value.ID == row)
              this.$refs.singleTable.toggleRowSelection(
                this.$refs.singleTable.tableData[index]
              );
          });
        });
      }
    },
    handleSelectionChange(val) {
      this.frames = val;
    },
    parseOption(res) {
      res.forEach(item => {
        for (let key in item) {
          if (key == "button" && item.button) {
            item.button = item[key].split(",");
          }
          if (key == "permission") {
            item.permission = [];
          }
        }
      });
      this.options = res;
    },
    ...mapActions(["setFrameworke", "setAuthority"])
  },
  computed: {
    ...mapGetters(["getOutfit"])
  }
};
</script>