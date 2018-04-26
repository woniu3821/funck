<template>
  <div style="height:100%;">
    <div class="box">
      <div class="box_content">
        <el-row type="flex" justify="center">
          <img src="../../../assets/images/404.gif" alt="">
        </el-row>
        <el-row type="flex" justify="center">
          <h1 class="info">{{msg}} 哎呀!你迷路了...</h1>
        </el-row>
        <el-row justify="center" type="flex">
          <router-link to="/home">
            <el-button type="primary" plain="">
              {{num}}秒后返回首页
            </el-button>
          </router-link>
          <router-link class="backhome" v-if="this.$route.params.path" :to="this.$route.params.path">
            <el-button type="success" plain>
              返回上一页
            </el-button>
          </router-link>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped>
.backhome {
  margin-left: 20px;
}
.box {
  background-color: #373740;
  overflow: hidden;
  height: 100%;
}
.box_content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info {
  color: #fff;
  font-size: 50px;
}
</style>
<script>
export default {
  data() {
    return {
      msg: 404,
      num: 9,
      timer: null
    };
  },
  methods: {},
  mounted() {
    this.timer = setInterval(() => {
      this.num--;
      if (this.num == 0) {
        this.$router.replace("/home");
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>


