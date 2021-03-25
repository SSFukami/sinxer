<template>
  <div class="page">
    <div class="icon">
      <div class="icon-content">
        <UserIcon />
      </div>
    </div>
    <div class="page-contents" v-if="$store.state.auth.mixerState === true">
      <!-- {{formData}} -->
      <div class="data" v-for="(data, index) in singerData" :key="index">
        <div class="data-label">{{ data.label }}</div>
        <div class="data-value">
          {{ data.id }}
        </div>
      </div>
    </div>

    <div class="page-contents" v-if="$store.state.auth.singerState === true">
      <EditForm :formData="singerFormData" @change-value="changeSingerValue" />
    </div>

    <div v-if="$store.state.auth.singerState === true">
      <div class="done-back-button">
        <WhiteButtonsSet :data="whiteButtonsData.label" />
      </div>
    </div>

    <div v-if="$store.state.auth.mixerState === true">
      <div class="done-back-button">
        <router-link to="/">
          <CommonButtonWhite :label="BackButtonData" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";
import WhiteButtonsSet, {
  ButtonsSetType as IButtonsData,
} from "@/components/molecules/WhiteButtonsSet.vue";
import UserIcon from "@/components/atoms/UserIcon.vue";

type IProfileData = {
  //IProfileDataが型名
  id: number;
  label: string;
  value: string;
};

type IBackButtonData = {
  label: string; //ボタンの名前
};

type DataType = {
  whiteButtonsData: IButtonsData[];
  singerData: IProfileData[];
  mixerData: IProfileData[];
  BackButtonData: IBackButtonData;
};

export default defineComponent({
  name: "Profile",
  components: {
    CommonButtonWhite,
    WhiteButtonsSet,
    UserIcon,
  },
  data(): DataType {
    return {
      singerData: [
        {
          id: 0,
          label: "名前",
          value: "",
        },
        {
          id: 1,
          label: "自己紹介",
          value: "",
        },
        {
          id: 2,
          label: "Twitter",
          value: "",
        },
        {
          id: 3,
          label: "投稿先URL",
          value: "",
        },
      ],
      mixerData: [
        {
          id: 0,
          label: "名前",
          value: "",
        },
        {
          id: 1,
          label: "自己紹介",
          value: "",
        },
        {
          id: 2,
          label: "Twitter",
          value: "",
        },
        {
          id: 3,
          label: "料金",
          value: "",
        },
        {
          id: 4,
          label: "納期",
          value: "",
        },
      ],
      whiteButtonsData: [
        {
          label: "依頼する",
          id: 0,
        },
        {
          label: "キャンセル",
          id: 1,
        },
      ],
      BackButtonData: 
        {
          label: "戻る",
        },
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

.data {
  &-label {
    height: 24px;
    padding: 8px;
  }
  &-value {
    font-size: 20px;
    width: 100%;
    height: auto;
    color: $-primary-800;
    background: $-primary-200;
    border: none;
    margin: 8px;
  }
}

.done-back-button {
  height: 200px;
  padding: 0px 60px 0px 0px;
  position: sticky;
  top: 0;
}
</style>