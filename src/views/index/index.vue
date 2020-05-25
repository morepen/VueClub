<template>
<div class="news">
     <Header :TabState="7"></Header>
     <Content></Content>
     <Adv></Adv>

   
     
     <Footer></Footer>
   
</div>
</template>
<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
  import mqtt from 'mqtt';  
  import Header from '@/components/header.vue'
  import Adv from '@/components/adv.vue'
  import Content from '@/components/Content.vue'
  import Footer from '@/components/footer.vue'
  export default{
    components: {Header,Content,Footer,Adv},
    data(){
      return{
        hosturl:this.$store.state.hosturl,
        show1:true,
        isNowPage: true,
        ip:'',
        cityname:'',
        ipArr:[],
        popupshow:true
      }
    },
    created() {
      this.ip=localStorage.getItem('Ip');
      this.cityname=localStorage.getItem('cityname');
      //this.online();
      
    },
    methods: {
      closePopup() {
              this.popupshow=false;
      },
      online:function(){
        var that=this;
        var client  = mqtt.connect('ws://111.229.255.97:19002/mqtt')
        var _uuid=this.getuuid();
        client.on('connect', function () {
          client.subscribe('logn', function (err) {
            if (!err) {
              
              console.log("订阅成功");
            }
          })
        })
         var message = {
                Type: 'pc',
                uuid:_uuid,
                ip:that.ip,
                Content: that.ip+'刚刚访问了网站'
          };
          client.publish('logn', JSON.stringify(message),function(){
              console.log("发布成功");
          });
        client.on('message', function (topic, message) {
          // message is Buffer
        
          var result=JSON.parse(message.toString());
          var _ip=result.ip;          
          if(that.ipArr.indexOf(_ip)==-1){
              that.ipArr.push(_ip);
          }
          var _content=result.Content; 
          that.$notify({
                              title: '成功',
                              message: _content,
                              type: 'success'
          });  

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
 
 .app_code{
   width:100px;
   height:100px;
 }
 .popup{
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
    background: rgba(0,0,0,.65);
}
.welcome{
   width:360px;
   height:428px;
   position:absolute;
   top:20%;
   left:50%;
   margin-left:-180px;
   text-align:center;
}
.welcome img{
   width:300px;
   height:356px;

}
.close_btn{
  width:120px;
  margin:20px auto;
  line-height:30px;
  color:#fff;
  text-align:center;
  border:#fff solid 1px;
  border-radius:3px;
}
</style>


