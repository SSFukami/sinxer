<template>
  <div class="page">
    <div class="home-header">
      <TextField :value="searchWord" label="検索ボックス" @change-value="changeSearchWord" />
      <CommonButton label="検索" />
    </div>
    <div class="home-content">
      <HomeTile v-for="n in 12" :key="n" :id="n" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import HomeTile from "@/components/organisms/HomeTile.vue";

export default defineComponent({
  name: "Home",
  components: {
    TextField,
    CommonButton,
    HomeTile,
  },
  data() {
    return {
      searchWord: "", //検索ボックスに入力した文字列
    };
  },
  methods: {
    changeSearchWord(value: string, key: number) { //検索ワードの変更
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
    min-width: 320px;
    height: 64px;
    display: grid;
    grid-template-columns: 1fr 48px;
    column-gap: 16px;
    margin: 0 auto; //左右中央揃え用
    padding-top: 16px; //上下中央揃え用
  }

  .home-content {
    width: 100%;
    height: calc(100% - 70px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    column-gap: 20px;
    row-gap: 20px;
    overflow-y: scroll;
  }
}
</style>