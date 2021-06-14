<template>
  <div :class="['user-tab', setClassSelected]" @click="clickTab">
    <div class="icon">
      <UserIcon />
    </div>
    <div class="name">{{ data.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import UserIcon from "@/components/atoms/UserIcon.vue";
import { profileDataType } from "@/store/exchange/models";

export default defineComponent({
  name: "UserTab",
  components: {
    UserIcon,
  },
  props: {
    data: {
      //表示されてる順番
      type: Object as PropType<profileDataType>,
      required: true,
    },
    selected: {
      //このタブのユーザーが開かれているかどうか
      type: Boolean,
      required: true,
    },
  },
  computed: {
    setClassSelected(): string {
      //選択されたタブにクラス付与
      return this.selected ? "selected" : "";
    },
  },
  methods: {
    clickTab(): void {
      this.$emit("select-client", this.data);
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
    background: $-primary-500;
    border-radius: 50%;
    margin: 2px 0px 0px 2px; //上下左右中央揃え用
  }

  .name {
    font-size: 32px;
    color: $-primary-500;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 4px solid $-primary-500;
    border-right: 4px solid $-primary-500;
  }

  &:hover {
    background: $-primary-300;
  }
}

.selected {
  background: $-primary-500;
}
</style>