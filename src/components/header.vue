<template>
<div class="header">
	<div class="news-header">
  <div class="layui-container">
    <a id="logo" href="index.html"></a>
    <div class="pc_nav">
    <ul class="layui-nav header-nav close">
      <li :class="{'layui-this':TabState == 1,'layui-nav-item':true}">
        <a href="https://www.xdty.net/">首页</a>
      </li>
      <li :class="{'layui-this':TabState == 2,'layui-nav-item':true}">
        <router-link to="/">应用管理</router-link>
      </li>
      <li :class="{'layui-this':TabState ==9,'layui-nav-item':true}" style="display:none">
        <a href="http://www.hdhome.net/">商城</a>
      </li>
      <li :class="{'layui-this':TabState == 6,'layui-nav-item':true}">
        <router-link to="/supply">供需</router-link>
      </li>
      <li :class="{'layui-this':TabState == 7,'layui-nav-item':true}">
        <router-link to="/index">打早卡</router-link>
      
      <li :class="{'layui-this':TabState == 4,'layui-nav-item':true}">
        <router-link to="/goldword">书籍推荐</router-link>
      </li>
      <li :class="{'layui-this':TabState == 5,'layui-nav-item':true}">
        <router-link to="/RoadIndex">功能尝鲜</router-link>
      </li>
    
      
    </ul>
    <div class="userinfo" v-if="user.id!=0">
         欢迎，<router-link :to="{path:'/user'}"><span class="username">{{user.nickname}}</span></router-link><span class="checkout" v-on:click="checkout()">退出</span>
    </div>
    </div>
    
    <div class="layui-form header-login" v-if="user.id==0">
        
      
      <div >
       
        <router-link :to="{path:'/logn'}">登入</router-link>
        <router-link :to="{path:'/register',query: {id: 0}}">注册</router-link>
      </div>

    </div>
    <ul class="layui-nav header-login">
      <li class="layui-nav-item">
        <a href="javascript:;"><img src="" class="layui-nav-img"></a>
        <dl class="layui-nav-child">
          <dd><a href="user.html">个人中心</a></dd>
          <dd @click="checkout()">退出登录</dd>
        </dl>
      </li>
    </ul>
  </div>
</div>
</div>
</template>

<script>
 export default {
    props: ["TabState"],
    data() {
      return {
        userinfo:{
          id:0,
          usernmae:"游客"
        }
      }
    },
    mounted() {
      
    
    },
    methods: {
       checkout:function(){
        var baseinfo={
          id:0,
          username:"游客"
           }
        this.$store.dispatch("saveUser",baseinfo);
        const url = '/logn';
        this.$router.push({"path":url});
         
       },


    },
    watch:{
       userinfo: {
        handler(newName, oldName) {
          this.userinfo = newName;
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      }
    },
    computed:{
      user: function () { 
         
         return this.$store.state.userinfo
       }
    }


  }
</script>
<style scoped>
@import '../assets/template/news/layui/css/layui.css';
@import '../assets/template/news/static/css/index.css';
.userinfo{
  color:#fff;
  position:absolute;
  right:0px;
  top:0px;
  line-height:50px;
}
.layui-container{
  position:relative;
}
.checkout{
  margin:0 16px;
}
.username{
  color:#fff;
}
</style>

