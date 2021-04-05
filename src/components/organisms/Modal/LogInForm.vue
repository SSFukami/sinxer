<template>
  <div class="login-form">
    <ModalFrame size="M">
      <template v-slot:header>
        <div class="header-label">{{ label }}</div>
      </template>
      <template v-slot:content>
        <RadioButton
          :value="jobNumber"
          :data="jobList"
          @change-value="changeJobNum"
        />
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
        <div class="footer" v-if="$store.state.common.logInLabel == '新規登録'">
          <CommonButton :label="label" @click-event="signUp" />
        </div>
        <div class="footer" v-else>
          <CommonButton :label="label" @click-event="signIn" />
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
  computed: {
    label(): string {
      //新規登録またはログイン
      return (this as any).$store.state.common.logInLabel;
    },
  },
  methods: {
    changeJobNum(value: number): void {
      //jobNumberの変更
      this.jobNumber = value;
    },
    changeFormValue(value: string, id: number): void {
      //ログイン情報の変更
      this.logInDataList[id - 1].value = value;
    },
    signUp(): void {
      //新規登録処理
      (this as any).$store.dispatch("auth/signUp", {
        id: this.logInDataList[0].value,
        password: this.logInDataList[1].value,
        jobNumber: this.jobNumber,
      });
    },
    signIn(): void {
      //サインイン処理
      (this as any).$store.dispatch("auth/signIn", {
        id: this.logInDataList[0].value,
        password: this.logInDataList[1].value,
        jobNumber: this.jobNumber,
      });
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