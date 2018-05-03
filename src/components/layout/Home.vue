<template>
  <div>
    <el-row type="flex" align="center" justify="center">
      <el-col :span="12">
        <h1>BLOGSCN-工作管理框架使用说明</h1>
        <p>使用说明是不可能有的了，如果有意见和建议欢迎通过以下方式和我联系</p>
        <h4>联系方式：</h4>
        <p>
          <i class="el-icon-info"> QQ : 643556567</i>
        </p>
        <p>
          <i class="el-icon-info"> E-mail : cuimmcan@qq.com</i>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<style>

</style>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("socket");
export default {
  data() {
    return {};
  },
  sockets: {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>
