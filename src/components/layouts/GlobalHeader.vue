<template>
  <div class="global-header">
    <div class="global-header-left">
      <div class="global-header-left-icon" @click="openAside">
        <img :src="require(`@/assets/list-white.svg`)" />
      </div>
      <HeaderLogo />
    </div>
    <div class="auth-button">
      <button class="sign-up" @click="setModal('新規登録')">新規登録</button>
      <button class="login" @click="setModal('ログイン')">ログイン</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderLogo from "@/components/atoms/HeaderLogo.vue";

export default defineComponent({
  name: "GlobalHeader",
  components: {
    HeaderLogo,
  },
  methods: {
    openAside(): void { //サイドバーを開く処理
      (this as any).$store.dispatch("common/openAside");
    },
    setModal(label: string): void { //ログインモーダルを開く処理
      (this as any).$store.commit("common/setLogInLabel", label); //新規登録かログインかを変更
      (this as any).$store.dispatch("modal/setModal", "LogInForm"); //モーダル開く
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.global-header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 72px;
  background: $-primary-700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 8px;

  &-left {
    display: grid;
    grid-template-columns: 36px auto;
    column-gap: 8px;
    &-icon {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        transform: scale(1.5, 1.5);
        &:hover {
          border: 0.5px solid $-primary-100;
        }
      }
    }
  }
}
.auth-button {
  display: flex;
  button.sign-up {
    color: $-primary-100;
    background-color: $-primary-700;
    display: flex;
    border: none;
    border-right: 1px solid $-primary-100;
    cursor: pointer;
  }
  button.login {
    color: $-primary-100;
    background-color: $-primary-700;
    display: flex;
    border: none;
    cursor: pointer;
  }
}
</style>