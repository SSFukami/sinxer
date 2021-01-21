<template>
  <div class="page">
    <div class="home-header">
      <TextField :value="searchWord" label="検索ボックス" />
      <CommonButton label="検索" />
    </div>
    <div class="home-content">conten</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "Home",
  components: {
    TextField,
    CommonButton,
  },
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    changeValue(value: string, key: number) {
      this.searchWord = value;
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  padding: 8px;
  .home-header {
    width: 50%;
    height: 64px;
    display: grid;
    grid-template-columns: 1fr 48px;
    column-gap: 16px;
    margin: 0 auto;
    padding-top: 16px;
  }
}
</style>