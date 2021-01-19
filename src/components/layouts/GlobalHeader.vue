<template>
  <div class="global-header">
    <div class="global-header-left">
      <div class="global-header-left-icon">
        <img :src="require(`@/assets/list.svg`)" />
      </div>
      <HeaderLogo />
    </div>
    <div class="two-button">
      <LoginForm
      v-for="item in buttonList"
      :key="item.id"
      :itemData="item"
       />
       
    </div>
  </div>
</template>

<script lang="ts">
import HeaderLogo from "@/components/atoms/HeaderLogo.vue";
import LoginForm from "@/components/organisms/LoginForm.vue";

export default {
  name: "GlobalHeader",
  components: {
    HeaderLogo,
    LoginForm
  },
  data(){
    return {
      buttonList:[
        {
          id:0,
          label:"新規登録",
        },
        {
          id:1,
          label:"ログイン",
        },
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
.global-header {
  position: fixed;
  top:0;
  right:0;
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
.two-button {
    color: white;
    display: flex;
  }
</style>