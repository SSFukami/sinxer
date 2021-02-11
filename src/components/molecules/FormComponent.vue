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
import { defineComponent, PropType } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import TextFieldOrange from "@/components/atoms/TextFieldOrange.vue";
import PassField from "@/components/atoms/PassField.vue";
import TextArea from "@/components/atoms/TextArea.vue";

export type PropFormType = {
  id: number;
  label: string;
  value: string;
  formType: string;
};

export default defineComponent({
  name: "FormComponent",
  components: {
    TextField,
    TextFieldOrange,
    PassField,
    TextArea,
  },
  props: {
    form: Object, //フォームのデータ
  },
  methods: {
    changeValue(value: String, key: Number) {
      (this as any).$emit("change-value", value, key);
    },
  },
});
</script>

<style lang="scss" scoped>
.form-component {
  width: 100%;
  height: auto;
  padding: 8px;
  &-label {
    height: 24px;
  }
}
</style>