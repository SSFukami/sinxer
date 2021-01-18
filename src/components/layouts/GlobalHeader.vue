<template>
  <div class="global-header">
    <div class="global-header-left">
      <div class="global-header-left-icon">
        <img :src="require(`@/assets/list.svg`)" />
      </div>
      <HeaderLogo />
    </div>
    <div class="two-button">
      <SignUp />
      |
      <Login />
    </div>
  </div>
</template>

<script lang="ts">
import Login from "@/components/atoms/Login.vue";
import HeaderLogo from "@/components/atoms/HeaderLogo.vue";
import SignUp from "@/components/atoms/SignUp.vue";
export default {
  name: "GlobalHeader",
  components: {
    Login,
    HeaderLogo,
    SignUp,
  },
};
</script>

<style lang="scss" scoped>
.global-header {
  position: fixed;
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
  .two-button {
    color: white;
    display: flex;
  }
}
</style>