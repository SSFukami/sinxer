<template>
  <input type="text" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    value: {
      //入力される文字列
      type: String,
      required: true,
    },
    id: Number,
    label: {
      //テキストフィールドに表示する文字列
      type: String,
      default: "",
    },
  },
  computed: {
    innerValue: {
      get(): String | undefined{
        return this.value;
      },
      set(value: string) {
        (this as any).$emit("change-value", value, (this as any).id);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
input[type="text"] {
  font-size: 20px;
  width: 100%;
  height: 32px;
  color: $-primary-800;
  background: $-primary-200;
  border: none;
  border-bottom: 1px solid $-primary-800;
  outline: none;
}
</style>