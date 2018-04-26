<template>
  <div>
    <Index></Index>
    <h1>
      {{text}}
    </h1>
  </div>
</template>
<script>
import Index from "./index";
export default {
  components: {
    Index
  },
  data() {
    return {
      text: "统计工作日志"
    };
  }
};
</script>