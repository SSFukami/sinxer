<template>
  <input type="number" :min="option.min" :step="option.step" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "NumberField",
  props: {
    value: {
      //入力される文字列
      type: Number,
      required: true,
    },
    id: Number,
    label: {
      //テキストフィールドに表示する文字列
      type: String,
      default: "",
    },
    option: {
      //制限等の設定の情報
      type: Object as PropType<{ min?: number; step?: number }>,
      required: false,
    },
  },
  computed: {
    innerValue: {
      get(): number | undefined {
        return this.value;
      },
      set(value: number) {
        this.$emit("change-value", Number(value), this.id);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

input[type="number"] {
  font-size: 20px;
  width: 100%;
  height: 32px;
  color: $-primary-800;
  background-color: $-primary-100;
  border: 2px solid $-primary-800;
  outline: none;
}
</style>