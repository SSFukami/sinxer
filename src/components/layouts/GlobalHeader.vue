<template>
  <div class="global-header">
    <div>
      <header-logo />
    </div>
    <div>
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "@/components/atoms/Login.vue"
import HeaderLogo from "@/components/atoms/HeaderLogo.vue"
export default {
  name:"GlobalHeader",
  components:{
    Login,
    HeaderLogo,
  }
}
</script>

<style lang="scss" scoped>
.global-header{
  position: fixed;
  width: 100%;
  height: 70px;
  background: chocolate;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
}
</style>