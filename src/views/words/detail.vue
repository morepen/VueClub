<template>
<div class="list xzb community_list">
    <div class="page-content topic index-content">
        <div class="topic-article clearfix">
          <div class="ui buttons article_like"><a id="v_upup" class="button ui black"><span id="count_upup">0 喜欢</span></a> <a id="v_down" class="button ui black"><span id="count_down">0 不喜欢</span></a></div>
          <div class="detail_title"><span>{{curDate.title}}</span><span class="url_origin">来源：<span v-on:click="UrLChange(curDate.url)">{{curDate.url}}</span></span></div> 
          <div class="topic-meta">
           <img :src="userImageUrl(curDate.userpic)" class="topic-avatar" /> 
           <div class="comment-item-info">
                 <a target="_blank" href="/im/etmZGZmYmdm/" class="comment-item-username name_color">{{curDate.username}}</a> 
                 <div class="comment-item-date">
                  2018-06-15 17:21
                 </div>
            </div>

           <button type="button" class="topic-replybutton btn btn-primary" v-on:click="showcommentPopup(0,curDate)">回复楼主</button>
          </div> 
          <div class="article">
           {{curDate.content}}
          </div> 
          <div id="lightgallery" class="lightgallery" lg-uid="lg0">
              <ul class="imglist imglist">
                <li v-for="(pic, k) in jsonChange(curDate.pics)">
                 <img class="content-picture" :src="attachImageUrl(pic)" alt="">
                </li>
              </ul>
          </div>
         </div> 
         <div class="topics-comments clearfix">
          <div class="comment-item" v-for="(item, index) in commentList">
           <div class="comment-item-head">              
                <img :src="userImageUrl(item.userpic)" class="topic-avatar" /> 
               <div class="comment-item-info">
                 <a target="_blank" href="/im/etmZGZmYmdm/" class="comment-item-username name_color">{{item.username}}</a> 
                 <div class="comment-item-date">
                  2018-06-15 17:21
                 </div>
                </div> 
                <div class="comment-item-reply">
                 <i class="iconfont icon-reply" v-on:click="showcommentPopup(1,item)">回复</i>
                </div>
               </div> 
               <div class="comment-item-content">
                <p>{{item.content}}</p> 
               </div>
               <div class="comment_two">
                   <div v-for="(item1, index1) in item.two">
                      <div><span class="name_color">{{item1.username}}</span> 回复 <span>{{item.username}}</span></div>
                      <div class="two_content">{{item1.content}}</div>
                      </div>
               </div>
          </div> 
         <div class="popup" v-show="commentstate">
           <div class="popup-content">
            <div class="popup-header clearfix">
             <h3>回复 {{commentusername}}</h3> 
             <i class="iconfont icon-close" v-on:click="closecommentPopup()"></i>
            </div> 
            <form class="pure-form pure-form-stacked">
             <div class="pure-g">
              <div class="pure-u-1">
               <textarea cols="30" rows="10"  v-model="commentContent" placeholder="回复内容" maxlength="1500" required="required" class="pure-input-1"></textarea>
              </div> 
              <div class="pure-u-1 text-right">
               <button type="button" class="btn btn-primary" v-on:click="submitComment(commenttype)">回复</button>
              </div>
             </div>
            </form>
           </div>
          </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../fetch/api';
import Alert from '../../components/Alert/index';
import comment from '../../components/comment.vue';
import uploader from '../../components/uploader.vue';
export default{
        components: {
            'comment':comment,
            'uploader':uploader
        },
        data(){
            return{
                isReply:false,
                picpath:this.$store.state.uploadpath,
                listshow:true,
                detailshow:true,
                uploadershow:false,
                piclist:[],
                curDate:[],
                imglist:[],
                state:'1',
                start:'1',
                limit:'10',
                title:'',
                content:'',
                Tags:[],
                ind:"",
                TagsData:[],
                TagObj:{},
                commentstate:false,
                onlineShow:false,
                Sz:[],
                commentList:[],
                commentContent:'',
                curryId:this.$route.query.id,
                commentusername:"",
                commenttype:"",
                commentListarr:[],
                parentid:"0",
                cuserid:"0"
            }
        },
        created() {
            this.$store.state.headshow=true;
            var data={
                   detailid:this.$route.query.id
                  }
                  var that=this;
                  api.GetcommunityDetail(data).then(function (response) {
                    if(response.code=="200"){
                      that.curDate=response.data.content[0];
                      that.commentList=response.data.commentlist;
                    }               
                  })
                 .catch(function (error) {
                  console.log(error);
                 });
        },
        methods: {
            showPopup() {
              this.uploadershow=true;
            },
            closePopup() {
              this.uploadershow=false;
            },
            UrLChange(url){
             window.open(url);
             
            },
            showcommentPopup(type,item) {
              this.commentstate=true;
              this.commenttype=type;
              this.commentusername=item.username; 
              if(type==1) {
                  this.parentid=item.cid; 
                  this.cuserid=item.userid;
              }
             
            },
            golike(){
               var data={
                   detailid:this.$route.query.id
                  }
                  var that=this;
                  api.GetcommunityDetail(data).then(function (response) {
                    if(response.code=="200"){
                      that.curDate=response.data.content[0];
                      that.commentList=response.data.commentlist;
                    }               
                  })
                 .catch(function (error) {
                  console.log(error);
                 });
            },
            gonolike(){
               var data={
                   detailid:this.$route.query.id,
                   userid:'0'
                  }
                  var that=this;
                  api.GetcommunityDetail(data).then(function (response) {
                    if(response.code=="200"){
                      that.curDate=response.data.content[0];
                      that.commentList=response.data.commentlist;
                    }               
                  })
                 .catch(function (error) {
                  console.log(error);
                 });
            },
            closecommentPopup() {
              this.commentstate=false;
            },
            firstimg(url){
              var srcObj=JSON.parse(url)
               var firstimg=srcObj[0];
               var that=this;
               if (firstimg !== undefined) {
                 return that.picpath+firstimg;
               }
            },
            userInfoImage(){
                var that=this;
                var srcimg=this.$store.state.userinfo.userpic;
              if (srcimg !== undefined) {
                 return this.$store.state.userpicUrl+srcimg;
               }
            },
            userImageUrl(srcUrl) {
              var that=this;
              
              if (srcUrl !== undefined) {
                 return this.$store.state.userpicUrl+srcUrl;
               }
            },
            attachImageUrl(srcUrl) {
              var that=this;
              if (srcUrl !== undefined) {
                 return that.picpath+srcUrl;
               }
            },
            attachTags(tagsname){
              var tagsHtml="";
              var tagsArr=JSON.parse(tagsname);
              for (var i=0;i<tagsArr.length;i++){
                 tagsHtml+="<i>"+tagsArr[i]+"</i>";
              }
              return tagsHtml; 
            },
            jsonChange(string) {
              if (string) {
                 return JSON.parse(string);
               }
            },
            submitComment(type){
                 var data={
                   userid:this.$store.state.userinfo.id,
                   detailid:this.curryId,
                   parentid:this.parentid,
                   cuserid:this.cuserid,
                   content:this.commentContent,
                   type:type
                  }
                  var that=this;
                  api.Comment(data).then(function (response) {

                    if(response.code=="200"){
                      Alert({
                          content: '评论成功'
                      })
                      that.commentstate=false;
                      if(type==0){
                         that.commentList[that.commentList.length]={
                             userid:that.$store.state.userinfo.id,
                             detailid:that.curryId,
                             parentid:that.$store.state.userinfo.id,
                             cuserid:that.cuserid,
                             content:that.commentContent,
                             type:type
                            }
                      }else if(type==1){

                        for(var i=0;i<that.commentList.length;i++){
                          
                            if(that.commentList[i].cid==that.parentid){
                               that.commentList[i].two[that.commentList[i].two.length]=data;
                            }
                        }
                      }
                    }else{
                       Alert({
                          content: response.msg
                        })
                    }
                
                  })
                 .catch(function (error) {
                  console.log(error);
                 });
            },
            upload(){
            var imgData=this.$store.state.files;
            this.TagsData=[];
            for(var key in this.TagObj){
                 if(this.TagObj[key].active==1){
                     this.TagsData[this.TagsData.length]=this.TagObj[key].name;
                 }
            }
            var data={
                userid:this.$store.state.userinfo.id,
                title:this.title,
                content:this.content,
                imgData:imgData,
                tagsname:JSON.stringify(this.TagsData),
                groupid:'1'
              }
              if(!this.$store.state.userinfo.id){
                var _this=this;
                setTimeout(function(){
                                const url = 'login';
                                _this.$router.push({"path":url});
                },1000)
              }
              if(this.title == null ||this.title== undefined ||this.title==''){
                       alert('标题不能为空');
                       return;
              }
              if(this.content == null ||this.content== undefined ||this.content==''){
                       alert('内容不能为空');
                       return;
              }
              if(this.content == null ||this.content== undefined ||this.content==''){
                alert('还未添加图片');
                return;
              }
              var that=this;
              api.PicUpload(data).then(function (response) {
                if(response.code=="200"){
                      Alert({
                          content:"发布成功"
                        })
                  that.uploadershow=false;
              }
        
              })
               .catch(function (error) {
                console.log(error);
              });
      
          }
        }
    }


</script>
<style>
@import '../../assets/css/xzb/xzb.css';
@import '../../assets/css/public/all.css';
@import '../../assets/css/xzb/pure-min.css';
@import '../../assets/css/xzb/font.css';
.community_list{
   margin: 0px auto;
    max-width: 1100px;
    padding: 0 10px;
    overflow: hidden;
    }
.xzb{
  text-align:left;
  line-height:24px;
}
.imglist li{
  float:left;
}
.index-content{
  margin-top:30px;
}
.topic{
  text-align:left;
  font-family: PingFang SC,Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans;
    color: #fff;
}
.imglist img{
  width:200px;
  height:200px;
  margin-right:10px;
}
.sy-btn{
      display:block;
      background-color: #2d3033;
      color:#fff;
      padding:10px;
      margin:1rem auto;
      border: 1px solid transparent;
     border-radius: 3px;
     outline: none;
}
.community_online{
  text-align:left;
  margin-bottom:16px;
}
.channels-wrap{
  color:#333;
}
.topic-meta a{
  color:#333;
}

.topics-comments a{
  color:#333;
}
.community_select{
  overflow:hidden;
  background-color: #404346;
  color:#fff;
  height:50px;
  margin:10px 0px;
}
.seclect_left{
   float:left;
   width:50%;
}
.community_select .seclect_right{
   float:right;
   width:50%;
}
.seclect_left p{
  line-height:50px;
  padding-left:20px;
}
.select_type{
  float:right;
  width:160px;
  height:30px;
  margin-top:10px;
  margin-right:10px;
  color:#404346;
  }
  .select_type option{
    background-color:#fff;
  }
  .select_text{
    float:right;
    line-height:50px;
    margin-right:5px;
  }
  .topic-article{
     color:#fff;
  }
  .topic-username{
    color:#fff;
  }
  .topics-comments{
    color:#fff;
  }
  .comment-item-head .topic-avatar{
    margin-top:16px;
  }
  .name_color{
    color: #189adb;
  }
  .two_content{
     padding-left:20px;
     padding:10px 0px;
  }

@media only screen and ( max-width: 800px ) {
  .topic .topic-article {
    margin-bottom: 1rem;
    padding: 10px;
 
  }
}
.topic-article{
  position:relative;
  top:0px;
  left:0px;
}
.article_like{
  position:absolute;
  top:8px;
  right:0px;
}

.article_like .button{
  padding: 10px 16px;
  background-color: #5C6166;
color: #FFF;
}
.detail_title{
   padding: 50px 0 5px;
   border-bottom: 1px solid rgba(0,0,0,.1)
}
.url_origin{
   float:right;
}
  
</style>


