<template>
  <span :class="{active:isActive}">
    <slot>
      {{content}}
    </slot>
  </span>
</template>
<style scoped>
.active {
  color: #ff6347 !important;
}
</style>

<script>
export default {
  data() {
    return {
      content: "",
      isActive: false
    };
  },
  props: {
    endTime: Number,
    endText: {
      type: String,
      default: "已结束"
    }
  },
  mounted() {
    this.countdowm(this.endTime);
  },
  methods: {
    countdowm(timestamp) {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day}天${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour <= 0) {
            format = `${min}分${sec}秒`;
          }
          self.content = format;
        } else {
          clearInterval(timer);
          self.isActive = true;
          self.content = self.endText;
          self.$emit("timeStop");
        }
      }, 1000);
    }
  }
};
</script>