<template>
  <div class="page">
    <div class="icon">
      <div class="icon-content">
        <UserIcon />
      </div>
    </div>
    <div class="page-contents" v-if="$store.state.auth.mixerState === true">
      <!-- {{formData}} -->
      <EditForm :formData="mixerFormData" @change-value="changeMixerValue" />
    </div>
    <div class="page-contents" v-if="$store.state.auth.singerState === true">
      <EditForm :formData="singerFormData" @change-value="changeSingerValue" />
    </div>
    <div class="done-back-button">
      <WhiteButtonsSet :data="whiteButtonsData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditForm, { IformData } from "@/components/organisms/EditForm.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import WhiteButtonsSet, {
  ButtonsSetType as IButtonsData,
} from "@/components/molecules/WhiteButtonsSet.vue";
import UserIcon from "@/components/atoms/UserIcon.vue";

export type DataType = {
  mixerFormData: IformData[];
  singerFormData: IformData[];
  whiteButtonsData: IButtonsData[];
};

export default defineComponent({
  name: "Edit",
  components: {
    EditForm,
    CommonButton,
    WhiteButtonsSet,
    UserIcon,
  },
  data(): DataType {
    return {
      mixerFormData: [
        //ミックス師編集画面のデータ
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
      singerFormData: [
        //歌い手編集画面のデータ
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
          label: "投稿先リンク",
          value: "",
          formType: "TextArea",
        },
      ],
      whiteButtonsData: [
        {
          label: "完了",
          id: 0,
        },
        {
          label: "キャンセル",
          id: 1,
        },
      ],
    };
  },
  methods: {
    changeMixerValue(value: String, key: number): void {
      (this as any).mixerFormData[key - 1].value = value;
    },
    changeSingerValue(value: String, key: number): void {
      (this as any).singerFormData[key - 1].value = value;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.page {
  display: grid;
  background-color: $-primary-300;
  grid-template-columns: (120px 1fr 120px);
  grid-column-gap: 24px;
  grid-auto-columns: 100px;
  padding: 16px;
  overflow-y: scroll;
}

.icon {
  justify-content: center; /* アイテムを中央に寄せる */
  align-items: center; /* アイテムを中央付近にまとめる */
  &-content {
    margin: 0px 20px 20px 0px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: silver;
    position: sticky;
    top: 0;
  }
}

.done-back-button {
  height: 200px;
  padding: 0px 60px 0px 0px;
  position: sticky;
  top: 0;
}
</style>