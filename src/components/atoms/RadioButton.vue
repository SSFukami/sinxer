<template>
  <div class="radio">
    <div v-for="(item, index) in data" :key="index" class="radio-button">
      <label>
        <input type="radio" :value="item.id" v-model="innerValue" />
        {{ item.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IradioButtonList } from "@/mixins/radioButtonList";

export default defineComponent({
  name: "RadioButton",
  props: {
    value: {
      //返される値(歌い手が0,Mix師が1)
      type: Number,
      default: 0,
      validator: (value: number) => {
        //プロパティの値は、必ずいずれかの文字列でなければならない
        return [0, 1].indexOf(value) !== -1;
      },
    },
    id: {
      type: Number,
      required: false,
    },
    data: {
      //選択肢の配列
      type: Array as PropType<IradioButtonList[]>,
      required: true,
    },
  },
  computed: {
    innerValue: {
      get(): number {
        return this.value;
      },
      set(value: number) {
        this.$emit("change-value", Number(value));
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.radio {
  width: 100%;
  height: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  column-gap: 16px;
  padding: 8px;

  &-button {
    label {
      color: $-primary-800;
      font-size: 20px;
    }
  }
}
</style>