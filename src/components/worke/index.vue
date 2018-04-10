<template>
<el-menu :default-active="$route.path" class="el-menu-demo" router mode="horizontal">
  <el-menu-item v-for="(subItem,index) in childData" :index="subItem.path" :key="index"><el-badge :value="num[subItem.path]" :max="99" class="item">
 {{subItem.name}}</el-badge>
</el-menu-item>
</el-menu>
</template>
<script>
import { mapState } from "vuex";
import { creatChild, permission,bus } from "../../util/uniTool";
export default {
  data() {
    return {
      childData: [],
      num:{}
    };
  },
  methods: {
    subcount() {
      bus.$on("getCount", (message) => {
        this.num = message;
      });
    }
  },
  created() {
    this.subcount()
    creatChild(this.navList, this.$route.path, this);
  },
  computed: {
    ...mapState({
      navList: state => state.permission.list
    })
  }
};
</script>
