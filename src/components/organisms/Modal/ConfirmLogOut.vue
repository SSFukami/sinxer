<template>
  <ModalFrame size="S">
    <template v-slot:header>
      <div class="header-label">ログアウト</div>
    </template>
    <template v-slot:content>
      <div class="content-message">本当にログアウトしますか？</div>
    </template>
    <template v-slot:footerLeft>
      <div class="footer-wrapper">
        <CommonButton label="いいえ" />
      </div>
    </template>
    <template v-slot:footerRight>
      <div class="footer-wrapper">
        <CommonButton label="はい" />
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "ConfirmLogOut",
  components: {
    ModalFrame,
    CommonButton,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.header-label {
  font-size: 18px;
  font-weight: bold;
}

.content-message {
  margin:auto;
}

.footer-wrapper {
  width: 32.6%;
  text-align: center;
}
</style>