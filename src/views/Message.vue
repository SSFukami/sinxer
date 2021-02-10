<template>
  <div class="page">
    <div class="message-aside">
      <div class="message-aside-header">
        <TextField
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
        <!-- <TextField
          :value="message"
          label="メッセージ"
          @change-value="changeMessage"
        />
        <CommonButton label="送信" /> -->
        <MessageForm
        :form="messageList" 
        @change-value="changeValue"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import UserTab from "@/components/molecules/UserTab.vue";
import MessageItem from "@/components/molecules/MessageItem.vue";
import MessageForm from "@/components/molecules/MessageForm.vue"

interface IchatDataList {
  sender: string;
  content: string;
}

export type DataType = {
  searchWord: string;
  message: string;
  numberOfClient: number;
  chatDataList: IchatDataList[];
};

export default defineComponent({
  name: "Message",
  components: {
    TextField,
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
      ], //試験的なチャット内容のデータ
      messageList:[
        {
          label:"メッセージ",
          value:"",
          id:"0",
        },
        {
          label:"送信",
          id:"1"
        }
      ]
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
    changeValue(value:String, id:Number):void{
      (this as any).messageList[0].value=value;
    }
  },
});
</script>

<style lang="scss" scoped>
.page {
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
    background: silver;
    overflow-y: hidden;
    &-log {
      height: 100%;
      background: white;
      overflow-y: scroll;
    }

    &-footer {
      width: 90%;
      margin: 0 auto; //左右中央揃え用
      padding-top: 8px; //上下中央揃え用
    }
  }
}
</style>