<template>
  <div class="modal-frame" :class="setClassSize">
    <div class="modal-header">
      <slot name="header"></slot>
      <div class="close">
        <img :src="closeUrl" @click="closeModal" />
      </div>
    </div>
    <div class="modal-content">
      <slot name="content"></slot>
    </div>
    <div class="modal-footer">
      <slot name="footerLeft"></slot>
      <slot name="footerRight"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type DataType = {
  closeUrl: NodeRequire;
};

export default defineComponent({
  name: "ModalFrame",
  props: {
    size: {
      //モーダルのサイズ
      type: String,
      default: "M",
      validator: (value: string)　=> {
        //プロパティの値は、必ずいずれかの文字列でなければならない
        return ["S", "M", "L"].indexOf(value) !== -1;
      },
    },
  },
  data(): DataType {
    return {
      closeUrl: require("@/assets/close-black.svg"), //閉じるボタンのアイコン
    };
  },
  computed: {
    setClassSize(): string {
      return `size-${(this as any).size}`;
    },
  },
  methods: {
    closeModal(): void {
      (this as any).$store.dispatch("modal/closeModal");
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-frame {
  z-index: 1000;
  width: 400px;
  background: white;
  display: grid;
  grid-template-rows: 32px 1fr 32px;
  row-gap: 8px;
  border-radius: 4px;
  padding: 16px;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close {
      width: 24px;
      display: flex;
      justify-content: center;
      img {
        width: 24px;
        cursor: pointer;
      }
    }
  }

  .modal-content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto; //左右中央揃え用
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.size-S {
  height: 160px;
}

.size-M {
  height: 480px;
}

.size-L {
  height: 640px;
}
</style>