<template>
<div class="listmore">
   
     <Header :TabState="2"></Header>
     <List></List>
     <Adv></Adv>
</div>
</template>
<script>
  import Header from '@/components/header.vue'
  import List from '@/components/list.vue'
  import Adv from '@/components/adv.vue'
  export default{
    components: {Header,List,Adv},
    data(){
      return{
        show1:true,
        isNowPage: true,
        taglist:[]
        

      }
    },
    created() {
      
    
      
    },
    methods: {
      
      
      
    }
  }
</script>
<style>
 
</style>


