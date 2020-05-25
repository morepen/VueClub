<template>
  <div class="service">
  <Header :TabState="2"></Header>
  <div class="layui-container">   
     <div v-for="item in DevelopList">
         <div class="ul_head">{{item.title}}</div>
         <div class="productdetail">
           <div class="productcontent">简介:{{item.content}}</div>
           <img class="product_wx" :src="hosturl+'/upload/develop/'+item.pic">
           <router-link :to="{path:'/serviceproduct',query: {developid:item.id}}"><div class="product_btn1">发表图文</div></router-link>
           <router-link :to="{path:'/publish',query: {developid:item.id}}"><div class="product_btn2">发表文章</div></router-link>
         </div>
     </div>
  </div>

 </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
import Header from '@/components/header.vue'
import uploader from '@/components/uploader.vue';
export default {
  components: {Header},
  mounted(){
  
  },
  data() {
    return {
      hosturl:this.$store.state.hosturl,
      DevelopList:[]



     
    }
  },
  created() {
    



     this.GetDevelopList();         
                      
           
  },
  methods: {
    GetDevelopList(){
        var that=this;
        var params={};
        this.$http.baseAction("DevelopList",params)
            .then(response => {
                debugger;
                that.DevelopList=response.data;
                
                
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
    }



  }
}
</script>

<style scoped>

.layui-container{
    width: 1200px;
    padding-left: 0;
    padding-right: 0;
    margin:0 auto;
    padding-top:10px;
}
.service{
    background: #f7f7f7;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
}
.service_ul li{
  width:50%;
  float:left;
  list-style:none;
}
.service_wrap{
  margin:20px;
  background:#fff;
  border-radius:5px;
  color:#333;
  padding:36px 20px 50px 20px;
  height:120px;
  position:relative;
}
.service_title{
  font-size:24px;
}
.service_content{
  text-indent: 1em;
  padding-top:30px;
}
.service_bottom{
  position:absolute;
  left:0px;
  bottom:0px;
  width:100%;
}
.service_btn{
  float:right;
  padding:0px 16px;
  line-height:36px;
  border-radius:18px;
  display:inline-block;
  background:#03b349;
  color:#fff;
  margin-bottom:16px;
  margin-right:20px;
}
.wx_welcome{
  width:80%;
  margin-left:10%;
}
.wx_tip{
   text-align:center;
   line-height:40px;
   color:#333;
   font-size:16px;
}
.road{
  background:#f7f7f7;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height: 100%;
}
.service_ul{
  overflow:hidden;
}
.ul_head{
  border-left:#03b349 solid 3px;
  padding-left:16px;
  margin-left:20px;
  margin-top:16px;
  line-height: 20px;
}
.productdetail{
  position:relative;
  padding:16px;
  height:200px;
  background:#fff;
  margin:10px 20px;
  padding-right:130px;
  }

.product_btn1{
    position:absolute;
    bottom:70px;
    right:20px; 
    padding: 0 16px;
    line-height: 36px;
    border-radius: 18px;
    display: inline-block;
    background: #03b349;
    color: #fff;
}
.product_btn2{
    position:absolute;
    bottom:20px;
    right:20px; 
    padding: 0 16px;
    line-height: 36px;
    border-radius: 18px;
    display: inline-block;
    background: #03b349;
    color: #fff;
}
.product_wx{
  width:80px;
  height:80px;
  position:absolute;
  top:36px;
  right:28px;
}
.productcontent{
  line-height:30px;
  padding-top:16px;
}
</style>
