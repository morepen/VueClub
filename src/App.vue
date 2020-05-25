<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mqtt from 'mqtt'; 
export default{
    data(){
      return{
        show1:true,
        isNowPage: true,
        ip:'',
        cityname:'',
        ipArr:[],
        topic:"hdhome"
      }
    },
    created() {
      this.ip=localStorage.getItem('Ip');
      this.cityname=localStorage.getItem('cityname');
      //this.online();
      
    },
    methods: {
      online:function(){
        var that=this;
        var client  = mqtt.connect('ws://111.229.255.97:19002/mqtt')
        var _uuid=this.getuuid();
        client.on('connect', function () {
          client.subscribe(that.topic, function (err) {
            if (!err) {
              
              console.log("订阅成功");
            }
          })
        })
        client.on('message', function (topic, message) {
          // message is Buffer
          if(topic==that.topic){
            var result=JSON.parse(message.toString());
            var _ip=result.ip;          
            if(that.ipArr.indexOf(_ip)==-1){
                that.ipArr.push(_ip);
            }
            var _content=result.Content; 
            that.$notify({
                                title: '成功',
                                message: _ip+"刚刚发布一条公告，公告内容为："+_content,
                                type: 'success'
            }); 
          }
           
          
          client.end()
        })
      },
      getuuid() {
                var uid = [];
                var hexDigits = "0123456789abcdefghijklmnopqrst";
                for (var i = 0; i < 32; i++) {
                    uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                uid[6] = "4";
                uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
                var uuid = uid.join("");
                console.log("uid_"+uuid);
                return uuid;
      }
      
     

      
    }
  }
</script>

<style>
a{
  text-decoration:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:left;
  color: #2c3e50;
}
li{
	list-style:none;
	padding:0px;
	margin:0px;
}
ul{
  padding:0px;
  margin:0px;
}
 #app{
  height:100%;
 }
.newsList li{
    position:relative;
    top:0px;
    left:0px;
 }
 .creatcanves{
    position:absolute;
    bottom:30px;
    right:0px;
    color:#fff;
    font-size:14px;
    text-align:center;
    width:120px;
    line-height:36px;
    background:#03b349;
   
    border-radius:3px;
 }
 .centerbody_wrap{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color:rgba(0,0,0,0.6);
    z-index:99999999;
 }
 .centerbody{
   width:355px;
   height:647px;
   padding-top:10px;
   padding-left:10px;
   padding-right:10px;
   margin:20px auto;
   background-color:rgba(255,255,255,1);
   border-radius:10px;
 }
 .btn_ul li{
   width:50%;
   float:left;
 }
 .btn_no{
    float:right;
    margin-top:10px;
    margin-right:20px;
    color:#03b349;
    font-size:14px;
    text-align:center;
    width:80px;
    line-height:30px;
    border:#03b349 solid 1px;
    background:#fff;
    border-radius:3px;
 }
 .btn_yes{
    float:left;
    margin-top:10px;
    margin-left:20px;
    color:#fff;
    font-size:14px;
    text-align:center;
    width:80px;
    line-height:30px;
    border:#03b349 solid 1px;
    background:#03b349;
    border-radius:3px;
 }
 .loadmore{
   width: 140px;
   margin:0 auto;
   line-height:36px;
   background: #03b349;
   color:#fff;
 }
 .layui-container{
   position:relative;
 }
 .no_record{
 text-align:center;
 line-height:100px;
 color:#999;
 }
 .el-button--primary{
    color: #FFF;
    background-color: #03b349!important;
    border-color: #03b349!important;
 }
 @media screen and (max-width: 767px){

  .layui-container{
    width:100%!important;
  }
  .service_ul li{
    width:100%!important;
  }

 }
</style>
