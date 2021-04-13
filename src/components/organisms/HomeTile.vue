<template>
  <div class="home-tile" @click="showProfile">
    <div class="icon">
      <UserIcon />
    </div>
    <div class="name">
      <div class="name-content">{{ data.name }}</div>
    </div>
    <div class="detail">{{ data.detail }}</div>
    <div class="fee">{{ data.fee }}</div>
    <div class="deadline">{{ data.deadline }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";
import { ImixerData } from "@/mixins/defaultProfileData";

export { ImixerData };

export default defineComponent({
  name: "HomeTile",
  components: {
    UserIcon,
  },
  props: {
    data: {
      //1~12の表示されてる順番
      type: Object as PropType<ImixerData>,
      required: true,
    },
  },
  methods: {
    showProfile(): void {
      (this as any).$store.dispatch("exchange/setClientProfile", this.data.uid); //プロフィール情報取得処理
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.home-tile {
  min-width: 320px;
  max-width: 400px;
  height: 280px;
  background-color: $-primary-200;
  display: grid;
  grid-template:
    "icon   name   name   name  " 64px
    "detail detail detail detail" 1fr
    "fee    fee    line   line  " 48px
    / 64px 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
  border: 2px solid gray;
  box-shadow: 2px 2px 8px $-primary-800;
  margin: 0 auto; //左右中央揃え用
  padding: 8px;
  cursor: pointer;

  .icon {
    grid-area: icon;
    display: flex;
    justify-content: center;
    align-items: center;
    background: silver;
    border-radius: 50%;
  }
  .name {
    grid-area: name;
    &-content {
      width: 100%;
      height: 100%;
      font-size: 32px;
      color: $-primary-100;
      background: $-primary-500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .detail {
    grid-area: detail;
    color: $-primary-100;
    background: $-primary-500;
    border-bottom: 2px dashed silver;
  }
  .fee {
    grid-area: fee;
    color: $-primary-100;
    background: $-primary-500;
  }
  .deadline {
    grid-area: line;
    color: $-primary-100;
    background: $-primary-500;
  }
}
</style>