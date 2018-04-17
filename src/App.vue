<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
/* 初始化样式 */
html,body{height:100%; width:100%;  margin:0;
padding:0;}
#app{
width:100%; margin:0;
height:100%;
padding:0;
}
#layout,#mainBox{
   width:100%;
   height:100%;
}
.el-container{
  align-content: stretch;
  height:100%;
}
.el-container.is-vertical{
  width:100%; height:100%;
}

</style>
