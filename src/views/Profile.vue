<template>
  <div class="page">
    <div class="confirm-header">
      <ConfirmHeader />
    </div>
    <div class="page-details">
      <div class="icon">
        <div class="icon-content">
          <UserIcon />
        </div>
      </div>
      <div class="page-contents" v-if="isShowingSinger">
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
import ConfirmHeader from "@/components/layouts/ConfirmHeader.vue";

type IprofileData = {
  //IprofileDataが型名
  id: number;
  keyName: string;
  label: string;
  value: string | number;
};

type DataType = {
  whiteButtonsList: IbuttonsList[];
  singerList: IprofileData[];
  mixerList: IprofileData[];
  backButtonLabel: string;
};

export default defineComponent({
  name: "Profile",
  components: {
    CommonButtonWhite,
    WhiteButtonsSet,
    UserIcon,
    ConfirmHeader,
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
    isShowingSinger(): boolean {
      //歌い手のプロフィールの場合true
      return (this as any).$store.state.exchange.isShowingSinger;
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
        const clientProfile = (this as any).$store.state.exchange.clientProfileData; //閲覧中のプロフィール情報
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
@import "@/assets/scss/color.scss";

.page {
  background-color: $-primary-300;
  overflow-y: scroll;
  &-details {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    overflow-y: scroll;
  }
}

.icon {
  margin: 10px 0px 10px 10px;
  &-content {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-left: 500px; //アイコン左寄せ
    background-color: $-primary-500;
  }
}

.profile {
  margin: 20px 100px 20px 0px;
  &-label {
    font-size: 20px;
    padding: 0px 12px;
  }
  &-value {
    font-size: 24px;
    height: auto;
    color: $-primary-800;
    padding-left: 24px;
  }
}

@media screen and (max-width: 768px) {
  //スマホ用の描写
  .icon {
    &-content {
      margin-left: 50px;
    }
  }
}
@media screen and (max-width: 1020px) and (min-width: 768px) {
  //タブレット用の描写
  .icon {
    &-content {
      margin-left: 200px;
    }
  }
}
</style>