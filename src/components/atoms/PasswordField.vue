<template>
  <input type="password" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PasswordField",
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
      get(): string | undefined {
        return this.value;
      },
      set(value: string) {
        this.$emit("change-value", String(value), this.id);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
input[type="password"] {
  font-size: 20px;
  width: 100%;
  height: 32px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}
</style>