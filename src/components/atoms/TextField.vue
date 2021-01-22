<template>
  <input type="text" :placeholder="label" v-model="innerValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    value: String,
    id: Number,
    label: String,
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
input[type="text"] {
  font-size: 20px;
  width: 100%;
  height: 32px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}
</style>