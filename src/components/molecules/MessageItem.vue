<template>
  <div :class="['message-item', setClassSelfOwned]">
    <div class="user-icon"></div>
    <div class="message-body">{{ id }}{{ content }}</div>
    <div class="empty"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";

export default defineComponent({
  name: "MessageItem",
  components:{
    UserIcon,
  },
  props: {
    id: {
      //表示されてる順番
      type: Number,
      required: true,
    },
    sender: {
      //メッセージを書いた人
      type: String,
      required: true,
      validator: (value: string) => {
        //プロパティの値は、必ずいずれかの文字列でなければならない
        return ["self", "client"].indexOf(value) !== -1;
      },
    },
    content: {
      //メッセージの内容
      type: String,
      required: true,
    },
  },
  computed: {
    setClassSelfOwned(): string {
      //書いた人が自分なら真
      return this.sender === "self" ? "self-owned" : "";
    },
  },
});
</script>

<style lang="scss" scoped>
.message-item {
  width: 100%;
  height:auto;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  column-gap: 8px;
  margin: 16px 0px;
  .user-icon {
    width: 44px;
    height: 44px;
    background: silver;
    border-radius: 50%;
    margin: 2px 0px 0px 2px; //上下左右中央揃え用
  }

  .message-body {
    border-radius: 0px 22px 22px 22px;
    border: 2px solid silver;
    padding: 8px;
    white-space: pre-line; //\nがあると改行
  }
}

.self-owned {
  //順番入れ替えでアイコンを右側に
  .user-icon {
    order: 3;
  }

  .message-body {
    order: 2;
    border-radius: 22px 0px 22px 22px !important;
  }

  .empty {
    order: 1;
  }
}
</style>