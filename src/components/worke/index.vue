<template>
<el-menu :default-active="$route.path" class="el-menu-demo" router mode="horizontal" @select="creatSelect">
  <el-menu-item v-for="(subItem,index) in childData" :index="subItem.path" :key="index"><el-badge :value="30" :max="99" class="item">
  {{subItem.name}}
</el-badge></el-menu-item>
</el-menu>
</template>
<script>
import { mapState } from "vuex"
import { creatChild,permission } from "../../util/uniTool"
export default {
  data() {
    return {
      childData: []
    };
  },
  methods: {
    creatSelect(tab, event) {
      console.log(tab, event);
    }
  },
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
