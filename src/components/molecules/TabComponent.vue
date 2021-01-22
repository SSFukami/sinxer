<template>
  <div class="tab-component">
    <div
    class="tab"
    v-for="tab in list"
    :key="tab.id">
    {{tab.label}}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TabComponent",
  props:{
    list:Array,
  }
};

</script>

<style lang="scss">
</style>