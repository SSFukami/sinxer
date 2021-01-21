<template>
  <div class="app">
    <div class="app-wrapper">
      <GlobalHeader />
    </div>
    <GlobalAside />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GlobalHeader from "@/components/layouts/GlobalHeader.vue";
import GlobalAside from "@/components/layouts/GlobalAside.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    GlobalAside,
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
  width: 100%;
  height: 100%;
  margin: 0;

  &-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>