<template>
<div class="news">
     <Header></Header>
     <Content></Content>
</div>
</template>
<script>
  import Header from '@/components/header.vue'
  import Content from '@/components/Content.vue'
  export default{
    components: {Header,Content},
    data(){
      return{
        show1:true,
        isNowPage: true,

      }
    },
    created() {
        
    
      
    },
    methods: {
      online:function(){    
  
      }
    }
  }
</script>
<style>

</style>


