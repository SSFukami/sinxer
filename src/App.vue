<template>
  <div class="app">
    <div class="app-wrapper">
      <global-header />
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/layouts/GlobalHeader.vue"
export default {
  name: "App",
  components:{
    GlobalHeader,
  }
}
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

</style>