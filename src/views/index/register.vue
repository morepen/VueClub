<template>
<div class="register"  v-loading="loading">
   <div class="header"></div>
   <div class="register_tip">益农科技<i style="font-size:12px;display:none;">hdhome.net</i></div> 
   <div class="register_box">
      <input type="text" v-model="email" class="register_input" name="" placeholder="请输入常用邮箱" data-required="required" autocomplete="off">
      <div class="register_btn" v-on:click="register">获取用户账号和密码</div>
   </div> 

</div>
</template>
<script>
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui';
  Vue.use(Element)
  export default{
    components: {},
    data(){
      return{
        show1:true,
        isNowPage: true,
        taglist:[],
        email:'',
        loading: false,
        curryId:this.$route.query.id
        

      }
    },
    created() {
      
      
      
    },
    methods: {      
      register:function(){
      debugger;
        var that=this;
        var params={ 
          email:this.email,
          teamid:this.curryId        
        };
        if(this.email==''){
         Message.error({message:"请输入正确邮箱"}); 
         return false;
        }
        that.loading=true;
        that.$http.baseAction("HdRegister",params)
            .then(response => {
                that.loading=false;
                debugger;
                var msg=response.msg
                if(response.code==200){

                   that.$message.success({message: '注册成功'});
                   setTimeout(function(){
                          const url = '/logn';
                          that.$router.push({"path":url});
                  },1000)
                   
                }else{
                   that.$message.error("获取失败!"); 
                }
                
                
                
                
            }, err => {
                
            })
            .catch((error) => {
              
        })
      }
      
    }
  }
</script>
<style scoped>
 .header{
   background:#03b349;
   width:100%;
   height:300px;
 }
 .register{
    width:100%;
    position:relative;
 }
 .register_box{
   position:absolute;
   top:180px;
   left:50%;
   margin-left:-250px;
   width:500px;
   height:360px;
   background:#fff;
   border-radius: 2px;
   border: 1px solid #dce1e6;
 }
 .register_tip{
   position:absolute;
   top:130px;

   font-size:18px;
   color:#fff;
   text-align:center;
   width:100%;
 }
 .register_input{
    width:96%;
    margin:0 auto;
    display:block;
    padding:10px 0px;
    box-sizing: border-box;
    width: 290px;
    border-radius: 0;
    margin-top:120px;
    border:0px;
    border-bottom:#999 solid 1px;
 }
 .register_btn{
   width:290px;
   background:#03b349;
   line-height:40px;
   text-align:center;
   color:#fff;
   margin:24px auto 0px;
   border-radius: 3;

 }
</style>


