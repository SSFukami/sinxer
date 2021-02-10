<template>
  <div class="message-form">
      <TextField
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

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
export default defineComponent({
  name: "MessageForm",
  components: {
    TextField,
    CommonButton,
  },
  props: {
    form: Object, //メッセージフォームのデータ
  },
  methods: {
    changeValue(value: String, id: Number) {
      this.$emit("change-value", value, id);
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";
.message-form {
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 48px;
  column-gap: 16px;
}
</style>