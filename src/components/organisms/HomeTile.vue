<template>
  <div class="home-tile">
    <div class="icon">
      <div class="icon-content"></div>
    </div>
    <div class="name">
      <div class="name-content">お名前{{ id }}</div>
    </div>
    <div class="detail">紹介文</div>
    <div class="fee">料金</div>
    <div class="deadline">納期</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeTile",
  props: {
    id: {
      //1~12の表示されてる順番
      type: Number,
      required: true,
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
  display: grid;
  grid-template:
    "icon   name   name   name  " 64px
    "detail detail detail detail" 1fr
    "fee    fee    line   line  " 48px
    / 1fr 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
  border: 2px solid gray;
  margin: 0 auto; //左右中央揃え用
  padding: 8px;
  cursor: pointer;

  .icon {
    grid-area: icon;
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
      width: 60px;
      height: 60px;
      background: silver;
      border-radius: 50%;
    }
  }
  .name {
    grid-area: name;
    // border-left: 4px solid silver;
    // border-right: 4px solid silver;
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