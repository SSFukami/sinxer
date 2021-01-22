<template>
  <div class="page">
    <TabComponent
    :list="editList"
    />
  </div>
</template>

<script lang="ts">

import TabComponent from "@/components/molecules/TabComponent.vue"
export default {
name:"Edit",
components:{
  TabComponent,
},
data(){
  return{
    editList:[ //編集画面のラベル一覧
      {
        id:1,
        label:"名前"
      },
      {
        id:2,
        label:"自己紹介"
      },
      {
        id:3,
        label:"Twitter"
      },
      {
        id:4,
        label:"料金"
      },
      {
        id:5,
        label:"納期の目安"
      }
    ],
  }
}
}
</script>

<style>

</style>
