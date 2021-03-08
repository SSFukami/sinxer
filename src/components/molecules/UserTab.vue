<template>
  <div class="user-tab">
    <div class="icon">
      <UserIcon />
    </div>
    <div class="name">user{{ id }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";

export default defineComponent({
  name: "UserTab",
  components: {
    UserIcon,
  },
  props: {
    id: {
      //表示されてる順番
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.user-tab {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: 52px 1fr;
  column-gap: 16px;
  margin: 16px 0px;
  cursor: pointer;
  .icon {
    width: 52px;
    height: 52px;
    background: silver;
    border-radius: 50%;
    margin: 2px 0px 0px 2px; //上下左右中央揃え用
  }

  .name {
    font-size: 32px;
    color: silver;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 4px solid silver;
    border-right: 4px solid silver;
  }

  &:hover {
    background: $-primary-200;
  }
}
</style>