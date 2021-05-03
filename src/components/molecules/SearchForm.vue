<template>
  <div class="search-form">
    <TextFieldWhite
      label=" 検索ボックス"
      :value="searchWord"
      @change-value="changeValue"
    />
    <CommonButton label="検索" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextFieldWhite from "@/components/atoms/TextFieldWhite.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "SearchForm",
  components: {
    TextFieldWhite,
    CommonButton,
  },
  props: {
    searchWord: {//検索ワード
      type: String,
      required: true,
    },
  },
  methods: {
    changeValue(value: string, key: number) {
      this.$emit("change-value", value);
    },
  },
});
</script>

<style lang="scss">
.search-form {
  height: 32px;
  display: grid;
  grid-template-columns: 1fr 48px;
  column-gap: 16px;
}
</style>