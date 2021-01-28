<template>
  <div class="form-component">
    <div class="form-component-label">{{ form.label }}</div>
    <component
      :is="form.formType"
      :value="form.value"
      :id="form.id"
      @change-value="changeValue"
    />
  </div>
</template>

<script lang="ts">
import TextField from "@/components/atoms/TextField.vue";
import TextArea from "@/components/atoms/TextArea.vue";
export default {
  name: "FormComponent",
  components: {
    TextField,
    TextArea,
  },
  props: {
    form: Object,
  },
  methods: {
    changeValue(value: String, key: Number) {
      (this as any).$emit("change-value", value, key);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-component {
  padding-top: 20px;
  padding-bottom: 60px;
}
</style>