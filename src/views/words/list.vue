<template>

 <div>
 <Header :TabState="4"></Header>
 <div class="pocketlist">
  <div class="content_wrap">
  <div class="p1" v-show="p1">
   <div class="wrap">

   <div role="main" class="content">

    <div id="onlineCount">
     <span id="number"></span>
     <span id="action"></span>
    </div>
   
    <div id="drop_zone" data-bucket="perber" class="chat-input">
     <div class="ui form">
      <div class="field">
       <textarea placeholder="书中经典句子....." v-model="content" maxlength="240"></textarea>
       <div class="upload_extend"><div class="url_text">来源书籍:<input class="url" v-model="url" name="url" type="text"  value=""></div></div>
      </div>
        <ul id="Tips">
     <li v-on:click="page3()">发表</li>
    </ul>
     </div>
     <div id="upimg"></div>
    </div>
    <div class="chat-list" >
     
     <div class="chat" style="position: relative;">
      <div data-id="10575" class="chat-box" v-for="(item, index) in piclist">
       
       <div class="en inner box_item">
          <p>{{item.word}}</p>
          <div class="wordfrom">---来源于《{{item.wordfrom}}》</div>
          <div class="info">2 days ago<b class="location"><i class="fa fa-globe"></i>武汉</b></div>

        </div>
       
      </div>
     </div>
    </div>
   </div>
     </div>
   </div>
   <div class="p2" v-show="p2">
       <div class="p2_main">
           <div class="p2_title">Pocket</div>
           <div class="p2_content">
             这是一个收集一些奇思妙想的网站。如果当日发酵度(点赞数量）没有超过3次，次日将被清除，当月发酵度没有超过10次，次月将被清除。就是这样。
           </div>
       </div>
       
   </div>
   <div class="p3" v-show="p3">
     <div class="p2_main">
           <div class="p2_title">Pocket</div>
           <div class="p2_content">
             这是一个收集一些树洞或奇思妙想的网站。如果当日发酵度(点赞数量）没有超过3次，次日将被清除，当月发酵度没有超过10次，次月将被清除。就是这样。
           </div>
       </div>
   </div>
   <div class="intro-wrap">
     <div class="intro-wrap-close" v-show="isclose" v-on:click="closepage">x</div>
   </div>
   </div>
   <div class="footer_wrap">
       <div id="footer"><div class="logo"><a href="/"><i class="fa fa-dot-circle-o"></i><span>Perber</span></a></div><p>Made with ❤ by <a href="" target="_blank">D.M</a> 2018 - 2018</p></div>
    </div>
 </div>
</div>
</template>

<script>
  import Alert from '../../components/Alert'
  import Header from '@/components/header.vue'
  export default{
        components: {
         Header
        },
        data(){
            return{
                p1:true,
                p2:false,
                p3:false,
                isclose:false,
                ipInfo:[],
                content:'',
                piclist:[],
                url:'个人杜撰',
                timestamp:(new Date()).getTime()
            }
        },
        created() {
           //this.getIp(); 
           this.$store.state.headshow=false;
           this.getlist();                     
        },
        mounted: function () {         
        },
        methods: {
            getsocket(){
                    this.content=555;
                    this.socket = io.connect("http://116.196.81.196:3000/");
                    var _this=this;
                    this.socket.on('news', function (data) {
                        _this.userlist=data['db'];
                        _this.$store.state.onlinenum=data['db'].length;
                        var string = "";
                        for(i = 0; i < data['length']; i++){
                            console.log(data['db'][i]['username']);
                            string += '<h4>' + data['db'][i]['username'] + '</h4>';
                        }
                   
                    })
            },
            getIp(){
                jsonp('http://pv.sohu.com/cityjson',{ie:'utf-8'}, function (err, data) {
                       
                    });
            },

            page2(){
              this.p1=false;
              this.p2=true;
              this.p3=false;
              this.isclose=true;
            },
            page3(){
              this.upload();              
            },
            closepage(){

              this.p1=true;
              this.p2=false;
              this.p3=false;
              this.isclose=false;
            },
            getlist(){
                var data={
                   tagid:'0',
                   state:'0',
                   start:'0',
                   limit:'16'
            }
            var that=this;
            var params={};
            this.$http.baseAction("WordList",params)
            .then(function (response) {
                    if(response.code=="200"){
                        that.piclist=response.data; 
                                
                                             
                    }
                
                  })
            .catch(function (error) {
                  console.log(error);
            });
            },
            upload(){
              var params={
                userid:'0',
                title:"推荐",
                word:this.content,
                imgData:"",
                tagid:0,
                timestamp:this.timestamp,
                url:this.url,
                tagsname:"推荐"
              }
              if(this.content == null ||this.content== undefined ||this.content==''){
                       alert('内容不能为空');
                       return;
              }
              var that=this;
              debugger;
              this.$http.baseAction("CreateWord",params)
              .then(function (response) {
                if(response.code=="200"){


                      that.piclist.push({
                        picid:response.data.insertId,
                        userid:'',
                        title:'',
                        word:that.content,
                        wordfrom:that.url,
                        imgData:'',
                        tagsname:'',
                        teamid:'',
                        zuid:''
                      });
                      that.content="";
                      Alert({
                          content:"发布成功"
                        })
                    
                      
                     
              }
        
              }).catch(function (error) {
                console.log(error);
              });
            },
            attachImageUrl(srcUrl) {
              var that=this;              
              if (srcUrl !== undefined) {
                 return this.$store.state.userpicUrl+srcUrl;
               }
            }    
        }
   }
</script>
<style>
@import '../../assets/template/pocket/perber.css';
.pocketlist{
  height:100%;
  background: #e5e4db;
}
.fa{
  color:#fff;
  line-height:56px;
}

.p2_main{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-25%;
  margin-left:-40%;
  width:80%;
  height:50%;
    line-height:36px;
    text-align:left;
}
.p2_title{
  height:36px;
   padding-bottom:10px;
   font-size: 50px;
    font-weight: 200;
    letter-spacing: 1px;
    font-family: "Roboto", "Open Sans", "Helvetica Neue";
}
.p2_content{ 
   line-height:36px;
   padding-bottom:16px;
   border-bottom: 1px solid #cecdc5;


}
#vote_bar a{
  padding:10px 16px;
  margin-top:20px;
  
}
.box_item{
  font-size: 13px;
  height:120px;
  padding:16px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    position:relative;
}
.box_item1{
  text-indent: 0;
    position: relative;
    line-height: 24px;
    font-size: 13px;
    color: #333;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.content_wrap{
  margin-bottom:40px;
}
.footer_wrap{
  position:relative;
}
.field{
  position:relative;
  height:112px;
  margin-right:54px;
}
.upload_extend{
  width:100%;
  position:absolute;
  bottom:0px;
  left:0px;
  height:26px;
  line-height:26px;
  background:#fff;
}
.url{
border:0px;
border-bottom:#ccc solid 1px;
padding-left:10px;
width:170px;}
.url_text{
  width:250px;
  float:right;
}
#important{
  margin-top:60px;
}

.wordfrom{
  
  position:absolute;
  bottom:30px;
  right:3px;
}
</style>
