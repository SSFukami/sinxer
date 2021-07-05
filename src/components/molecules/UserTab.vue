<template>
  <div :class="['user-tab', setClassSelected]" @click="clickTab">
    <div class="icon">
      <UserIcon @click="clickIcon" :icon="icon" />
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
    icon: String,
  },
  computed: {
    setClassSelected(): string {
      //選択されたタブにクラス付与
      return this.selected ? "selected" : "";
    },
  },
  methods: {
    clickTab(): void { //クリックした人とのメッセージを表示
      this.$emit("select-client", this.data);
    },
    clickIcon(): void { //クリックした人のプロフィールを表示
      this.$emit("show-profile", this.data.uid);
    },
  },
});
</script>

<style lang="scss" scoped>
.user-tab {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: 52px 1fr;
  column-gap: 16px;
  margin: 16px 0px;
  overflow: hidden;
  cursor: pointer;
  .icon {
    width: 52px;
    height: 52px;
    background: $-primary-600;
    border-radius: 50%;
    margin: 2px 0px 0px 2px; //上下左右中央揃え用
  }

  .name {
    font-size: 32px;
    color: $-primary-600;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 4px solid $-primary-600;
    border-right: 4px solid $-primary-600;
  }

  &:hover {
    background: $-primary-200;
  }
}

.selected {
  background: $-primary-200;
}
</style>