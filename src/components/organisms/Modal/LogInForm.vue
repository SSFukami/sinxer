<template>
  <div class="login-form">
    <ModalFrame size="M">
      <template v-slot:header>
        <div class="header-label">{{ label }}</div>
      </template>
      <template v-slot:content>
        <RadioButton :value="jobNumber" :data="jobList" @change-value="changeJobNum" />
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
        <div class="footer">
          <CommonButton :label="label" />
        </div>
      </template>
    </ModalFrame>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import FormComponent, {
  PropFormType as IlogInData,
} from "@/components/molecules/FormComponent.vue";
import RadioButton from "@/components/atoms/RadioButton.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import { JOB_LIST, IradioButtonList } from "@/mixins/radioButtonList";

type DataType = {
  jobList: IradioButtonList[];
  label: string;
  jobNumber: number;
  logInDataList: IlogInData[];
};

export default defineComponent({
  name: "LogInForm",
  components: {
    ModalFrame,
    FormComponent,
    RadioButton,
    CommonButton,
  },
  data(): DataType {
    return {
      jobList: JOB_LIST, //職業の配列リスト

      label: "新規登録", //(試験的な)新規登録かログイン

      jobNumber: 0, //歌い手(0)かMix師(1)かの番号
      logInDataList: [
        //フォームのデータ
        {
          id: 1,
          label: "メールアドレス",
          value: "",
          formType: "TextFieldOrange",
        },
        {
          id: 2,
          label: "パスワード",
          value: "",
          formType: "PassField",
        },
      ],
    };
  },
  methods: {
    changeJobNum(value: number): void {
      this.jobNumber = value;
    },
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
.footer {
  width: 120px;
}
</style>