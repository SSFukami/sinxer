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
  border: 2px solid chocolate;
  height: 32px;
  color: white;
  background: none;
  font-size: 16px;
  margin: 0px 0px 0px 8px;
  border:0px;
  outline: none;
  cursor: pointer;
}
</style>