<template>
  <div class="white-button">
    <div class="white-button-set" 
      v-for="list in data" 
      :key="list.id"
      >
      <CommonButtonWhite :label="list.label" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";

export type ButtonsSetType = {
  label: string; //ボタンの名前
  id: number; //ボタンのid
};

export default defineComponent({
  name: "WhiteButtonsSet",
  components: {
    CommonButtonWhite,
  },
  props: {
    data: {
      type: Array as PropType<ButtonsSetType[]>, 
      //完了ボタンとキャンセルボタンのデータ
    },
  },
});
</script>

<style lang="scss" scoped>
.white-button {
  padding: 80px 60px 0px 60px;
  &-set:first-child{ //v-forしてる最初の要素
    padding-bottom: 16px;
  }
}
</style>