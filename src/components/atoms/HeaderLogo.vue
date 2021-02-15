<template>
  <div class="header-logo">Sinxer</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderLogo",
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
.header-logo {
  font-size: 24px;
  color: $-primary-100;
}
</style>