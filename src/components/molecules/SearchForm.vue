<template>
  <div class="search-form">
      <TextFieldWhite
        :label="form[0].label"
        :value="form[0].value"
        :id="form[0].id"
        @change-value="changeValue"
      />
      <CommonButton :label="form[1].label" :id="form[1].id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextFieldWhite from "@/components/atoms/TextFieldWhite.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "SearchField",
  components: {
    TextFieldWhite,
    CommonButton,
  },
  props: {
    form: Object, //検索ボックスのデータ
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