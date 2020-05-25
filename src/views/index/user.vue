<template>
<div class="listmore">
    
    <Header :TabState="1"></Header>

<div class="layui-container news-user">
  <div class="userSelf">
    <div class="img"><img src=""></div>
    <p class="name">邮箱用户</p>
     <router-link :to="{path:'/publish'}" v-if="userAuth==0"><button id="pushNews" class="layui-btn layui-btn-news"><i class="layui-icon layui-icon-add-1"></i>发布新闻 </button></router-link> <button id="pushNews" @click="checkAuth()" class="layui-btn layui-btn-news" v-else>关注</button>
    <ul><li><span class="number">{{articlenum}}</span><span class="label">文章</span></li>
    <li><span class="number">0</span><span class="label">关注</span></li>
    <li><span class="number">0</span><span class="label">粉丝</span></li></ul>
  </div>
  <div class="layui-tab layui-tab-brief userCont">
    <ul class="layui-tab-title">
      <li class="layui-this"><span v-if="userAuth==0">我的文章</span><span v-else>他的文章</span></li>
      <li v-if="userAuth==0">我的收藏</li>
      <li v-if="userAuth==0">我的评论</li>
      <li v-if="userAuth==0">我的积分</li>
    </ul>
    <div class="layui-tab-content">
      <div class="layui-tab-item layui-show">
 
         <List :UserState="userAuth"></List>



        <ul class="layui-form article">
          
        </ul>
        <div id="userArtPage"></div>
      </div>
      <div class="layui-tab-item"></div>
      <div class="layui-tab-item">
        <ul class="comment">
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>
          <li>
            <p class="title"><a href="">当阿里承包了星巴克的外卖</a><span class="pushTime">1小时前</span><span class="like">100</span><i class="layui-icon layui-icon-news-good like"></i></p>
            <p>这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！这篇新闻写的太棒啦！给用户带来很可用的信息！</p>
          </li>     
        </ul>
        <div id="userComPage"></div>
      </div>
    </div>
  </div>    
</div>


</div>
</template>
<script>
  import Header from '@/components/header.vue'
  import List from '@/components/usernewslist.vue'
  export default{
    components: {Header,List},
    data(){
      return{
        show1:true,
        isNowPage: true,
        userAuth:this.$route.query.id?this.$route.query.id:0,
        taglist:[]
      
        

      }
    },
    created() {
      
    
      
    },
    methods: { 
    checkAuth(){
      var _userid=this.$store.state.userinfo.id;
      if(_userid!=0){
        const url = '/publish';
        this.$router.push({"path":url});    
      }else{
        const url = '/logn';
        this.$router.push({"path":url});  
      }
     },
    },
    computed:{
      articlenum: function () { 
         return this.$store.state.articlenum
       }
    }
  }
</script>
<style>
 @import '../../assets/template/news/layui/css/layui.css';
 @import '../../assets/template/news/static/css/index.css';
 .label{
   padding-top:16px;
 }
</style>


