<template>
  <div class="text-area">
    <textarea v-model="innerValue" />
  </div>
</template>

<script lang="ts">
export default {
name:"TextArea",
props:{
  value:{
    type:String,
    required:true,
  },
  id:Number,
},
computed:{
  innerValue:{
    get():any{
      return (this as any).value;
    },
    set(value:string){
      (this as any).$emit("change-value", value, (this as any).id);
    }
  }
}
}
</script>

<style lang="scss" scoped>
textarea{
  width:100%;
  height:200px;
}
</style>