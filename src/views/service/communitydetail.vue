<template>
  <div class="road">
   <Header :TabState="3"></Header>
   <div class="layui-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="road_box">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/service' }">活动大全</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/RoadIndex' }">详情</el-breadcrumb-item>
          
    </el-breadcrumb>
   <ul class="road_ul">
     
   </ul>
 
   <div class="layui-container">
          <div class="list_item" v-for="item in piclist">
          <div class="user_info">
            <span class="user_img"><img src="../../assets/defaultuser.jpg"></span>
            <div class="user_text">
              <div class="user_name">游客_wx0716</div>
              <div class="create_time">2019.7.26 9:00</div>
            </div>
          </div>
          <div class="pic_content">{{item.content}}</div>
          <div class="pic_item">
             <img v-gallery:group1
              class="thumbnail"
              v-for="img in jsonChange(item.pics)"
              :src="attachImageUrl(img)"
              >
          </div>
        </div>
        <div class="detail-comment">
          <p>全部评论 <span>({{CommentList.length}})</span></p>
          <div class="addComment layui-form">
            <div class="img"><span><img src="https://www.hdhome.net/source/image/defaultuser.jpg"></span></div><div class="content">
              <textarea placeholder="写下您想说的评论吧..." v-model="comentContent" class="layui-textarea"></textarea>
              <div class="coment_btn"><button class="layui-btn" v-on:click="ArticleComment()">添加评论</button></div>
            </div>
          </div>
          <ul id="replyCont">
            <li v-for="(item,index) in CommentList">
              <div class="img"><a href=""><img :src="attachImageUrl(item.userpic)"></a></div><div class="readCom">
                <p class="name"><a href="">{{item.username}}</a><span>1小时前</span><span class="goods"><i class="layui-icon layui-icon-news-good"></i></span></p>
                <p class="txt">{{item.content}}</p>
                <p class="tworeply">回复</p>
              </div>
            </li>
          </ul>
          <div id="detailPage"></div>
        </div>



       </div>
        <div v-show="isNoRecord">
             <div class="no_record">暂无数据</div>
             
        </div>
   </div>
    <div class="popup" v-show="uploadershow">
           <div class="popup-content">
            <div class="popup-header clearfix">
             <div>发布活动</div> 
             <img src="../../assets/close.png" class="close_write" v-on:click="closePopup()">
            </div> 
            <form class="pure-form pure-form-stacked">
             <div class="pure-g">
              <div class="pure-u-1">
               <textarea cols="30" rows="8" placeholder="活动内容" maxlength="1500" required="required" class="hd_content" v-model="content"></textarea>
              </div> 
              <div class="pure-u-1">
               <div class="pic_tip">添加图片（最多9张）</div> 
               <div class="thumbnails">
                <ul> 
                  <li class="btn-add_pic" v-show='false' ><input name="file" type="file" id="file" title="添加图片" accept="image/*" /></li>
                  <uploader></uploader>
                </ul>
               </div>
              </div>  
              <div class="wrap_foot">
               <button type="button" class="btn btn-primary" v-on:click="createPics()">发布</button>
              </div>
             </div>
            </form>
           </div>
       </div>
    

  </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
import Alert from '../../components/Alert'
import Header from '@/components/header.vue'
import uploader from '@/components/uploader.vue';
export default {
  components: {Header,uploader},
  mounted(){
  
  },
  data() {
    return {
      piclist:[],
      dialogVisible: false,
      uploadershow:false,
      deskid:this.$route.query.id,
      desktitle:this.$route.query.title,
      uploadpath:'https://www.hdhome.net/upload/',
      content:'',
      isNoRecord:false,
      comentContent:'',
      CommentList:[]
     
    }
  },
  created() {
    
        this.GetPicList(); 
        this.GetCommentList();    
                      
           
  },
  methods: {
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
        if(_userid!=0){
         
        
       
        if(this.comentContent==''||this.comentContent== "undefined"){
              Alert({
                          content:"内容不能为空"
              })
              return false;
        }
        var params={
          detailid:that.deskid,
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

            
          }else{
          const url = '/logn';
          this.$router.push({"path":url});  
        }
          
        },
    GetPicList(){
        var that=this;
        var params={
           deskid:that.deskid
        };
        this.$http.baseAction("Getcommunitydetail",params)
            .then(response => {

                that.piclist=response.data; 
                if(that.piclist.length==0){
                   that.isNoRecord=true;
                  
                }
                 debugger;
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
    },
    createPics:function(){

      var _userid=this.$store.state.userinfo.id;
      if(_userid==0){
        const url = '/logn';
        this.$router.push({"path":url});    
      }else{
              var imgData=this.$store.state.files;
               var params={
                  userid:_userid,
                  content:this.content,
                  imgData:imgData,
                  tagsname:'-1',
                  teamid:'-1',
                  zuid:'-1',
                  deskid:this.deskid
                }
              if(this.content == null ||this.content== undefined ||this.content==''){
                       alert('内容不能为空');
                       return;
              }
              if(imgData == null ||imgData== undefined || imgData==''){
                alert('还未添加图片');
                return;
              }
              var that=this;
              this.$http.baseAction("PicUpload",params)
                .then(response => {
                    
                    if(response.code==200){

                        that.uploadershow=false;
                        
                        that.piclist[that.piclist.length]={
                        content:that.content,
                        pics:response.data.path
                      };
                      that.content='';
                      that.$store.state.files=[];
                    }
                }, err => {
                    console.log(err);
                })
                .catch((error) => {
                   console.log(error)
                }) 
      }        
    },
    showPopup() {
              this.uploadershow=true;
            },
    closePopup() {
              this.uploadershow=false;
    },
    jsonChange(string) {
              if (string) {
                 return JSON.parse(string);
               }
    },
    attachImageUrl(srcUrl) {
              var that=this;
              if (srcUrl !== undefined) {
                 return that.uploadpath+srcUrl;
               }
    }



  }
}
</script>

<style scoped>
 @import '../../assets/template/news/layui/css/layui.css';
 @import '../../assets/template/news/static/css/index.css';
.layui-container{
    width: 1200px;
    padding-left: 0;
    padding-right: 0;
    margin:0 auto;
    padding-top:10px;
}
.road_box{
  padding-top:30px;
  padding-left:20px;
  position:relative;
}
.handle_btn1{
  position:absolute;
  top:20px;
  right:5px;
  width:100px;
  line-height:36px;
  border-radius:18px;
  background:#03b349;
  color:#fff;
  text-align:center;
}
.handle_btn1 a{
  color:#fff;
}
.road_ul li{
  background:#03b349;
  color:#fff;
  height:220px;
  margin-top:30px;
  position:relative;
}
.road_title{
  font-size:28px;
  color:#fff;
  font-weight:bold;
  line-height:80px;
  padding-left:30px;
  font-family: "Microsoft YaHei";
}
.road_js{
  padding-left:40px;
}
.road_btn{
  position:absolute;
  right:20px;
  bottom:20px;
  width:100px;
  line-height:36px;
  border-radius:18px;
  background:#fff;
  color:#03b349;
  text-align:center;
}
.road_btn1{
  position:absolute;
  right:140px;
  bottom:20px;
  width:100px;
  line-height:36px;
  border-radius:18px;
  background:#fff;
  color:#03b349;
  text-align:center;
}
.road_btn2{
  position:absolute;
  right:260px;
  bottom:20px;
  width:100px;
  line-height:36px;
  border-radius:18px;
  background:#fff;
  color:#03b349;
  text-align:center;
}
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background: rgba(0,0,0,.65)
}

.popup .popup-content {
  -webkit-transform: translate(0,0);
  transform: translate(0,0);
  color: #222;
  background-color: #f4f4f4;
  width:88%;
  height:430px;
  position:absolute;
  left:6%;
  top:50%;
  margin-top:-215px;
}

.popup .popup-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff
}

.popup .popup-header h3 {
  margin: 0;
  float: left;
  font-weight: 400
}

.popup .popup-header .icon-close {
  color: #777;
  font-size: 24px;
  float: right
}

.popup .popup-header .icon-close:hover {
  color: #111;
  cursor: pointer
}

.popup form {
  padding: 20px
}

.popup textarea {
  resize: vertical
}
.fade-enter-active,.fade-leave-active {
  -webkit-transition: opacity .5s;
  transition: opacity .5s
}

.fade-enter,.fade-leave-active {
  opacity: 0
}

.btn {
  display: inline-block;
  zoom: 1;
  line-height: normal;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  padding: .5em 1em;
  color: #444;
  color: rgba(0,0,0,.8);
  border: none transparent;
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 2px;
  outline: none;
  margin:0 auto;
}

.btn-primary,.btn-selected,a.btn-primary,a.btn-selected {
  background-color: #189adb;
  color: #eee;
  border:0;
}
.pure-form input[type=password],.pure-form input[type=email],.pure-form input[type=url],.pure-form input[type=date],.pure-form input[type=month],.pure-form input[type=time],.pure-form input[type=datetime],.pure-form input[type=datetime-local],.pure-form input[type=week],.pure-form input[type=tel],.pure-form input[type=color],.pure-form input[type=number],.pure-form input[type=search],.pure-form input[type=text],.pure-form select,.pure-form textarea {
  padding: .5em .6em;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box
}
.pic_tip{
  line-height:36px;
}
.hd_content{
  width:100%;
}
.wrap_foot{
  text-align:center;
}
.close_write{
  position:absolute;
  top:10px;
  right:10px;
  width:24px;
  height:24px;
}
.bottom-guide{
   height: 50px;
   width: 100%;
   position: fixed;
   bottom: 0;
   left:0x;
   z-index:999999999;
}
.bottom-guide .open-style {
   
    bottom: 0;
    z-index: 100;
    height: 50px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 17px;
    background: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.bottom-guide-close{
    height: 12px;
    width: 12px;
    line-height: 10px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
.bottom-guide-icon{
    width: 34px;
    height: 34px;
    margin: 0 8px 0 9px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
.bottom-guide-title{
    width:100px;
    flex: 1 1 auto;
    color: #333;
    font-size: 13px;
    max-height: 34px;
    line-height: 17px;
    text-align: left;
    padding-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.bottom-guide-button{ 
    position:absolute;
    bottom:10px;
    right:10px;
    z-index:9999999;
    width: 57px;
    height: 28px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    background-color: #eb4146;
    font-size: 13px;
    color: #fff;
    line-height: 28px;
    margin-left: 20px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    text-align:center;
    -webkit-tap-highlight-color: rgba(255,255,255,0);
}
.bottom-guide-button a{
    width: 57px;
    height: 28px;
  color:#fff;
  text-decoration:none;
  display:block;
}
.words{
  display:none
}
.user_info{
  position:relative;
  height:60px;

}
.user_img img{
  width:50px;
  height:50px;
  position:absolute;
  top:0px;
  left:0px;

}
.user_text{
  float:left;
  margin-left:60px;
  line-height:26px;
}
.list_wrap{
  width:100%;
  position:absolute;
  top:100px;
  left:0px;
  z-index:1;
  text-align:left;
  margin-bottom:50px;

}
.list_item{
  overflow:hidden;
  margin-top:16px;
  padding:10px 16px;
  color:#333;
  border-radius:3px;
}
.pic_item{
  over-flow:hidden;
  
}


.thumbnail {
  display: block;
  float: left;
  margin: 3px;
  height: 100px;
  width: 100px;
  object-fit: cover;
}
pre {
  font-family: Monaco;
  color: #fff;
  padding: 0.5rem;
}
header {
  font-size: 2rem;
  color: #fff;
}
footer {
  font-size: 1rem;
  color: #fff;
}
.descript {
  font-size: 1.3rem;
  color: #9a9a9a;
  margin-bottom: 2rem;
}
.subtitle {
  font-size: 1.2rem;
  color: #a7a8aa;
  margin-bottom: 1rem;
}
.vue-green {
  color: #4fc08d;
}
.iconfont {
  font-size: 1.5rem;
  margin: 0.3rem;
}
.gray {
  color: #ccc;
}
.write{
  position:fixed;
  bottom:70px;
  right:16px;
  z-index:8;
}
.write img{
  width:60px;
  height:60px;
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background: rgba(0,0,0,.65)
}

.popup .popup-content {
  -webkit-transform: translate(0,0);
  transform: translate(0,0);
  color: #222;
  background-color: #f4f4f4;
  width:88%;
  height:430px;
  position:absolute;
  left:6%;
  top:50%;
  margin-top:-215px;
}

.popup .popup-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff
}

.popup .popup-header h3 {
  margin: 0;
  float: left;
  font-weight: 400
}

.popup .popup-header .icon-close {
  color: #777;
  font-size: 24px;
  float: right
}

.popup .popup-header .icon-close:hover {
  color: #111;
  cursor: pointer
}

.popup form {
  padding: 20px
}

.popup textarea {
  resize: vertical
}
.fade-enter-active,.fade-leave-active {
  -webkit-transition: opacity .5s;
  transition: opacity .5s
}

.fade-enter,.fade-leave-active {
  opacity: 0
}
.pic_content{
  padding-bottom:5px;
}
.pic_content{
  padding-top:5px;
  padding-bottom:5px;
  line-height:24px;
}
.layui-btn {
    width: 90px;
    height: 32px;
    padding: 0;
    color: #555;
    line-height: 32px;
    background-color: #EDEDED;
}
.coment_btn{
 
    text-align: right;
    margin-top: 12px;
    margin-bottom: 30px;

}
.addComment .img{
  text-align:center;
}
.txt{
  padding-top:16px;
  padding-bottom:16px;
}
.tworeply{
  text-align:right;
}
</style>
