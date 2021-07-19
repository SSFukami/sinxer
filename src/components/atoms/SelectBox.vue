<template>
  <select v-model="innerValue">
    <option v-for="(item, index) in data" :key="index" :value="item.id">
      {{ item.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IselectBoxList } from "@/mixins/selectBoxList";

export default defineComponent({
  name: "SelectBox",
  props: {
    value: {
      //選択されている値
      type: Number,
      required: true,
    },
    data: {
      //選択肢のデータ配列
      type: Array as PropType<IselectBoxList[]>,
      required: true,
    },
  },
  computed: {
    innerValue: {
      get(): number | undefined {
        return this.value;
      },
      set(value: number) {
        this.$emit("change-value", Number(value));
      },
    },
  },
});
</script>

<style lang="scss" scoped>
select {
  font-size: 20px;
  width: 100%;
  height: 32px;
  color: $-primary-800;
}
</style>