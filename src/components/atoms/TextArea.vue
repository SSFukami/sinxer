<template>
  <div class="text-area">
    <textarea v-model="innerValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextArea",
  props: {
    value: {
      type: String,
      required: true,
    },
    id: Number,
  },
  computed: {
    innerValue: {
      get(): String | undefined {
        return (this as any).value;
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
textarea {
  width: 100%;
  height: 180px;
  color: $-primary-800;
  background: $-primary-200;
  border: none;
  border-bottom: 1px solid $-primary-800;
  resize: none;
}
</style>