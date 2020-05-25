<template>
  <div class="card">
   <Header :TabState="6"></Header>
   <div class="layui-container">
     <ul class="user_ul">
       <li v-for="item in userlist">
         <div class="user_left"><img class="user_img" src="https://www.hdhome.net/source/image/defaultuser.jpg"></div>
         <div class="user_right">
            <div>{{item.username}}</div>
            <div>会计|28岁|170cm</div>
            <div>个性签名:无</div>
         </div>
       </li>

     </ul>
   </div>
  </div>
</template>

<script>

import Header from '@/components/header.vue'
import Alert from '../../components/Alert'
export default {
  components: {Header},
  mounted(){
  
  },
  data() {
    return {
      userlist:[]
     
    }
  },
  created() {
    
    this.GetUserList(); 
           
  },
  methods: {
    GetUserList(){
        var that=this;
        var params={
        };
        this.$http.baseAction("UserList",params)
            .then(response => {
                
                that.userlist=response.data; 
                if(that.userlist.length>0){
                  that.isloading=false;
                }
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
.card{
    background: #f7f7f7;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.user_ul{
  overflow:hidden;
}
.user_ul li{
  margin-top:16px;
  margin-bottom:16px;
  position:relative;
  background:#fff;
}
.user_left{
  padding:10px;
  width:100px;
}
.user_right{
  position:absolute;
  left:120px;
  top:0px;
  padding-top:20px;
  padding-left:10px;
  padding-right:10px;
}
.user_img{
  width:100px;
  height:100px;
}
.layui-container{
    width: 1200px;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
    padding-top: 10px;
}
</style>
