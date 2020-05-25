<template>
<div class="adv_wrap">
         <div class="adv_head1">APP</div>
         <a download="hdhome" :href="hosturl+'/download/app/hdhome.apk'"><img class="app_code" :src="hosturl+'/source/image/app.png'"></a>

         <div class="adv_head1">公众号</div>
         <img class="app_code" :src="hosturl+'/source/image/wx.jpg'">

</div>

</template>
<script>
 export default{
    components: {
       
    },
    data(){
      return{
        hosturl:this.$store.state.hosturl,
        linklist:'',
      


      }
    },
    created() {
     
      
    
      
    },
    methods: {
      
      
    }
  }
</script>
<style scoped>
.app_code{
   width:100px;
   height:100px;
 }
.adv_wrap{
   width:100px;
   height:136px;
   position:fixed;
   left:0px;
   top:50%;
   margin-top:-120px;

 }
 .adv_head{
    line-height:36px;
    background: #03b349;
    color:#fff;
    text-align:center;
    font-size:14px;
 }
 .adv_head1{
    margin-top:16px;
    line-height:36px;
    background: #03b349;
    color:#fff;
    text-align:center;
    font-size:14px;
 }
</style>
