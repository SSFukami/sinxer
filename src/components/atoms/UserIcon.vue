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
  computed: {},
});
</script>

<style lang="scss" scoped>
.cropImg {
  height: 120px;
  height: 120px;
  border-radius: 50%;
}
input {
  display: none;
}
// img{
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   margin: auto;
// }
</style>