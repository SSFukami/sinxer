<template>
  <div class="message-form">
      <TextField
        label="メッセージ"
        :value="message"
        @change-value="changeMessage"
      />
      <CommonButton label="送信" @click-event="sendMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "MessageForm",
  components: {
    TextField,
    CommonButton,
  },
  props: {
    message: { //メッセージの値
      type: String,
      required: true
    },
  },
  methods: {
    changeMessage(value: string): void { //テキストフィールドの文字変更
      this.$emit("change-value", value);
    },
    sendMessage(): void {
      this.$emit("send-message"); //メッセージの送信処理
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";

.message-form {
  height: 32px;
  display: grid;
  grid-template-columns: 1fr 48px;
  column-gap: 16px;
}
</style>