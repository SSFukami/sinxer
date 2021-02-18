<template>
  <div class="page">
    <div class="icon">
      <div class="icon-content"></div>
    </div>
    <div class="page-contents">
      <!-- {{formData}} -->
      <EditForm :formData="formData" @change-value="changeValue" />
    </div>
    <div class="done-back-button">
      <!-- <button class="done">完了</button>
      <button class="back">戻る</button> -->
      <WhiteButtonsSet 
      :form="whiteButtonsData" />
    </div>
    <!-- {{ formData }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormComponent, {
  PropFormType as IformData,
} from "@/components/molecules/FormComponent.vue";
import EditForm from "@/components/organisms/EditForm.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import WhiteButtonsSet, {
  ButtonsSetType as IButtonsData,
} from "@/components/molecules/WhiteButtonsSet.vue"

export type DataType = {
  formData: IformData[];
  whiteButtonsData:IButtonsData[];
};

export default defineComponent({
  name: "Edit",
  components: {
    EditForm,
    CommonButton,
    WhiteButtonsSet
  },
  data():DataType {
    return {
      formData: [
        //編集画面のデータ
        {
          id: 1,
          label: "名前",
          value: "",
          formType: "TextField",
        },
        {
          id: 2,
          label: "自己紹介",
          value: "",
          formType: "TextArea",
        },
        {
          id: 3,
          label: "Twitter",
          value: "",
          formType: "TextField",
        },
        {
          id: 4,
          label: "料金",
          value: "",
          formType: "TextArea",
        },
        {
          id: 5,
          label: "納期",
          value: "",
          formType: "TextArea",
        },
      ],
      whiteButtonsData:[
        {
          label:"完了",
          id:0,
        },
        {
          label:"キャンセル",
          id:1,
        }
      ]
    };
  },
  methods: {
    changeValue(value: String, key: number): void {
      (this as any).formData[key - 1].value = value;
    },
  },
});
</script>

<style lang="scss" scoped>

.page {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-auto-columns: 100px;
  padding-top: 60px;
  &-contents {
    overflow-y: scroll;
  }
}
.icon {
  justify-content: center;
  align-items:center;
  &-content {
    margin:20px 20px 0px 180px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: silver;
  }
}
.done-back-button {
  // padding: 160px 60px 0px 60px;
  // button {
  //   border: 50px;
  //   margin: 30px;
  //   width: 60%;
  //   height: 50px;
  //   color:$-primary-800;
  // }
}
</style>

