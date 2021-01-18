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
  components:{
    GlobalHeader,
  }
});
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

</style>