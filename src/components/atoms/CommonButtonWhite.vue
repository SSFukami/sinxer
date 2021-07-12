<template>
  <button @click="clickEvent">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommonButton",
  props: {
    label: {
      //ボタンの中に表示する文字列
      type: String,
      required: true,
    },
    id: {
      //WhiteButtonsSet用
      type: Number,
      required: false,
    },
  },
  methods: {
    clickEvent(): void {
      //ボタンクリックのイベント
      this.$emit("click-event");
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  background-color: $-primary-100;
  border: 2px solid;
  color: $-primary-800;
  border-color: $-primary-800;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: $-primary-700;
    color: $-primary-100;
  }
}
</style>