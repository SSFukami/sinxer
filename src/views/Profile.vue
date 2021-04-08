<template>
  <div class="page">
    <div class="icon">
      <div class="icon-content">
        <UserIcon />
      </div>
    </div>
    <div class="page-contents" v-if="isClientSinger">
      <div class="profile" v-for="(data, index) in singerList" :key="index">
        <div class="profile-label">{{ data.label }}</div>
        <div class="profile-value">
          {{ data.value }}
        </div>
      </div>
    </div>
    <div class="page-contents" v-else>
      <div class="profile" v-for="(data, index) in mixerList" :key="index">
        <div class="profile-label">{{ data.label }}</div>
        <div class="profile-value">
          {{ data.value }}
        </div>
      </div>
    </div>
    <div class="done-back-button" v-if="isSinger">
      <WhiteButtonsSet :data="whiteButtonsList" @click-event="clickButton" />
    </div>
    <div class="done-back-button" v-else>
      <CommonButtonWhite :label="backButtonLabel" @click-event="transBack" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationNormalized } from "vue-router";

import UserIcon from "@/components/atoms/UserIcon.vue";
import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";
import WhiteButtonsSet, {
  ButtonsSetType as IbuttonsList,
} from "@/components/molecules/WhiteButtonsSet.vue";

import {
  DEFAULT_MIXER_DATA,
  DEFAULT_SINGER_DATA,
  IsingerData,
  ImixerData,
} from "@/mixins/defaultProfileData";

type IprofileData = {
  //IprofileDataが型名
  id: number;
  label: string;
  value: string;
};

type DataType = {
  whiteButtonsList: IbuttonsList[];
  singerList: IprofileData[];
  mixerList: IprofileData[];
  backButtonLabel: string;
  prevRoute: RouteLocationNormalized | undefined;
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
      singerList: [
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
      mixerList: [
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
      whiteButtonsList: [
        {
          label: "依頼する",
          id: 0,
        },
        {
          label: "キャンセル",
          id: 1,
        },
      ],
      backButtonLabel: "戻る",

      prevRoute: undefined, //前回のルート情報(初期はundefined)
    };
  },
  created() {
    this.setClientData(); //初期はvuexの情報を表示
  },
  computed: {
    isSinger(): boolean {
      //歌い手としてログインしているならtrue
      return (this as any).$store.state.auth.singerState;
    },
    isClientSinger(): boolean {
      //歌い手のプロフィールの場合true
      return (this as any).$store.state.exchange.isClientSinger;
    },
  },
  methods: {
    setClientData(): void {
      //配列にvuexのプロフィール情報を入れる
      const clientProfile = (this as any).$store.state.exchange
        .clientProfileData; //ユーザー自身のプロフィール情報
      if (this.isClientSinger) {
        const defaultData: IsingerData = DEFAULT_SINGER_DATA; //歌い手のデータのキー取得用
        for (let i in this.singerList) {
          const keyName: string = Object.keys(defaultData)[i];
          this.singerList[i].value = clientProfile[keyName];
        }
      } else {
        const defaultData: ImixerData = DEFAULT_MIXER_DATA; //Mix師のデータのキー取得用
        for (let i in this.mixerList) {
          const keyName: string = Object.keys(defaultData)[i];
          this.mixerList[i].value = clientProfile[keyName];
        }
      }
    },
    transBack(): void {
      //一つ前の画面に飛ぶ
      (this as any).$router.go(-1);
    },
    clickButton(id: number): void {
      //idで処理分岐
      if (id === 0 && this.isSinger) {
        console.log("チャット情報取得処理");
        (this as any).$router.push("/message"); //ユーザーが歌い手ならメッセージ画面へ
      } else if (id === 0) {
        alert("Mix師の方はご依頼することはできません"); //Mix師向け
      } else {
        this.transBack(); //プロフィール画面を閉じる
      }
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

.profile {
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