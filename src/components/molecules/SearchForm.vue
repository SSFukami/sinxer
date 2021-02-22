<template>
  <div class="search-form">
      <TextFieldWhite
        label="検索ボックス"
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
    searchWord: String, //検索ボックスのデータ
  },
  methods: {
    changeValue(value: String, id: Number) {
      this.$emit("change-value", value, id);
    },
  },
});
</script>

<style lang="scss">
.search-form {
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 48px;
  column-gap: 16px;
}
</style>