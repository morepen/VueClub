<template>
  <div class="road">
   <Header :TabState="6"></Header>
   <div class="layui-container">
           <div class="supply_box">
              <div class="supply_title">最新{{supplytext}}</div>         
              <div class="handle_btn1" v-on:click="showPopup(1)">发布{{supplytext}}</div>
            </div>
          <div class="supply_item" v-for="item in piclist">
          <div class="go_detail"><i class="layui-icon layui-icon-reply-fill"></i></div>
          <div class="user_info">
            <span class="user_img"><img src="../../assets/defaultuser.jpg"></span>
            <div class="user_text">
              <div class="user_name">游客_wx0716</div>
              <div class="create_time">2020.02.14 9:00</div>
            </div>
          </div>
          <router-link :to="{path:'/communitydetail',query: {id: item.id}}"><div class="pic_content">{{item.content}}</div></router-link>
          <div class="pic_item">
             <img v-gallery:group1
              class="thumbnail"
              v-for="img in jsonChange(item.pics)"
              :src="attachImageUrl(img)"
              >
          </div>
         
        </div>
       
         




      


       
   </div>
    <div class="popup" v-show="uploadershow">
           <div class="popup-content">
            <div class="popup-header clearfix">
             <div>发布{{supplytext}}</div> 
             <img src="../../assets/close.png" class="close_write" v-on:click="closePopup()">
            </div> 
            <form class="pure-form pure-form-stacked">
             <div class="pure-g">
              <div class="pure-u-1">
               <textarea cols="30" rows="8" placeholder="请输入内容" maxlength="1500" required="required" class="hd_content" v-model="content"></textarea>
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
import Header from '@/components/header.vue'
import uploader from '@/components/uploader.vue';
import Alert from '../../components/Alert'
export default {
  components: {Header,uploader},
  mounted(){
  
  },
  data() {
    return {
      piclist:[],
      piclist1:[],
      dialogVisible: false,
      uploadershow:false,
      desktype:this.$route.query.type,
      uploadpath:'https://www.hdhome.net/upload/',
      content:'',
      isNoRecord:false,
      supplytype:'',
      supplytext:'',
      deskid:'-1',
      supplytext:'',
      supplytype:1
     
    }
  },
  created() {
    
    this.GetSupplyList();
  
                      
           
  },
  watch:{
      desktype: {
    　　handler(newName, oldName) {
          this.supplytype=newName;
      　　if(newName==1){
                this.supplytext="需求";
                this.deskid="98";

           }else if(newName==2){
                this.supplytext="供求";
                this.deskid="99";
           }
    　　},
    　　immediate: true
    }
  },
  methods: {
    GetSupplyList(){
        var that=this;
        var params={
           deskid:that.deskid
        };
        this.$http.baseAction("PicServiceList",params)
            .then(response => {

                that.piclist=response.data; 
                if(that.piclist.length==0){
                   that.isNoRecord=true;
                   
                }
                
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
    },
    GetApplyList(){
        var that=this;
        var params={
           deskid:'99'
        };
        this.$http.baseAction("PicServiceList",params)
            .then(response => {

                that.piclist1=response.data; 
                if(that.piclist1.length==0){
                   that.isNoRecord=true;
                  
                }
                
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
            }) 
    },
    createPics:function(){
               var imgData='-1';
               var that=this;
               var _files=this.$store.state.files;
               if(_files.length>0){
                imgData=this.$store.state.files;
                }
                debugger;
               var _content=this.content+'(联系时请告知是在天门【陆羽通】便民服务平台上看到的信息)';

               var _deskid='-1';
               if(that.desktype==1){
                   _deskid='98';
               }else if(that.desktype==2){
                  _deskid='99';
               }


               var params={
                  userid:'-1',
                  content:_content,
                  imgData:imgData,
                  tagsname:'-1',
                  teamid:'-1',
                  zuid:'-1',
                  deskid:_deskid
                }
                debugger;
              if(this.content == null ||this.content== undefined ||this.content==''){
                       alert('内容不能为空');
                       return;
              }
           
              var that=this;
              this.$http.baseAction("PicUpload",params)
                .then(response => {
                    
                    if(response.code==200){

                        that.uploadershow=false;
                        if(that.supplytype==1){
                            id:response.data.insertId,
                            that.piclist[that.piclist.length]={
                            content:_content,
                            pics: response.data.path
                           };
                        }else if(that.supplytype==2){
                           that.piclist1[that.piclist.length]={
                            id:response.data.insertId,
                            content:_content,
                            pics: response.data.path
                           };
                        }
                       
                      that.content='';
                      that.$store.state.files=[];
                       Alert({
                          content:"发布成功！"
                        })
                    }
                }, err => {
                    console.log(err);
                })
                .catch((error) => {
                   console.log(error)
                }) 
             
    },
    showPopup(type) {
              this.supplytype=type;
              if(type==1){
                 this.deskid='98'
                 this.supplytext='需求';
              }else if(type==2){
                 this.deskid='99'
                 this.supplytext='供求';
              }
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
  top:6px;
  right:5px;
  width:100px;
  line-height:28px;
  border-radius:14px;
  background:#fff;
  color:#03b349;
  text-align:center;
  vertical-align: middle;
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
  background:#03b349;
  color:#fff;
  border-radius:3px;
  position:relative;
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
.go_detail{
   position:absolute;
   right:0px;
   bottom:0px;
   line-height:30px;
   padding:0 16px;
   color:#03b349;
   border-radius:15px;
}
.supply_box{
    position:relative;
    background: #03b349;
    color: #fff;
    line-height:40px;

}
.supply_title{
  padding-left:16px;
  vertical-align: middle;
}
.supply_item{
    overflow: hidden;
    margin-top: 16px;
    padding: 10px 16px;
    color: #333;
    border-radius: 3px;
    position: relative;
    border-bottom:#eee solid 1px;
}
.to_list{
  width:140px;
  margin:16px auto;
  line-height:36px;
  border-radius:18px;
  background:#03b349;
  color:#fff;
  text-align:center;
}
a{
  color:#333;
}
</style>
