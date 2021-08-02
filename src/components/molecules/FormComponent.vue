<template>
  <div class="form-component">
    <div class="form-component-label">{{ form.label }}</div>
    <component
      :is="form.formType"
      :value="form.value"
      :id="form.id"
      :option="form.option"
      @change-value="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import TextFieldOrange from "@/components/atoms/TextFieldOrange.vue";
import NumberField from "@/components/atoms/NumberField.vue";
import PassField from "@/components/atoms/PassField.vue";
import TextArea from "@/components/atoms/TextArea.vue";

export type PropFormType = {
  id: number;
  label: string;
  option?: { min?: number; step?: number };
  value: string | number;
  formType: string;
};

export default defineComponent({
  name: "FormComponent",
  components: {
    TextField,
    TextFieldOrange,
    NumberField,
    PassField,
    TextArea,
  },
  props: {
    form: { //フォームのデータ
      type: Object as PropType<PropFormType>,
      required: true,
    },
  },
  methods: {
    changeValue(value: string | number, key: number) {
      this.$emit("change-value", value, key);
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