<template>
    <el-aside width="200px">
      <el-row>
        <el-col>
          <h5>任务/操作</h5>
          <el-menu
            router 
            default-active="$route.path"
            class="el-menu-vertical-demo">
            <el-menu-item v-if="item.child.length||item.end" v-for="(item, index) in navList" :item="item" :key="index" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
</template>
<style scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  
  computed: {
    ...mapState({
      navList: state => state.permission.list
    })
  }
}
</script>
