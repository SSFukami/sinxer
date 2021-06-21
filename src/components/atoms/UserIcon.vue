<template>
  <div class="icon">
    <img :src="icon" class="cropImg" />
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
.cropImg {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
input {
  display: none;
}
</style>