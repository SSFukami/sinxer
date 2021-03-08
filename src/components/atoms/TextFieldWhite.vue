<template>
  <input type="text" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextFieldWhite",
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
      get(): String | undefined {
        return this.value;
      },
      set(value: string) {
        this.$emit("change-value", value, this.id);
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
  background-color: $-primary-100;
  border: none;
  border-bottom: 1px solid $-primary-800;
  outline: none;
}
</style>