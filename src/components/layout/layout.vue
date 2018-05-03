<template>
  <div id="layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :xs="12" :sm="7" :md="8" :lg="9">
            <el-menu menu-trigger="hover" class="el-menu-header-left" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1" popper-class="submenu">
                <template slot="title">
                  <i v-if="show" class="iconfont icon-head1 head"></i>
                  <img v-else class="headerbox" :src="src" />
                  <span slot="title">{{name}}</span>
                </template>
                <el-menu-item index="1-1">
                  <i class="el-icon-edit"></i>用户设置</el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-delete"></i>退出登陆</el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-info"></i>返回首页</el-menu-item>
                <el-menu-item index="1-4">
                  <i class="el-icon-refresh"></i>刷新当前页</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col class="hidden-xs-only" :sm="10" :md="8" :lg="6">
            <span class="header_title">BLOGSCN-工作管理系统</span>
          </el-col>
          <el-col :xs="{span: 6, offset: 6}" :sm="{span: 4, offset: 3}" :md="{span: 4, offset: 4}" :lg="{span: 3, offset: 6}">
            <el-menu menu-trigger="hover" class="el-menu-header-right" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect">
              <el-submenu index="2">
                <template slot="title">
                  <el-badge class="dot-item" :is-dot="dot.wait||dot.work? true : false"> 消息中心
                  </el-badge>
                </template>
                <el-menu-item index="2-1">
                  待接收任务：{{dot.wait}}
                </el-menu-item>
                <el-menu-item index="2-2">
                  待完成任务：{{dot.work}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <Aside></Aside>
        <Mian></Mian>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.headerbox {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 3px;
}
.item {
  margin-top: 10px;
}
.dot-item .el-badge__content.is-fixed {
  top: 15px;
}
.header_title {
  color: #d3dde6;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
}
.head {
  font-size: 35px;
  color: #fff !important;
}
.el-header {
  background-color: #545c64;
  padding: 0;
  text-align: center;
  line-height: 60px;
  height: 60px;
  padding: 0 20px;
}
</style>
<script>
import Aside from "./Aside";
import localStorage from "../../util/localstorage";
import Mian from "./Main";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "layout",
  components: {
    Aside,
    Mian
  },
  data() {
    return {
      src: "",
      name: "",
      show: true
    };
  },
  mounted() {
    this.getuserinfo().then(res => {
      if (res.path) {
        this.src = res.path.replace(/static/, "");
        this.show = !this.show;
      }
      this.name = res.name;
    });
  },
  computed: {
    ...mapState({}),
    ...mapGetters({
      dot: "socket/showDot"
    })
  },
  methods: {
    handleSelect(index) {
      switch (index) {
        case "1-1":
          this.$router.replace("/admin");
          break;
        case "1-2":
          this.userlogout().then(_ => {
            this.$router.replace("/login");
          });
          break;
        case "1-3":
          this.$router.replace("/home");
          break;
        case "1-4":
          this.$router.go(0);
          break;
        case "2-1":
          this.$router.replace("/waiting");
          break;
        case "2-2":
          this.$router.replace("/working");
          break;
      }
    },
    ...mapActions({
      userlogout: "user/logout",
      getuserinfo: "getUserInfo"
    })
  }
};
</script>