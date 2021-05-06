<template>
  <div class="confirm-header">
    <div class="back-button">
      <button class="back" @click="transHome">戻る</button>
      <button class="confirm" @click="transMessage">依頼する</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmHeader",
  methods: {
    transHome(): void {
      this.$router.push("/");
    },
    transMessage(): void {
      this.$router.push("/message");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.confirm-header {
  width: 100%;
  height: 50px;
  background-color: $-primary-500;

  .back-button {
    display: flex;
    justify-content: space-between;
  }
  button.back {
    font-size: 20px;
    color: $-primary-100;

    padding: 8px 0px 8px 24px;
    background-color: $-primary-500;
    border: none;
    cursor: pointer;
  }
  button.confirm {
    font-size: 20px;
    color: $-primary-100;
    padding: 8px 24px 8px 0px;
    background-color: $-primary-500;
    border: none;
    cursor: pointer;
  }
}
</style>