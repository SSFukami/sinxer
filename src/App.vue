<template>
  <div class="app">
    <div class="app-wrapper">
      <GlobalHeader />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GlobalHeader from "@/components/layouts/GlobalHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
html,
body,
#app,
.app {
  height: 100%;
  width: 100%;
  margin: 0;
  .app-wrapper {
    height: 100%;
    width: 100%;
    .app-content {
      display: flex;
      height: calc(100% - 72px);
      position: relative;
      top: 72px;
      .page {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        flex: 1;
      }
    }
  }
}
</style>