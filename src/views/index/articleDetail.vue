<template>
<div class="news">
   
     <Header :TabState="1"></Header>
     <div class="layui-container news-detail">
  <div class="layui-row layui-col-space40">
    <div class="layui-col-sm8">
      <div class="detail-main">
        <ul id="detail-handel" style="display:none">
          <li class="weibo"><a href="javascript:;"><i class="layui-icon layui-icon-news-weibo"></i></a></li>
          <li class="wechat"><a href="javascript:;"><i class="layui-icon layui-icon-news-wechat"></i></a></li>
          <li class="space"><a href="javascript:;"><i class="layui-icon layui-icon-news-space"></i></a></li>
          <li class="review num"><a href="javascript:;"><i class="layui-icon layui-icon-news-review2"></i><span>1280</span></a></li>
          <li class="collect num"><a href="javascript:;"><i class="layui-icon layui-icon-news-collect"></i><span>1008</span></a></li>
        </ul>
        <div class="detail-cont">
          <h1>{{ArticleDetail.title}}</h1>
          <div class="newsClass"><span>生活</span>犀牛 <b>2018-06-07 08:30</b> <i>收藏1289</i> <i>评论500</i></div>
          <p class="title">文章摘自生活游记</p>
          <div v-html="ArticleDetail.content"></div>

         
          <div class="contact" style="display:none">
             <ul class="contact_ul">
               <li>
                <div class="hc_left">
                 <div class="advnews">APP下载</div>
                 <a download="hdhome" href="http://www.hdhome.net/download/app/hdhome1.0.apk"><img class="contact_img" src="../../assets/app.png"></a>
                </div>

               </li>
               <li>
                <div class="hc_right">
                 <div class="advnews">公众号</div>
                 <img class="contact_img" src="../../assets/wx.jpg">
                 </div>
               </li>
             </ul>


          </div>

          <div class="contact1" style="display:none">
            <p>联系人：犀牛</p>
            <p>微信联系方式：lcs13554219576</p>
            <p><img src="../../assets/contact.jpg"></p>
          </div>
        </div>
        <div class="detail-label">
          <i class="layui-icon layui-icon-news-label"></i>
          <span class="layui-breadcrumb">
            <a href="javascript:;">华为手机</a>/
            <a href="javascript:;">华为荣耀</a>/
            <a href="javascript:;">CPU</a>/
            <a href="javascript:;">GPU</a>/
            <a href="javascript:;">三星</a>
          </span>
        </div>
        <div class="detail-comment">
          <p>全部评论 <span>({{CommentList.length}})</span></p>
          <div class="addComment layui-form">
            <div class="img"><span><img src="https://www.hdhome.net/source/image/defaultuser.jpg"></span></div><div class="content">
              <textarea placeholder="写下您想说的评论吧..." v-model="comentContent" class="layui-textarea"></textarea>
              <div class="btn"><button class="layui-btn" v-on:click="ArticleComment()">添加评论</button></div>
            </div>
          </div>
          <ul id="replyCont">
            <li v-for="(item,index) in CommentList">
              <div class="img"><a href=""><img src="https://www.hdhome.net/source/image/defaultuser.jpg"></a></div><div class="readCom">
                <p class="name"><a href="">游客</a><span>1小时前</span><span class="goods"><i class="layui-icon layui-icon-news-good"></i></span></p>
                <p class="txt">{{item.content}}</p>
                <a class="reply" href="javascript:;">回复</a>
              </div>
            </li>
          </ul>
          <div id="detailPage"></div>
        </div>
      </div>
    </div>
    <div class="layui-col-sm4">
      <div class="detail-side">
        <div class="person">
          <a class="img"><img src="https://www.hdhome.net/source/image/defaultuser.jpg"></a>
          <span class="name">犀牛</span>
          <span class="num">102篇文章</span>
          <a href="javascript:;" class="layui-btn layui-btn-sm focusOn">关注</a>
        </div>
        <div class="list" style="display:none">
          <p>热门推荐</p>
          <ul>
          
          </ul>
        </div>
      </div>
    </div>
    
  </div>
 
</div>
</div>
</template>
<script>
  import Alert from '../../components/Alert'
  import Header from '@/components/header.vue'
  import Content from '@/components/Content.vue'
  export default{
    components: {Header,Content},
    data(){
      return{
        show1:true,
        isNowPage: true,
        curryId:this.$route.query.id,
        comentContent:'',
        CommentList:[],
        ArticleDetail:{}
        

      }
    },
    created() {
       
      this.GetDetail(); 
      this.GetCommentList(); 
      
    },
    methods: {
      GetDetail(){
        var that=this;
        var params={
          id:this.$route.query.id
        };
        this.$http.baseAction("GetArticleDetail",params)
            .then(response => {
                
                that.ArticleDetail=response.data[0];

            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
     },
     GetCommentList(){
        var that=this;
        var params={
          detailid:this.$route.query.id
        };
        this.$http.baseAction("GetCommentList",params)
            .then(response => {
               
                that.CommentList=response.data;

            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
     },
     ArticleComment(){
        var that=this;
        
        var _userid=this.$store.state.userinfo.id;
        
        if(_userid==0||_userid== "undefined"){
           Alert({
                          content:"还未登陆，请先登录"
                        })

          setTimeout(function()  {
           
              const url = '/logn';
              that.$router.push({"path":url});
           
          }, 1000);

              
        }else{
       
        if(this.comentContent==''||this.comentContent== "undefined"){
              Alert({
                          content:"内容不能为空"
              })
              return false;
        }
        
        
        var params={
          detailid:that.curryId,
          content:this.comentContent,
          userid:this.$store.state.userinfo.id,
          cuserid:'-1',
          parentid:'-1',
          type:1
        };
        debugger;
        this.$http.baseAction("comment",params)
            .then(response => {
                
                if(response.code==200){
                   Alert({
                          content:"评论成功！"
                        })
                  that.CommentList.push({
                        content:that.comentContent
                      });
                  
                  that.comentContent='';

                }else{
                   this.$message.error('评论失败');
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
  }
</script>
<style>
 @import '../../assets/template/news/layui/css/layui.css';
 @import '../../assets/template/news/static/css/index.css';
 .contact{
    background-color: #f49806;
    color:#fff;
    padding:80px 0px;
    line-height:40px;
    margin-top:16px;
  
 }
 .contact_ul{
   overflow:hidden;
 }
 .contact li{
   width:50%;
   float:left;
 }
  .adv_head{
    line-height:36px;
    background: #f49806;
    color:#fff;
    text-align:center;
    font-size:16px;
 }
 .contact_img{
   width:120px!important;
   height:120px!important;
   margin:0px!important;
 }
 .hc_left{
  
   width:120px;
   margin:10px auto;
   text-align:center;
   padding:20px;
   background:#fff;
 }
 .adv_head{
   background:#fff;
   color:#f49806;
 }
 .hc_right{
  
   width:120px;
   margin:10px auto;
   text-align:center;
   padding:20px;
   background:#fff;

 }
 .advnews{
    background: #fff;
    color: #f49806;
 }
</style>


