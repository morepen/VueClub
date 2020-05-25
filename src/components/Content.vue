<template>
<div class="content">
	
<div class="layui-container news-index">
	
	<div class="layui-row layui-col-space20 contentBot">
    <div class="layui-col-md8 index-list">
      <h2>生活推荐</h2>
      <vue-loading v-show="isloading"></vue-loading>
    	<ul class="newsList" v-show="isloading==false">
    		<li v-for="item in piclist">
    	    <router-link :to="{path:'/articleDetail',query: {id: item.id}}">
          <a class="img" href="javascript:;"><el-image :src="item.coverimage" lazy></el-image></a><div class="txt">
            <a href="javascript:;">【活动之家】{{item.title}}</a>
            <div class="label"><span class="orange">{{item.tag}}</span>天门周伯通<b>2018-06-07</b></div>
            <div class="cont">活动地址：{{item.address}}</div>
          </div>
         </router-link>
         <div class="creatcanves" @click="showNewsprint(item)">打早卡</div>
         
    		</li>
    	</ul>
      

    	<div class="btn"><router-link :to="{path:'/listmore',query: {tagid: '-1'}}"><div class="loadmore">查看更多栏目</div></router-link></div>		
    </div>
    <div class="layui-col-md4 index-side">
    	<div class="userlist">
	     	<h2 class="userlist_title">金币排行榜</h2>
        <table class="layui-table" lay-skin="nob">
            <thead>
              <tr>
                <th>用户</th>
                <th>金币</th>
                <th>在线状态</th>
                <th></th>
              </tr> 
            </thead>
            <tbody>
              <tr v-for="item in userlist">
                <td>{{item.nickname}}</td>
                <td>{{item.score}}粒</td>
                <td>{{item.online|changeOnline}}</td>
                <td><router-link :to="{path:'/user',query: {id: item.id}}"><span class="gouser">访问</span></router-link></td>
              </tr>
            </tbody>
          </table>
	    </div>
      <div class="publish" @click="checkAuth()"><div class="publish_btn">发表动态</div></div>
    </div>

	</div>
  <div id="silde" style="display:none"><a id="refresh"><i class="layui-icon layui-icon-refresh"></i></a><a id="scroll"><i class="layui-icon layui-icon-up"></i></a></div>
</div>
 
  <div class="centerbody_wrap" v-if="isNewsprint">
   <div class="centerbody">
      <html2canvas :message="this.curItem" ref="mychild"></html2canvas>
      <ul class="btn_ul">
         <li><div class="btn_no" @click="hideNewsprint()">关闭</div></li>
         <li><div class="btn_yes" @click="download()">长按保存</div></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import vueLoading from './loading.vue'
  import html2canvas from './html2canvas.vue'
  export default{
    components: {
          vueLoading,html2canvas
    },
    data(){
      return{
        curItem:{},
        isloading:true,
        piclist:[],
        isNewsprint:false,
        userlist:[]


      }
    },
    created() {
      this.GetPicList();  
      this.GetUserList(); 
    
      
    },
    filters:{

      changeOnline:function(type){
    
          if(type==0){
            return "离线";
          }else if(type==1){
            return "在线";
          }

        }

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
    GetUserList(){
        var that=this;
        var params={
        };
        this.$http.baseAction("UserList",params)
            .then(response => {
                
                that.userlist=response.data;
                debugger; 
                if(that.userlist.length>0){
                  that.isloading=false;
                }
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
        }) 
      },
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
<style>
 @import '../assets/template/news/layui/css/layui.css';
 @import '../assets/template/news/static/css/index.css';

 .publish_btn{
   margin:10px auto;
   line-height:36px;
   text-align:center;
   background:#03b349;
   color:#fff;

 }
 .cover{
   height:160px;
 }
 .layui-table{
    width:90%;
    margin:0 auto;
 }
 .userlist_title{
   margin-left:5%;
   padding:10px 0px;
 }
 .gouser{
   padding:0px 8px;
   line-height:26px;
   border-radius:13px;
   display:inline-block;
   background: #03b349;
   color: #fff;
 }
 .el-image img{
   height:140px;
 }
</style>

