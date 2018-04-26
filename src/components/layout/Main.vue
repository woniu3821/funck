<template>
  <el-main id="mainBox">
    <router-view></router-view>
  </el-main>
</template>
<style>
.el-main {
  background-color: #fff;
  color: #333;
  text-align: left;
  padding-top: 0;
}
.el-menu-demo {
  margin-bottom: 20px;
}
#mainBox > div {
  width: 100%;
}
</style>
