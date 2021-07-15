<template>
  <div :class="['message-item', setClassSelf]">
    <div class="user-icon">
      <UserIcon :icon="selfOrClientIcon" />
    </div>
    <div class="message-body">{{ content }}</div>
    <!-- アイコン入れ替え用の空のdiv -->
    <div class="empty"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";

export default defineComponent({
  name: "MessageItem",
  components: {
    UserIcon,
  },
  props: {
    senderId: {
      //メッセージを書いた人のuid
      type: String,
      required: true,
    },
    content: {
      //メッセージの内容
      type: String,
      required: true,
    },
    clientId: {
      //話し相手のuid
      type: String,
      required: true,
    },
  },
  computed: {
    setClassSelf(): string {
      //書いた人が自分ならクラス付与
      return this.senderId !== this.clientId ? "self" : "";
    },
    selfIcon(): string {
      return (this as any).$store.state.trimming.selfIcon;
    },
    clientIcon(): string {
      return (this as any).$store.state.trimming.clientIcon;
    },
    selfOrClientIcon(): string {
      return this.senderId !== this.clientId ? this.selfIcon : this.clientIcon;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.message-item {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  column-gap: 8px;
  margin: 16px 0px;
  .user-icon {
    width: 44px;
    height: 44px;
    background: $-primary-600;
    border-radius: 50%;
    margin: 2px 0px 0px 2px; //上下左右中央揃え用
  }

  .message-body {
    border-radius: 0px 22px 22px 22px;
    border: 2px solid $-primary-600;
    padding: 8px;
    white-space: pre-line; //\nがあると改行
  }
}

.self {
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