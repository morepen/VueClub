<template>
<div class="news">
   
     <Header :TabState="5"></Header>
     <List></List>
     <Adv></Adv>

   
     
     <Footer></Footer>

</div>
</template>
<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)


  import Header from '@/components/header.vue'
  import List from '@/components/newslist.vue'
  import Footer from '@/components/footer.vue'
  import Adv from '@/components/adv.vue'
  import mqtt from 'mqtt'
  export default{
    components: {Header,List,Footer,Adv},
    data(){
      return{
        show1:true,
        isNowPage: true,
        

      }
    },
    created() {
      
     
      
    },
    methods: {
      GetPicList(){
        var that=this;
        var params={
          tagid:"-2"
        };
        this.$http.baseAction("ArticleList",params)
            .then(response => {
               
                that.piclist=response.data; 
                if(that.piclist.length>0){
                  that.isloading=false;
                }
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
        }) 
      },
      showNewsprint(item){
         
         this.curItem=item;
         this.isNewsprint=!this.isNewsprint;
      },
      hideNewsprint(){
         this.isNewsprint=!this.isNewsprint;
      },
      download(){
        this.$refs.mychild.download();
      }
      
    }
  }
</script>
<style scoped>
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
    background: #61669d;
    color:#fff;
    text-align:center;
    font-size:14px;
 }
 .adv_head1{
    margin-top:16px;
    line-height:36px;
    background: #61669d;
    color:#fff;
    text-align:center;
    font-size:14px;
 }
 .app_code{
   width:100px;
   height:100px;
 }

</style>


