<template>
  <div class="icon">
    <img src="icon" />
  </div>
</template>

<script land="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserIcon",
  props: {
    icon: String, //アイコンのルート
  },
});
</script>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: silver; //テスト用
}
</style>