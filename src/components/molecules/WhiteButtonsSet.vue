<template>
  <div class="button-white">
    <div class="button-white-done">
      <CommonButtonWhite :label="form[0].label" :id="form[0].id" />
    </div>
    <div class="button-white-cancel">
      <CommonButtonWhite :label="form[1].label" :id="form[1].id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";

export type ButtonsSetType = {
  label: string;
  id: number;
};

export default defineComponent({
  name: "WhiteButtonsSet",
  components: {
    CommonButtonWhite,
  },
  props: {
    form: Array, //ボタンのデータ
  },
});
</script>

<style lang="scss" scoped>
.button-white{
  padding: 80px 60px 0px 60px;
  &-done{
    padding-bottom:16px;
  }
}
</style>