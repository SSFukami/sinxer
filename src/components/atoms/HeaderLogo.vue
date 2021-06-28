<template>
  <div class="header-logo" @click="transHome">Sinxer</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderLogo",
  methods: {
    transHome(): void {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.header-logo {
  font-size: 24px;
  color: $-primary-100;
  cursor: pointer;
}
</style>