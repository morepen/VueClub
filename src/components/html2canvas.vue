<template>
  <div>
    <div class="cont" ref="box" v-if="isShow">
        <div class="cover_wrap"><img class="cover_canvas" :src="message.coverimage"></div>
        <div class="page_date">
            <div>{{time.year}}年</div>
            <div>{{time.month}}月{{time.day}}日星期{{time.week}}</div>
            <div>{{nltime}}</div>
          
          
        </div>
        <div class="morning">
          <div class="m1">早</div>
          <div class="m2">安</div>
        </div>
        
        <div class="cover_li2">
       
              <canvas id="canvas"></canvas>
             
        </div>
        <div class="gold_word">{{this.message.glodword}}</div>
        <div class="wordfrom">----《{{this.message.wordfrom}}》</div>
      
     </div>
   
      <img :src="imgUrl" id="resultImg">
   
  </div>
</template>
   
<script>
//import QRCode from 'qrcodejs2'  // 引入qrcode
import QRCode from 'qrcode'  // 引入qrcode
import html2canvas from 'html2canvas'
import HcDate from '../utils/date.js';
export default {
  name : 'test',
  props: ["message"],
  data(){
      return{
        imgUrl:'',
        imgUrl1:'',
        canvas:'',
        newSrc:'',
        isShow:true,
        imgCanvas:'',
        nowtime:'',
        time:{},
        nltime:'农历腊月十五'

      }
  },
  mounted () {
    this.initQrcode();
    //this.qrcode();
    //this.drawImage();
  },
  created() {
    var a=HcDate.showDate();
    this.nltime=a;

    var date = new Date();
    this.nowtime=date.getFullYear()+"年"+(date .getMonth()+1)+"月"+date .getDate()+"日";
    var today=new Date(); 
 
    this.time['year']=today.getFullYear();
    this.time['month']=today.getMonth()+1;
    this.time['day']=today.getDate();

    var a = ["日", "一", "二", "三", "四", "五", "六"]; 
    var week = new Date().getDay(); 
    this.time['week']=a[week];

      
  },
  methods: {
    initQrcode() { 
      var that=this;
        var url='https://www.hdhome.net/detail.html?id='+this.message.id;
        QRCode.toCanvas(canvas, url, function (error,url){
            if (error) {
              console.log(error);
            } else {
              
            }

        }) 

        if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
           html2canvas(that.$refs.box,{
           useCORS:true,
           width:350,
           height:557,
           windowWidth:350,
           windowHeight:557,
           x:0,
           y:window.pageYoffset,
           scale: window.devicePixelRatio*2, // 默认值是window.devicePixelRatio
           backgroundColor: null,
            logging: false
          }).then(function(canvas) {
                          // 微信内置浏览器  安卓不支持分享及保存该图片
                          //that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL("image/png")))
                          that.isShow=false;
                          that.imgUrl = canvas.toDataURL("image/png")

                          debugger;
          });
     

        }else{
           html2canvas(that.$refs.box,{
           useCORS:true,
           width:350,
           height:557,
           windowWidth:350,
           windowHeight:557,
           x:0,
           y:window.pageYoffset,
           backgroundColor: null,
           logging: false
          }).then(function(canvas) {
                          // 微信内置浏览器  安卓不支持分享及保存该图片
                          //that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL("image/png")))
                          that.isShow=false;
                          that.imgUrl = canvas.toDataURL("image/png")

                         
          });
        }
       
            
     
    },
    qrcode() {
      var that=this;
      var canvas = document.getElementById('canvas')
      QRCode.toImage(canvas, 'sample text', function (error, url) {
        if (error) console.error(error)
         that.imgUrl = url.toDataURL("image/png")
        console.log(url);
        debugger;
      })
    },
    drawImage(){
                var that=this;
                var screen_width=355;
                var screen_height=597;
                var imageBox = document.getElementById("newimage");
                var text1='活动时间: '+this.message.starttime+'~'+this.message.endtime;
                var text2='活动地点: '+this.message.address;
                let canvas = document.createElement('canvas'),cxt = canvas.getContext('2d');
                canvas.width =screen_width;
                canvas.height =screen_height;
                
                cxt.rect(0, 0, screen_width, screen_height);
                cxt.fillStyle = '#ecffce'; // 填充颜色
                cxt.fill();


                var img = new Image();
                //img.src =this.message.coverimage;
               
                //img.src = require('../assets/test1.png')
              
                img.crossOrigin="anonymous"; //关键
                var img_width=218;
                var img_height=img.height;
               
                var img2 = new Image();
                //img2.src = require('../assets/test2.png')
                img2.src =that.imgUrl;
                img2.crossOrigin="anonymous"; //关键
                // 图片加载完成，才可处理
                var cal_img_width=(screen_width-img_width)/2
                var cal_img_width2=(screen_width-132)/2
                img.onload = () => {
                  debugger;
                  img2.onload = () => {
                    // 画图(这里画布与图片等宽高)
                    this.height=30+"px";
                    this.width=30+"px"; 
                    cxt.drawImage(img,cal_img_width, 150,218,120);
                    cxt.drawImage(img2,cal_img_width2,screen_height-240,40,40);
                    cxt.font = "14px Microsoft YaHei"
                    cxt.textBaseline = 'middle'
                    cxt.textAlign = 'left'
                    cxt.fillStyle="#333"; 
                    cxt.fillText(text1, 10,screen_height-60);
                    cxt.fillText(text2, 10, screen_height-30);
                    debugger;
                    that.canvas=canvas;
                    imageBox.src = canvas.toDataURL("image/jpg")

                  } 
                }
    },
    download(){
         var a = document.createElement("a");
             a.href = this.imgUrl;
             var nowtime="美历"+new Date().getTime()+"期"
             a.download = nowtime+'.jpg';
             a.click()
          

    }
  }
}
</script>
<style scoped>
.cover_title{
  padding-left:10px;
  line-height:20px;
}
*{
  margin:0px;
  padding:0px;
}
.nltime{
  padding-top:20px;
}
.cont{
  width:355px;
  position:relative;
  height:587px;
  background:#fff;
}
.canvasWrap{
  text-align:center;
}
.canvasWrap img{
  border-radius:10px;
}
.cover_wrap{
  text-align:center;
  height:201px;
  width:100%;


}
.cover_canvas{
  position:absolute;
  top:20px;
  left:10px;
  width:90%;
  height:320px;
  
}
.cover_ul{
  overflow:hidden;
  position:absolute;
  left:10px;
  bottom:50px;
}
.cover_li1{
  float:left;
  width:60%;
}
.cover_li1_div{
  padding:15px 10px 10px 20px;
}
.cover_li2{
    position: absolute;
    bottom: 30px;
    right: 16px;
    width: 30%;
    text-align: center;
}
#canvas{
  width:80px!important;;
  height:80px!important;
  
}
#resultImg{
  width: 355px!important;
  height: 597px!important;
 }
 .page_date{
   position:absolute;
   bottom:175px;
   right:30px;
   text-align:right;
   line-height:22px;
 }
 .word_green{
   text-align:center;
   line-height:46px;
   color:#99cc66;
   font-weight:bold;
   font-size:24px;
 }

 .page_border{
    position:absolute;
    right:10px;
    top:0px;
    line-height:26px;
 }
 .t1{
   padding-top:3px;
 }
 .gold_word{
    text-align:left;
    margin-top:240px;
    text-indent:20px;
    padding:0 10px;
    line-height:20px;
 }
 .wordfrom{
   text-align:right;
   position:absolute;
   bottom: 60px;
   right: 110px;

 }
 .morning{
   position:absolute;
   top:250px;
   left:40px;
   font-size:70px;
   font-weight:bold;
  

   z-index:9999999;
 }
 .morning .m1{
   background:#fff;
   color:#333;
   width:90px;
   height:90px;
   line-height:90px;
   text-align:center;
 }
 .morning .m2{
   background:#50433a;
   color:#fff;
   width:90px;
   height:90px;
   line-height:90px;
   text-align:center;
 }
</style>