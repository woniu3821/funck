<template>
<el-menu :default-active="$route.path"  class="el-menu-demo" router mode="horizontal">
  <el-menu-item v-for="(subItem,index) in childData"  :index="subItem.path" :key="index">{{subItem.name}}</el-menu-item>
</el-menu>
</template>
<script>
import { mapState } from "vuex";
import { creatChild } from "../../../util/uniTool";

export default {
  data() {
    return {
      childData: []
    };
  },
  methods: {},
  created() {
    creatChild(this.navList, this.$route.path, this);
  },
  computed: {
    ...mapState({
      navList: state => state.permission.list
    })
  }
};
</script>
