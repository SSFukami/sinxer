<template>
  <div class="page">
    <div class="message-aside">
      <div class="message-aside-header">
        <TextFieldWhite
          :value="searchWord"
          label="アカウント検索"
          @change-value="changeSearchWord"
        />
      </div>
      <div class="message-aside-list">
        <UserTab
          v-for="(data, index) in filteredClientList"
          :key="index"
          :data="data"
          :selected="data.uid === selectedUid"
          :icon="iconList[index]"
          @select-client="selectClient"
          @show-profile="showProfile"
        />
      </div>
    </div>
    <div class="message-content">
      <div class="message-content-log" v-if="filteredClientList.length !== 0">
        <MessageItem
          v-for="(item, index) in messageDataList"
          :key="index"
          :senderId="item.uid"
          :content="item.content"
          :clientId="selectedUid"
          @show-profile="showProfile"
        />
      </div>
      <div class="message-content-nobody" v-else>まだ話し相手がいません</div>
      <div class="message-content-footer">
        <div class="message-content-footer-details">
          <MessageForm
            :message="message"
            @change-value="changeMessage"
            @send-message="sendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextFieldWhite from "@/components/atoms/TextFieldWhite.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import UserTab from "@/components/molecules/UserTab.vue";
import MessageItem from "@/components/molecules/MessageItem.vue";
import MessageForm from "@/components/molecules/MessageForm.vue";

import { messageDataType, profileDataType } from "@/store/exchange/models";

type DataType = {
  //TypeScriptの型宣言
  searchWord: string;
  message: string;
};

export default defineComponent({
  name: "Message",
  components: {
    TextFieldWhite,
    CommonButton,
    UserTab,
    MessageItem,
    MessageForm,
  },
  data(): DataType {
    return {
      searchWord: "", //検索ボックスに入力した文字列
      message: "", //チャットのメッセージ
    };
  },
  created() {
    (this as any).$store.dispatch("exchange/setClientList"); //チャット相手のリストを取得
  },
  unmounted() {
    (this as any).$store.dispatch("exchange/stopMessageListener"); //リスナーを停止
    (this as any).$store.commit("exchange/setSelectedUid", ""); //相手未選択状態に
    (this as any).$store.commit("exchange/setMessageList", []); //チャット内容初期化
  },
  watch: {
    selectedUid: async function (newValue: string) {
      await (this as any).$store.dispatch("exchange/stopMessageListener"); //前回までのリスナーを停止
      if (newValue !== "") {
        //相手が選択された場合
        (this as any).$store.dispatch(
          "exchange/startMessageListener",
          newValue
        ); //今回の相手とのメッセージデータをリスナー
      }
    },
  },
  computed: {
    filteredClientList(): profileDataType[] {
      //検索後のチャット相手のリスト
      const clientList = (this as any).$store.state.exchange.clientList; //チャット相手のリスト
      const word = this.searchWord;
      const filteredList = clientList.filter((client: profileDataType) => {
        const result: number = client.name.indexOf(word); //ワードが一致した最初のインデックス
        return result !== -1;
      });

      return filteredList;
    },
    selectedUid(): profileDataType[] {
      //チャット相手のユーザーID
      return (this as any).$store.state.exchange.selectedUid;
    },
    messageDataList(): messageDataType[] {
      //チャット相手とのコメントリスト
      return (this as any).$store.state.exchange.messageList;
    },
    iconList(): string[] {
      //ユーザータブに表示するMix師のアイコンのリスト
      return (this as any).$store.state.trimming.iconList;
    },
  },
  methods: {
    changeSearchWord(value: string): void {
      //検索ワードの変更
      this.searchWord = value;
    },
    changeMessage(value: string): void {
      //メッセージの変更
      this.message = value;
    },
    selectClient(data: profileDataType): void {
      //ユーザータブをクリック時の処理
      (this as any).$store.commit("exchange/setSelectedUid", data.uid); //どの相手を選択したかvuexに保存
      (this as any).$store.dispatch("exchange/setMessageData", data.uid); //選択した相手とのチャット内容をdbから取得
      (this as any).$store.dispatch("trimming/searchClientIcon", data.uid); //話し相手のアイコン取得
    },
    showProfile(clientUid: string, icon: string): void {
      //アイコンクリック時、プロフィール表示
      const isSinger: boolean = (this as any).$store.state.auth.singerState;
      if (!isSinger) {
        //mix師なら
        (this as any).$store.commit("exchange/setIsShowingSinger", true); //歌い手のプロフィールを出せるように変更
      }

      (this as any).$store.commit("trimming/setProfileIcon", icon); //プロフィール画面で出すアイコン
      (this as any).$store.dispatch("exchange/setClientProfile", clientUid); //プロフィール情報取得後、プロフィール画面へ
    },
    sendMessage(): void {
      //メッセージをdbに送信する処理
      (this as any).$store.dispatch("exchange/sendMessage", this.message);
      this.message = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  background-color: $-primary-300;
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 3fr;
  column-gap: 8px;
  padding: 8px;
  .message-aside {
    border-right: 1px solid $-primary-800;
    overflow-y: hidden;
    &-header {
      width: 80%;
      height: 40px;
      margin: 0 auto; //左右中央揃え用
      padding-top: 4px; //上下中央揃え用
    }

    &-list {
      width: 100%;
      height: calc(100% - 40px); //message-headerの分引く
      padding-right: 8px;
      overflow-y: scroll;
    }
  }

  .message-content {
    display: grid;
    grid-template-rows: 1fr 48px;
    overflow-y: hidden;
    &-log {
      height: 100%;
      overflow-y: scroll;
    }
    &-nobody {
      height: 100%;
      color: $-primary-800;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-footer {
      border-top: 1px solid $-primary-800;
      &-details {
        width: 90%;
        margin: 0 auto; //左右中央揃え用
        padding-top: 8px; //上下中央揃え用
      }
    }
  }
}
</style>