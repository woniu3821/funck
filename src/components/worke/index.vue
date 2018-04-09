<template>
<el-menu :default-active="$route.path" class="el-menu-demo" router mode="horizontal">
  <el-menu-item v-for="(subItem,index) in childData" :index="subItem.path" :key="index"><el-badge :value="num" :max="99" class="item">
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
      num:0
    };
  },
  methods: {
    subcount() {
      bus.$on("getCount", (message,nums) => {
        this.num = message;
      });
    }
  },
  created() {
    console.log(this.childData)
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
