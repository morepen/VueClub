<template>
<div class="register"  v-loading="loading">
   <div class="header"></div>
   <div class="register_tip">活动之家<i style="font-size:12px;">hdhome.net</i></div> 
   <div class="register_box">
      <input type="text" v-model="email" class="register_input" name="" placeholder="请输入用户邮箱" data-required="required" autocomplete="off">
      <input type="password" v-model="oldpsd" class="register_input" name="" placeholder="请输入原用户密码" data-required="required" autocomplete="off">
      <input type="password" v-model="newpsd" class="register_input" name="" placeholder="请输入新用户密码" data-required="required" autocomplete="off">
      <div class="register_btn" v-on:click="register">重置密码</div>
   </div> 

</div>
</template>
<script>
 
  export default{
    components: {},
    data(){
      return{
        show1:true,
        isNowPage: true,
        taglist:[],
        email:'',
        loading: false,
        oldpsd:'',
        newpsd:''
        

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
          oldpsd:this.oldpsd,
          newpsd:this.newpsd
             
        };
        if(this.email==''){
         Message.error({message:"请输入正确邮箱"}); 
         return false;
        }
         if(this.oldpsd==''){
         Message.error({message:"原密码不能为空"}); 
         return false;
        }
        if(this.newpsd==''){
         Message.error({message:"新密码不能为空"}); 
         return false;
        }
        that.loading=true;
        that.$http.baseAction("changepsd",params)
            .then(response => {
                that.loading=false;
                debugger;
                var msg=response.msg
                if(response.code==200){

                   that.$message.success({message: '重置成功'});
                   setTimeout(function(){
                          const url = '/logn';
                          that.$router.push({"path":url});
                  },1000)
                   
                }else{
                   that.$message.error({message:msg}); 
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
   background:#61669d;
   width:100%;
   height:300px;
 }
 .register{
    width:100%;
    height:100%;
    position:absolute!important;
 }
 .register_box{
   position:absolute;
   top:180px;
   left:50%;
   margin-left:-250px;
   width:500px;
   height:320px;
   padding-top:40px;
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
    margin:20px auto;
    display:block;
    padding:10px 0px;
    box-sizing: border-box;
    width: 290px;
    border-radius: 0;
    border:0px;
    border-bottom:#999 solid 1px;
 }
 .register_btn{
   width:290px;
   background:#61669d;
   line-height:40px;
   text-align:center;
   color:#fff;
   margin:24px auto 0px;
   border-radius: 3;

 }
</style>


