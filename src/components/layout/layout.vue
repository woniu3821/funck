<template>
  <div id="layout">
  <el-container>
   <el-header>Header</el-header>
    <el-container>
      <Aside></Aside>
      <Mian></Mian>
    </el-container>
  </el-container>
  </div>
</template>
<script>
import Aside from "./Aside"
import Mian from "./Main"
export default {
  name: "layout",
  components: {
    Aside,
    Mian
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
