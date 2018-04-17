<template>
  <div id="layout">
  <el-container>
   <el-header>
      <el-menu
      menu-trigger="click"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="0" popper-class="submenu">
          <template slot="title">
            <i v-if="show" class="iconfont icon-head1 head"></i>
            <img v-else class="headerbox" :src="src"/>
            <span slot="title">{{name}}</span>
          </template>
          <el-menu-item index="1"><i class="el-icon-edit"></i>用户设置</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-delete"></i>退出登陆</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-info"></i>返回首页</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-refresh"></i>刷新当前页</el-menu-item>
        </el-submenu>
      </el-menu>
   </el-header>
    <el-container>
      <Aside></Aside>
      <Mian></Mian>
    </el-container>
  </el-container>
  </div>
</template>
<style>
.headerbox{
  height:30px;width:30px;border-radius:50%;
  margin-right:3px;
}
.head{
  font-size:35px;
  color:#fff!important;
}
.el-header {
  background-color:#545c64;
  padding:0;
  text-align: center;
  line-height: 60px;
  height:60px;
  padding:0 20px;
}
.submenu{
//  width:60px;
}
</style>
<script>
import Aside from "./Aside"
import Mian from "./Main"
import {mapActions} from "vuex"
export default {
  name: "layout",
  components: {
    Aside,
    Mian
  },
  data(){
     return{
       src:"",
       name:"",
       show:true
     }
  },
  mounted(){
    this.getuserinfo().then(res=>{
      if(res.path){
        this.src=res.path.replace(/static/,"");
        this.show=!this.show;
      }
      this.name=res.name;
    })
  },
  methods:{
    handleSelect(index){
      switch(index){
        case '1':this.$router.replace('/admin')
        braek;
        case '2':this.userlogout().then(_=>{
          this.$router.replace('/login')
        })
        break;
        case '3':
          this.$router.replace('/home')
        break;
        case '4':
          this.$router.go(0)
        break;
      }
    },
  ...mapActions({
    userlogout:"user/logout",
    getuserinfo:"getUserInfo"
  })
  }
};
</script>