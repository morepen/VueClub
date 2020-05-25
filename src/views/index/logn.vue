<template>
<div class="logn">
   <div class="layui-fulid news-login">
  <a href="index.html" class="title"></a>
  <div class="layui-form">
    <div class="layui-input-block">
      <input type="text" class="layui-input" v-model="email" lay-verify="required" placeholder="用户名或邮箱">
    </div>
     <div class="layui-input-block">
      <input type="password" class="layui-input" v-model="password" lay-verify="required" placeholder="密码">
    </div>
   
    <p class="terms"><input type="checkbox" lay-skin="primary" lay-ignore checked>我已阅读并同意用户协议和隐私条款</p>
    <button class="layui-btn" v-on:click="logn" lay-submit lay-filter="newsLogin">登录</button>
    <div class="hd_login">
    <router-link to="/changepsd"><div class="chnagepsd">重置密码</div></router-link>
    <router-link to="/register"><div class="hdRegister">还没账号，前往注册</div></router-link>
    </div>

    <div class="thirdParty" style="display:none"><a href=""><i class="layui-icon layui-icon-login-qq"></i></a><a href=""><i class="layui-icon layui-icon-login-wechat"></i></a></div>
  </div>
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
        email:'',
        password:'',
        taglist:[]
        

      }
    },
    created() {
      
    
      
    },
    methods: {
      logn:function(){

        var that=this;
        var params={ 
          email:this.email,
          password:this.password         
        };
        if(this.email==''){
         Message.error({message:"请输入正确邮箱"}); 
         return false; 
        }
        if(this.password==''){
         Message.error({message:"请输入正确格式密码"}); 
         return false; 
        }
        that.loading=true;
        that.$http.baseAction("HdLogn",params)
            .then(response => {
                that.loading=false;
               
                var msg=response.msg
                if(response.code==200){
                
                   that.$store.state.userid=response.data[0].id;
                   var userinfo=response.data[0];
                   debugger;
                   that.$store.dispatch("saveUser",userinfo); 
                   debugger;
                   that.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                   setTimeout(function(){
                          const url = '/user';
                          that.$router.push({"path":url});
                  },1000)
                   
                }else{
  
                   that.$message.error(msg);
                   return false;
                  
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
 @import '../../assets/template/news/layui/css/layui.css';
 @import '../../assets/template/news/static/css/index.css';
.logn{
  height:100%;
 }
 .hd_login{
   position:relative;
   width:100%;
 }
 .hdRegister{
   position:absolute;
   left:0px;
   line-height:36px;
   padding-left:5px;
 }
 .chnagepsd{
   position:absolute;
   width:80px;
   top:0px;
   right:0px;
   line-height:36px;
   text-align:right;
   padding-right:5px;
 }
</style>


