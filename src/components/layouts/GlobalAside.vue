<template>
  <div class="wrapper" :class="setClassOpen" @click.self="closeAside">
    <div class="global-aside">
      <div class="global-aside-header">
        <div class="aside-closer" @click="closeAside">
          <img src="@/assets/close-black.svg" />
        </div>
      </div>
      <div class="global-aside-content">
        <router-link
          class="aside-menu"
          v-for="(item, index) in asideMenuList"
          :key="index"
          :to="item.path"
        >
          <img :src="require(`@/assets/${item.icon}.svg`)" />
          <div class="aside-menu-label">{{ item.label }}</div>
        </router-link>
      </div>
      <div class="global-aside-footer">
        <CommonButtonWhite label="ログアウト" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";

import { ASIDE_MENU_LIST } from "@/mixins/asideMenuList";

export default defineComponent({
  name: "GlobalAside",
  components: {
    CommonButtonWhite,
  },
  data() {
    return {
      asideMenuList: ASIDE_MENU_LIST, //メニューのデータがあるリスト
    };
  },
  methods: {
    closeAside(): void {
      (this as any).$store.dispatch("common/closeAside");
    },
  },
  computed: {
    setClassOpen(): string {
      return (this as any).$store.state.common.isOpeningAside ? "open" : "";
    },
  },
});
</script>

<style lang="scss" scopped>
@import "@/assets/scss/color.scss";

.wrapper {
  z-index: -1; //通常はページの裏側
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .global-aside {
    width: 0px;
    height: 100%;
    display: grid;
    grid-template-rows: 40px 1fr 40px;
    row-gap: 24px;
    background: $-primary-700;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease;

    &-header {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .aside-closer {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
        cursor: pointer;
        img {
          transform: scale(1.6, 1.6);
          &:hover {
            border: 0.5px solid black;
          }
        }
      }
    }

    &-content {
      width: 100%;
      display: grid;
      grid-template-rows: repeat(3, 48px);
      row-gap: 16px;
      .aside-menu {
        display: grid;
        grid-template-columns: 48px 1fr;
        border-bottom: 2px solid black;
        img {
          position: relative;
          top: 13px;
          left: 13px;
          border: 1px solid black;
          background-color: $-primary-100;
          border-radius: 50%;
          padding: 2px;
          transform: scale(1.5, 1.5);
        }

        &-label {
          font-size: 22px;
          display: flex;
          background-color: $-primary-400;
          justify-content: flex-start;
          align-items: center;
          padding: 0px 4px;
          margin-right:6px;
        }
      }
    }

    &-footer {
      width: 50%;
      font-size: 18px;
      display: flex;
      justify-content: center;
      margin-left:50px;
    }
  }
}

.open {
  z-index: 2;

  .global-aside {
    width: 200px !important;
  }
}
</style>