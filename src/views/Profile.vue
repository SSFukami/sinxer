<template>
  <div class="page">
    <div class="confirm-header">
      <RequestHeader @click-button="clickButton" />
    </div>
    <div class="page-contents">
      <div class="page-contents-left">
        <div class="icon">
          <UserIcon :icon="mixerCropImage" />
        </div>
      </div>
      <div class="page-contents-right" v-if="isShowingSinger">
        <div class="profile" v-for="(data, index) in singerList" :key="index">
          <div class="profile-label">{{ data.label }}</div>
          <div class="profile-value">
            {{ data.value }}
          </div>
        </div>
      </div>
      <div class="page-contents-right" v-else>
        <div class="profile" v-for="(data, index) in mixerList" :key="index">
          <div class="profile-label">{{ data.label }}</div>
          <div class="profile-value">
            {{ data.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";
import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";
import RequestHeader from "@/components/layouts/RequestHeader.vue";

type IprofileData = {
  //IprofileDataが型名
  id: number;
  keyName: string;
  label: string;
  value: string | number;
};

type DataType = {
  singerList: IprofileData[];
  mixerList: IprofileData[];
  backButtonLabel: string;
};

export default defineComponent({
  name: "Profile",
  components: {
    CommonButtonWhite,
    UserIcon,
    RequestHeader,
  },
  data(): DataType {
    return {
      singerList: [
        {
          id: 0,
          keyName: "name",
          label: "名前",
          value: "",
        },
        {
          id: 1,
          keyName: "detail",
          label: "自己紹介",
          value: "",
        },
        {
          id: 2,
          keyName: "twitter",
          label: "Twitter",
          value: "",
        },
        {
          id: 3,
          keyName: "link",
          label: "投稿先URL",
          value: "",
        },
      ],
      mixerList: [
        {
          id: 0,
          keyName: "name",
          label: "名前",
          value: "",
        },
        {
          id: 1,
          keyName: "detail",
          label: "自己紹介",
          value: "",
        },
        {
          id: 2,
          keyName: "twitter",
          label: "Twitter",
          value: "",
        },
        {
          id: 3,
          keyName: "fee",
          label: "料金",
          value: 0,
        },
        {
          id: 4,
          keyName: "deadline",
          label: "納期",
          value: 0,
        },
      ],
      backButtonLabel: "戻る",
    };
  },
  created() {
    this.setClientData(); //初期はvuexの情報を表示
  },
  unmounted() {
    (this as any).$store.commit("exchange/setIsShowingSinger", false); //mix師のプロフィールの表示に戻す
  },
  computed: {
    isSinger(): boolean {
      //歌い手としてログインしているならtrue
      return (this as any).$store.state.auth.singerState;
    },
    isShowingSinger(): boolean {
      //歌い手のプロフィールの場合true
      return (this as any).$store.state.exchange.isShowingSinger;
    },
    mixerCropImage(): string {
      return (this as any).$store.state.trimming.mixerCropImage;
    },
  },
  methods: {
    setClientData(): void {
      //配列にvuexのプロフィール情報を入れる
      const clientProfile = (this as any).$store.state.exchange
        .clientProfileData; //閲覧するプロフィール情報
      if (this.isShowingSinger) {
        for (let i in this.singerList) {
          const keyName: string = this.singerList[i].keyName;
          this.singerList[i].value = clientProfile[keyName]; //情報をリストのvalueキーに代入
        }
      } else {
        for (let i in this.mixerList) {
          const keyName: string = this.mixerList[i].keyName;
          this.mixerList[i].value = clientProfile[keyName]; //情報をリストのvalueキーに代入

          if (keyName === "fee") {
            this.mixerList[i].value = this.mixerList[i].value + " 円"; //料金の最後に"円"追加
          } else if (keyName === "deadline") {
            this.mixerList[i].value = this.mixerList[i].value + " 日以内"; //期限の最後に"日以内"追加
          }
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
        const clientProfile = (this as any).$store.state.exchange
          .clientProfileData; //閲覧中のプロフィール情報
        (this as any).$store.dispatch("exchange/startMessage", clientProfile); //チャット相手に登録する処理
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
.page {
  background-color: $-primary-300;
  &-contents {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    margin: 0 auto;
    padding: 24px;
    overflow-y: scroll;
    &-left {
      width: 40%;
      display: flex;
      justify-content: flex-end;
      padding-right: 10%;

      .icon {
        width: 120px;
        height: 120px;
        position: sticky;
        top: 0px;
      }
    }

    &-right {
      max-width: 600px;
      flex: 1;

      .profile {
        &-label {
          font-size: 20px;
          text-decoration: underline;
        }
        &-value {
          font-size: 26px;
          height: auto;
          color: $-primary-800;
          padding: 20px 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 380px) {
  //スマホ用の描写
  .page-contents {
    padding: 24px 12px;

    &-left {
      width: 100px;
      justify-content: center;
      padding-right: 0px;
      flex: left;

      .icon {
        width: 80px;
        height: 80px;
      }
    }

    &-right {
      .profile {
        &-value {
          padding-right: 0px !important;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) and (min-width: 380px) {
  //タブレット用の描写
  .page-contents {
    &-left {
      width: 34%;
      justify-content: center;
      padding-right: 0px;

      .icon {
        width: 100px;
        height: 100px;
      }
    }

    &-right {
      .profile {
        &-value {
          padding-right: 0px !important;
        }
      }
    }
  }
}
</style>