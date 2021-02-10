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
import FormComponent from "@/components/molecules/FormComponent.vue";
export default {
  name: "EditForm",
  components: {
    FormComponent,
  },
  props: {
    formData: Array,
    // itemData:Object,
  },
  methods: {
    changeValue(value: String, key: Number) {
      (this as any).$emit("change-value", value, key);
    },
  },
};
</script>

<style>
</style>