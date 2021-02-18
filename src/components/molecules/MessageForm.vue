<template>
  <div class="message-form">
      <TextField
        label="メッセージ"
        :value="message"
        @change-message="changeMessage"
      />
      <CommonButton label="送信"/>
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
    message: String, //メッセージの値
  },
  methods: {
    changeMessage(value: String, id: Number) {
      this.$emit("change-value", value, id);
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