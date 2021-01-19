<template>
  <div class="login-form">
    <CommonButton 
    :label="itemData.label" 
    />
  </div>
</template>

<script>
import CommonButton from "@/components/atoms/CommonButton.vue"

export default {
  name: "LoginForm",
  components: {
    CommonButton,
  },
  props: {
    formData:Array,
    itemData:Object,
  },
};
</script>

<style>
</style>