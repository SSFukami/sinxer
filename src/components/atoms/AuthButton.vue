<template>
  <button>{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthButton",
  props: {
    label: {
      //ボタンの中に表示する文字列
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
button {
  width: 100%;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  color: $-primayr-800;
  background: none;
  border: 2px solid;
  border-color: $-primayr-800;
  background-color:$-auth-button;
  outline: none;
  cursor: pointer;
}
</style>