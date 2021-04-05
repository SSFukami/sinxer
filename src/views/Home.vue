<template>
    <div class="page">
      <div class="page-wrapper">
        <div class="home-header">
          <SearchForm
            :searchWord="searchWord"
            @change-value="changeSearchWord"
          />
          <!-- {{searchList}} -->
        </div>
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
import SearchForm from "@/components/molecules/SearchForm.vue";
import HomeTile from "@/components/organisms/HomeTile.vue";

type DataType = {
  searchWord: string;
  showMixersDetail: Boolean;
};

export default defineComponent({
  name: "Home",
  components: {
    TextField,
    CommonButton,
    SearchForm,
    HomeTile,
  },
  data(): DataType {
    return {
      searchWord: "", //検索ボックスに入力した文字列
      showMixersDetail: false,
    };
  },
  methods: {
    changeSearchWord(value: string) {
      //検索ワードの変更
      this.searchWord = value;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.page {
  &-wrapper {
    background-color: $-primary-400;
    .home-header {
      width: 50%;
      min-width: 320px;
      height: 48px;
      margin: 0 auto; //左右中央揃え用
      padding-top: 8px; //上下中央揃え用
    }
  }

  .home-content {
    width: 100%;
    height: calc(100% - 48px); //home-headerの分引く
    background-color: $-primary-300;
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    column-gap: 20px;
    row-gap: 20px;
    overflow-y: scroll;
  }
}
</style>