<template>
  <input type="password" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PassField",
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
        this.$emit("change-value", value, this.id);
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
  color: $-primary-800;
  background-color: $-primary-600;
  border: 2px solid $-primary-800;
  outline: none;
}
</style>