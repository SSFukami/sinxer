<template>
  <div class="trimming" v-if="$store.state.trimming.uploadedImage" @click.self="closeTrimming" >
    <div class="trimming-image">
      <VueCropper
        class="image"
        ref="cropper"
        :guides="true"
        :view-mode="0"
        :auto-crop-area="0.5"
        :background="true"
        :rotatable="false"
        :src="$store.state.trimming.uploadedImage"
        :aspect-ratio="1 / 1"
        :img-style="{ height: '500px' }"
        drag-mode="crop"
      />
    </div>
    <div class="select-button">
      <CommonButtonWhite label="決定" @click-event="cropImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";

export default defineComponent({
  name: "Trimming",
  components: {
    VueCropper,
    CommonButtonWhite,
  },
  methods: {
    cropImage() { //トリミングされた箇所を切り取る処理
      const cropImg = (this as any).$refs.cropper
        .getCroppedCanvas()
        .toDataURL();
      (this as any).$store.dispatch("trimming/closeTrimming");
      (this as any).$store.dispatch("trimming/cropImage", cropImg); //登録前のアイコンを表示
    },
    closeTrimming(): void { //トリミング処理を閉じる処理
      (this as any).$store.dispatch("trimming/closeTrimming");
    },
  },
});
</script>

<style lang="scss" scoped>
.trimming {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  &-image {
    width:80%;
    height:80%;
    padding-right: 10px;
    padding-top:50px;
    padding-left: 40px;
  }
}
.select-button {
  width: 10%;
  height: 32px;
}
</style>