<template>
  <div>
    <Index></Index>
    <div>
      <h1 class="red">{{msg}}</h1>
    </div>
  </div>
</template>
<style scoped>

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
      msg: "待开发,敬请期待..."
    };
  }
};
</script>