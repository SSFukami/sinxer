<template>
  <button>{{ label }}</button>
</template>

<script lang="ts">
export default {
  name: "CommonButton",
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
button {
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(48, 48, 48);
  background: none;
  border: 2px solid black;
  outline: none;
  cursor: pointer;
}
</style>