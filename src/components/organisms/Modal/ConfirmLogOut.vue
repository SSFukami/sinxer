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
        <CommonButton label="いいえ" @click-event="closeModal" />
      </div>
    </template>
    <template v-slot:footerRight>
      <div class="footer-wrapper">
        <CommonButton label="はい" @click-event="signOut" />
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
  methods: {
    closeModal(): void {
      //キャンセル時はモーダル閉じる
      (this as any).$store.dispatch("modal/closeModal");
    },
    signOut(): void {
      //ログアウト処理
      (this as any).$store.dispatch("auth/signOut");
    },
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}

.content-message {
  margin: auto;
}

.footer-wrapper {
  width: 120px;
  text-align: center;
}
</style>