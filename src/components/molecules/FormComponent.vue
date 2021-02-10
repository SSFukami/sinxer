<template>
  <div class="form-component">
    <div class="form-component-label">{{ form.label }}</div>
    <div class="form-component-input">
      <component
        :is="form.formType"
        :value="form.value"
        :id="form.id"
        @change-value="changeValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import PasswordField from "@/components/atoms/PasswordField.vue";

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
    PasswordField,
  },
  props: {
    form: {
      //フォームのデータ
      type: Object as PropType<PropFormType>,
      require: true,
    },
  },
  methods: {
    changeValue(value: string, key: number) {
      this.$emit("change-value", value, key);
    },
  },
});
</script>

<style lang="scss" scoped>
.form-component {
  width: 100%;
  display: grid;
  grid-template-rows: 32px 48px;
  row-gap: 16px;

  &-label {
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  &-input {
    display: flex;
    align-items: center;
  }
}
</style>