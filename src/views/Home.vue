<template>
  <div class="page">
    <div class="page-wrapper">
      <div class="home-header">
        <SelectBox
          :value="searchTypeId"
          :data="searchTypeList"
          @change-value="changeSearchType"
        />
        <SearchForm
          :searchWord="searchWord"
          :formData="searchTypeList[searchTypeId]"
          @change-value="changeSearchWord"
          @search-mixer="searchMixer"
        />
      </div>
    </div>
    <div class="home-content">
      <HomeTile
        v-for="(data, index) in homeMixerList"
        :key="index"
        :data="data"
        :icon="iconList[index]"
        @click="setMixerIcon(iconList[index])"
      />
      <div class="invisible" v-show="homeMixerList.length % 2 != 0"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SelectBox from "@/components/atoms/SelectBox.vue";
import SearchForm from "@/components/molecules/SearchForm.vue";
import HomeTile, { ImixerData } from "@/components/organisms/HomeTile.vue";

import { HOME_SEARCH_TYPE_LIST, IselectBoxList } from "@/mixins/selectBoxList";

type DataType = {
  searchTypeList: IselectBoxList[];
};

export default defineComponent({
  name: "Home",
  components: {
    SelectBox,
    SearchForm,
    HomeTile,
  },
  data(): DataType {
    return {
      searchTypeList: HOME_SEARCH_TYPE_LIST, //セレクトボックスのデータリスト
    };
  },
  created() {
    (this as any).$store.dispatch("exchange/setHomeTile"); //mix師12人の情報取得
  },
  computed: {
    searchWord(): string {
      //検索ボックスに入力した文字列
      return (this as any).$store.state.common.searchWord;
    },
    searchTypeId(): string {
      //検索モードのID(0~4)
      return (this as any).$store.state.common.searchTypeId;
    },
    homeMixerList(): ImixerData[] {
      //ホームに表示するMix師のリスト
      return (this as any).$store.state.exchange.homeMixerList;
    },
    iconList(): string[] {
      //ホームに表示するMix師のアイコンのリスト
      return (this as any).$store.state.trimming.iconList;
    },
  },
  methods: {
    changeSearchWord(value: string | number) {
      //検索ワードの変更
      (this as any).$store.commit("common/setSearchWord", value);
    },
    changeSearchType(value: number): void {
      //検索モードの変更
      (this as any).$store.dispatch("common/changeSearchType", value);
    },
    searchMixer(): void {
      //検索処理
      (this as any).$store.dispatch("exchange/searchMixer");
    },
    setMixerIcon(url: string) {
      //HomeTileに表示してあるアイコンをProfile画面にセット
      (this as any).$store.commit("trimming/setProfileIcon", url);
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  &-wrapper {
    //背景をつけるためのdivクラス
    background-color: $-primary-400;
    .home-header {
      width: 50%;
      min-width: 568px;
      height: 48px;
      display: flex;
      margin: 0 auto; //左右中央揃え用
      padding-top: 8px; //上下中央揃え用

      select {
        width: 244px;
      }
      .search-form {
        flex: 1;
        margin-left: 16px;
      }
    }
  }

  .home-content {
    width: 100%;
    height: calc(100% - 48px); //home-headerの分引く
    background-color: $-primary-300;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    column-gap: 20px;
    row-gap: 20px;
    overflow-y: scroll;
  }
  .home-content::after {
    //画面下の空白のための文字列
    content: "要素の直後にコンテンツを追加";
    width: 100%;
    height: 25px;
    visibility: hidden;
  }
  .invisible {
    visibility: hidden;
    height: 20px;
  }
}

@media screen and (max-width: 760px) {
  //狭い場合、ホームヘッダーを２段に
  .page-wrapper {
    padding: 0px 50px;
    .home-header {
      width: 60%;
      height: 88px;
      min-width: 320px;
      flex-direction: column;

      .search-form {
        margin-top: 8px;
        margin-left: 0px;
      }
    }
  }

  .home-content {
    height: calc(100% - 88px); //home-headerの分引く
  }
}
</style>