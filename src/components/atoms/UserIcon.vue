<template>
  <div class="icon">
    <input type="file" />
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
}
input {
  display: none;
}
</style>