<template>
  <ModalFrame size="M">
    <template v-slot:header>
      <div class="header-label">{{ label }}</div>
    </template>
    <template v-slot:content>
      <FormComponent
        v-for="form in logInDataList"
        :key="form.id"
        :form="form"
        @change-value="changeFormValue"
      />
    </template>
    <template v-slot:footerLeft>
      <div></div>
    </template>
    <template v-slot:footerRight>
      <CommonButton :label="label" />
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import FormComponent from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

interface IlogInDataList {
  id: number;
  label: string;
  value: string;
  formType: string;
}

export type DataType = {
  label: string;
  logInDataList: IlogInDataList[];
};

export default defineComponent({
  name: "LogInForm",
  components: {
    ModalFrame,
    FormComponent,
    CommonButton,
  },
  data(): DataType {
    return {
      label: "新規登録", //(試験的な)新規登録かログイン

      logInDataList: [ //フォームのデータ
        {
          id: 1,
          label: "メールアドレス",
          value: "",
          formType: "TextField",
        },
        {
          id: 2,
          label: "パスワード",
          value: "",
          formType: "PasswordField",
        },
      ],
    };
  },
  methods: {
    changeFormValue(value: string, id: number): void {
      this.logInDataList[id - 1].value = value;
    },
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}
</style>