<template>
  <div class="edit-form">
    <FormComponent
      v-for="(form, index) in formData"
      :key="index"
      :form="form"
      @change-value="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormComponent from "@/components/molecules/FormComponent.vue";
export default defineComponent({
  name: "EditForm",
  components: {
    FormComponent,
  },
  props: {
    formData: Array, //編集画面のデータ
    // itemData:Object,
  },
  methods: {
    changeValue(value: String, key: Number) {
      (this as any).$emit("change-value", value, key);
    },
  },
});
</script>

<style>
</style>