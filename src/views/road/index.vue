<template>
  <div class="road">
   <Header :TabState="5"></Header>
   <div class="layui-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="road_box">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/RoadIndex' }">功能测试</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/RoadIndex' }">功能列表</el-breadcrumb-item>
    </el-breadcrumb>
   <ul class="road_ul">
     <li>
       <div class="road_title">发布PC端广播通知</div>
       <el-row :gutter="10" type="flex" class="row-bg el-row-two" justify="space-between">
                  <el-col :span="3"><div class="grid-content hd_text">广播内容：</div></el-col>
                  <el-col :span="18"><div class="grid-content "><el-input v-model="broadcast" placeholder="请输入广播内容"></el-input></div></el-col>
                  <el-col :span="3"><div class="grid-content hd_text"></div></el-col>

       </el-row>
       <div class="bocast_tip">*需将https切换成http下使用*</div>
       <div class="road_btn1" v-on:click="sendMqtt()">发布PC端广播通知</div>
       
      
     </li>
     <li>
       <div class="road_title">发布APP端广播通知</div>
        <el-row :gutter="10" type="flex" class="row-bg el-row-two" justify="space-between">
                  <el-col :span="3"><div class="grid-content hd_text">广播内容：</div></el-col>
                  <el-col :span="18"><div class="grid-content "><el-input v-model="broadcast1" placeholder="请输入广播内容"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content hd_text"></div></el-col>
       </el-row>
       <div class="bocast_tip">*在首页下载APP,查看APP通知*</div>
       <div class="road_btn1" v-on:click="sendMqtt1()">发布APP端广播通知</div>
     </li>
     <li>
       <div class="road_title">小程序-陆羽商城</div>
       <div class="road_js">简述：微信小程序中搜索陆羽商城</div>
       <div class="road_btn1"><a href="http://www.hdhome.net/">前往</a></div>
     </li>
     <li>
       <div class="road_title">新闻页面</div>
       <div class="road_js">简述：爬取相关新闻</div>
       <div class="road_btn1"><router-link to="/news">前往</router-link></div>
     </li>
   </ul>
   </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
import Header from '@/components/header.vue'
import Axios from "axios"
import qs from "qs"
export default {
  components: {Header},
  mounted(){
  
  },
  data() {
    return {
      piclist:[],
      dialogVisible: false,
      ip:"",
      broadcast:"",
      broadcast1:""
     
    }
  },
  created() {
    
      this.ip=localStorage.getItem('Ip');      
                      
           
  },
  methods: {
    sendMqtt:function(){
        var that=this;
        var _url="/mqtt_send1";
        var params={
            ip:that.ip,
            type:"pc",
            content:that.broadcast
        };
        Axios.post(_url, qs.stringify(params))
            .then(response => {
                if(response.data.code==200){
                   that.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                }else{
                  that.$message.error("操作失败");
                }
            }, err => {
                console.log(err);
            })
            .catch((error) => {
                console.log(err);
            })
    },
    sendMqtt1:function(){
        var that=this;
        var _url="/mqtt_send1";
        var params={
            ip:that.ip,
            type:"app",
            content:that.broadcast1
        };
        Axios.post(_url, qs.stringify(params))
            .then(response => {
                 if(response.data.code==200){
                   that.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                }else{
                  that.$message.error("操作失败");
                }
            }, err => {
                console.log(err);
            })
            .catch((error) => {
                console.log(err);
            })
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
  margin-top:30px;
  padding-left:20px;
}
.road_ul li{
 
  color:#333;
  border:#eee solid 1px;
  height:220px;
  margin-top:30px;
  position:relative;
}
.road_title{
  font-size:28px;
  color:#333;
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
  left:60px;
  bottom:24px;
  padding:0 16px;
  line-height:36px;
  border-radius:18px;
  color:#fff;
  background:#03b349;
  text-align:center;
}
.road_btn2{
  position:absolute;
  right:260px;
  bottom:24px;
  width:100px;
  line-height:36px;
  border-radius:18px;
  background:#fff;
  color:#03b349;
  text-align:center;
}
.hd_text{
   text-align:right;
    padding-top:20px;
}
.bocast_tip{
   font-size:10px;
   padding-left:70px;
   padding-top:16px;
}
.road_btn1 a{
   color:#fff
}
</style>
