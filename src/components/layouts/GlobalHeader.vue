<template>
  <div class="global-header">
    <div class="global-header-left">
      <div class="global-header-left-icon" @click="openAside">
        <img :src="require(`@/assets/list.svg`)" />
      </div>
      <HeaderLogo />
    </div>
    <div class="auth-button">
      <button class="sign-up">新規登録</button>
      <button class="login">ログイン</button>
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
    openAside(): void {
      (this as any).$store.dispatch("common/openAside");
    },
  },
});
</script>

<style lang="scss" scoped>
.global-header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background: chocolate;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 8px;
  &-left {
    &-icon {
      padding: 6px 16px 0px 0px;
    }
    display: flex;
  }
}
.auth-button {
  display: flex;
  button.sign-up {
    color: white;
    background-color: chocolate;
    display: flex;
    border: none;
  }
  button.login {
    color: white;
    background-color: chocolate;
    display: flex;
    border: none;
  }
}
</style>