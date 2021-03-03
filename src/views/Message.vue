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
        <UserTab v-for="n in numberOfClient" :key="n" :id="n" />
      </div>
    </div>
    <div class="message-content">
      <div class="message-content-log">
        <MessageItem
          v-for="(item, index) in chatDataList"
          :key="index"
          :id="index"
          :sender="item.sender"
          :content="item.content"
        />
      </div>
      <div class="message-content-footer">
        <div class="message-content-footer-details">
          <!-- <TextField
          :value="message"
          label="メッセージ"
          @change-value="changeMessage"
        />
        <CommonButton label="送信" /> -->
          <MessageForm :message="message" @change-value="changeMessage" />
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

interface IchatDataList {
  sender: string;
  content: string;
}

export type DataType = {
  //TypeScriptの型宣言
  searchWord: string;
  message: string;
  numberOfClient: number;
  chatDataList: IchatDataList[];
  // messageList: Object,
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
      message: "", //チャットのメッサージ

      numberOfClient: 10, //試験的なチャット相手の個数
      chatDataList: [
        {
          sender: "self",
          content: "コメント1行目\n2行目\n3行目\n4行目\n5行目",
        },
        {
          sender: "client",
          content: "コメント1行目\n2行目\n3行目\n4行目\n5行目",
        },
        {
          sender: "self",
          content: "コメント1行目\n2行目\n3行目\n4行目\n5行目",
        },
        {
          sender: "client",
          content: "コメント1行目\n2行目\n3行目\n4行目\n5行目",
        },
      ],
    };
  },
  methods: {
    changeSearchWord(value: string, key: number) {
      //検索ワードの変更
      this.searchWord = value;
    },
    changeMessage(value: string, key: number) {
      //メッセージの変更
      this.message = value;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.page {
  background-color: $-primary-300;
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
      background: $-primary-300;
      overflow-y: scroll;
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