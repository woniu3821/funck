<template>
  <div>
    <Index></Index>
    {{msg}}
  </div>
</template>
<style scoped>
.waiting_table {
  text-align: left;
}
</style>
<script>
import Index from "./index";
export default {
  components: {
    Index
  },
  methods: {},
  data() {
    return {
      msg: "待开发。。。"
    };
  }
};
</script>