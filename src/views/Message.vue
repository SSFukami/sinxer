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
          v-for="(data, index) in clientList"
          :key="index"
          :data="data"
          :selected="data.uid === selectedUid"
          @select-client="selectClient"
        />
      </div>
    </div>
    <div class="message-content">
      <div class="message-content-log" v-if="clientList.length !== 0">
        <MessageItem
          v-for="(item, index) in messageDataList"
          :key="index"
          :senderId="item.uid"
          :content="item.content"
          :clientId="selectedUid"
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
    (this as any).$store.commit("exchange/setSelectedUid", ""); //チャット内容初期化
    (this as any).$store.commit("exchange/setMessageList", []); //相手未選択状態に
  },
  computed: {
    clientList(): profileDataType[] {
      //チャット相手のリスト
      return (this as any).$store.state.exchange.clientList;
    },
    selectedUid(): profileDataType[] {
      //チャット相手のユーザーID
      return (this as any).$store.state.exchange.selectedUid;
    },
    messageDataList(): messageDataType[] {
      //チャット相手とのコメントリスト
      return (this as any).$store.state.exchange.messageList;
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
@import "@/assets/scss/color.scss";

.page {
  background-color: $-primary-400;
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 3fr;
  column-gap: 8px;
  padding: 8px;
  .message-aside {
    border-right: 1px solid black;
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
      background: $-primary-400;
      overflow-y: scroll;
    }
    &-nobody {
      height: 100%;
      color: $-primary-800;
      background: $-primary-400;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-footer {
      border-top: 1px solid black;
      &-details {
        width: 90%;
        margin: 0 auto; //左右中央揃え用
        padding-top: 8px; //上下中央揃え用
      }
    }
  }
}
</style>