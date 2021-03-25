<template>
  <div class="app">
    <div class="app-wrapper">
      <GlobalHeader />
      <router-view />
    </div>
    <GlobalAside />
    <Modal v-show="$store.state.modal.isOpening" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GlobalHeader from "@/components/layouts/GlobalHeader.vue";
import GlobalAside from "@/components/layouts/GlobalAside.vue";

import Modal from "@/components/organisms/Modal/index.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    GlobalAside,
    Modal,
  },
  watch: {
    $route(): void {
      (this as any).$store.dispatch("common/closeAside");
    },
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#app,
.app {
  width: 100%;
  height: 100%;
  margin: 0;

  &-wrapper {
    width: 100%;
    height: 100%;
    .page {
      width: 100%;
      height: calc(100% - 72px); //ヘッダーの分短く
      position: fixed;
      top: 70px;
    }
  }
}
</style>