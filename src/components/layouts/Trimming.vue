<template>
  <div class="trimming" :class="setClassTrimming" @click.self="closeTrimming">
    <div class="trimming-image">
      <VueCropper
        class="image"
        ref="cropper"
        :guides="true"
        :view-mode="2"
        :auto-crop-area="0.5"
        :min-container-width="1000"
        :min-container-height="500"
        :background="true"
        :rotatable="false"
        :src="$store.state.trimming.uploadedImage"
        :aspect-ratio="targetWidth / targetHeight"
        :img-style="{ height: '500px' }"
        drag-mode="crop"
      />
    </div>
    <div class="select-button">
      <CommonButtonWhite :label="label" @click-event="cropImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import CommonButtonWhite from "@/components/atoms/CommonButtonWhite.vue";

type DataType = {
  targetWidth: number;
  targetHeight: number;
  cropImg: string;
  label: string;
};

export default defineComponent({
  name: "Trimming",
  components: {
    VueCropper,
    CommonButtonWhite,
  },
  data(): DataType {
    return {
      targetWidth: 1,
      targetHeight: 1,
      cropImg: "",
      label: "決定",
    };
  },
  methods: {
    cropImage() {
      (this as any).cropImg = (this as any).$refs.cropper
        .getCroppedCanvas()
        .toDataURL();
      (this as any).$store.dispatch("trimming/closeTrimming");
      // (this as any).$store.dispatch("trimming/cropImage", this.cropImg);
      (this as any).$store.dispatch("trimming/beforeUpdateImage", this.cropImg);
      // (this as any).$store.dispatch("trimming/updateCropImage", this.cropImg);
    },
    closeTrimming(): void {
      (this as any).$store.dispatch("trimming/closeTrimming");
    },
  },
  computed: {
    setClassTrimming(): string {
      //トリミングレイアウトが開いた時のクラス
      return (this as any).$store.state.trimming.isOpeningTrimming
        ? "open"
        : "";
    },
  },
});
</script>

<style lang="scss" scoped>
.trimming {
  z-index: -2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding-left: 100px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  &-image {
    padding-right: 10px;
  }
}
.open {
  z-index: 3;
}
.select-button {
  width: 120px;
  height: 32px;
}
</style>