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
import { defineComponent, PropType } from "vue";

import FormComponent, {
  PropFormType as IformData,
} from "@/components/molecules/FormComponent.vue";

export { IformData };

export type DataType = {
  formData: IformData[];
};

<<<<<<< HEAD
=======
import FormComponent from "@/components/molecules/FormComponent.vue";

>>>>>>> cf680da0b331841514c08837bd27c2b310dbfca2
export default defineComponent({
  name: "EditForm",
  components: {
    FormComponent,
  },
  props: {
    formData: Array as PropType<IformData[]>, //編集画面のデータ
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