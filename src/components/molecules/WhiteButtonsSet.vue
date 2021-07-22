<template>
  <div class="white-button">
    <div class="white-button-set" v-for="list in data" :key="list.id">
      <CommonButtonWhite
        :label="list.label"
        @click-event="clickButton(list.id)"
      />
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
      //完了ボタンとキャンセルボタンのデータ
      type: Array as PropType<ButtonsSetType[]>,
      required: true,
    },
  },
  methods: {
    clickButton(id: number): void {
      //idでボタンの種類判別
      this.$emit("click-event", id);
    },
  },
});
</script>

<style lang="scss" scoped>
.white-button {
  width: 120px;
  &-set:first-child {
    //v-forしてる最初の要素
    padding-bottom: 16px;
  }
}
</style>