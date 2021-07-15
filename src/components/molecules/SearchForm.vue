<template>
  <div class="search-form">
    <component
      :is="formData.formType"
      label=" 検索ボックス"
      :value="searchWord"
      :option="formData.option"
      @change-value="changeValue"
    />
    <CommonButton label="検索" @click-event="searchMixer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TextFieldWhite from "@/components/atoms/TextFieldWhite.vue";
import NumberField from "@/components/atoms/NumberField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import { IselectBoxList } from "@/mixins/selectBoxList";

export default defineComponent({
  name: "SearchForm",
  components: {
    TextFieldWhite,
    NumberField,
    CommonButton,
  },
  props: {
    searchWord: {
      //検索ワード
      type: [String, Number],
      required: true,
    },
    formData: {
      //検索ボックスの種類
      type: Object as PropType<IselectBoxList>,
      required: true,
    },
  },
  methods: {
    changeValue(value: string | number, key: number) {
      //検索ワードを文字列にして変更
      this.$emit("change-value", value);
    },
    searchMixer(): void {
      this.$emit("search-mixer");
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