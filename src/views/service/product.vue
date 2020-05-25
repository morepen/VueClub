<template>
  <div class="road">
  <Header :TabState="2"></Header>
  <div class="layui-container">
     
     
    <div v-for="items in DeskList">
     <div class="ul_head">{{items.developname}}</div>
     <ul class="service_ul">
       <li v-for="item in items.item">
         <div class="service_wrap">
             <div class="service_title">#{{item.title}}#</div>
             <div class="service_content">{{item.content}}</div>
             <div class="service_bottom">
                <span class="service_btn" @click="dialogVisible = true">关注活动</span>
                <router-link :to="{path:'/servicelist',query: {id: item.id,title:item.title,categoryid:item.categoryid,developid:item.developid}}"><span class="service_btn">进入主题</span></router-link>
             </div>
         </div>
       </li>
     </ul>


    </div>




     
    
  </div>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="280px"
  >
  <div class="wx_tip">扫码关注公众号,查看最新活动</div>
  <img class="wx_welcome" src="https://www.hdhome.net/source/image/wx.jpg">
  <span slot="footer" class="dialog-footer">
    
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
import Header from '@/components/header.vue'
import uploader from '@/components/uploader.vue';
export default {
  components: {Header},
  mounted(){
  
  },
  data() {
    return {
      piclist:[],
      developid:this.$route.query.developid,
      dialogVisible: false,
      DeskList:[]

     
    }
  },
  created() {
    
     this.GetDeskList();         
                      
           
  },
  methods: {
    GetDeskList(){
        var that=this;
        var params={
          developid:this.developid
        };
        this.$http.baseAction("DeskList",params)
            .then(response => {
                debugger;
                var _list=response.data;
                 var moth = [],
                  flag = 0,
                  list = _list;
              var wdy = {
                  developid: '',
                  developname:'',
                  item: ''
              }
              for (var i = 0; i < list.length; i++) {
                  var az = '';
                  for (var j = 0; j < moth.length; j++) {
                      if (moth[j].developid == list[i]['developid']) {
                          flag = 1;
                          az = j;
                          break;
                      }
                  }
                  if (flag == 1) {
                      var ab = moth[az];
                      ab.item.push(list[i]);
                      flag = 0;

                  } else if (flag == 0) {
                      wdy = {};
                      wdy.developid = list[i]['developid'];
                      wdy.developname = list[i]['developname'];
                      wdy.item = new Array();
                      wdy.item.push(list[i]);
                      moth.push(wdy);
                  }
              }

             console.log(moth);
             that.DeskList=moth;
                
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
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
.service_ul li{
  width:50%;
  float:left;
  list-style:none;
}
.service_wrap{
  margin:20px;
  background:#fff;
  border-radius:5px;
  color:#333;
  padding:36px 20px 50px 20px;
  height:120px;
  position:relative;
}
.service_title{
  font-size:24px;
}
.service_content{
  text-indent: 1em;
  padding-top:30px;
}
.service_bottom{
  position:absolute;
  left:0px;
  bottom:0px;
  width:100%;
}
.service_btn{
  float:right;
  padding:0px 16px;
  line-height:36px;
  border-radius:18px;
  display:inline-block;
  background:#03b349;
  color:#fff;
  margin-bottom:16px;
  margin-right:20px;
}
.wx_welcome{
  width:80%;
  margin-left:10%;
}
.wx_tip{
   text-align:center;
   line-height:40px;
   color:#333;
   font-size:16px;
}
.road{
  background:#f7f7f7;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
}
.service_ul{
  overflow:hidden;
}
.ul_head{
  border-left:#03b349 solid 3px;
  padding-left:16px;
  margin-left:20px;
  margin-top:16px;
  line-height: 20px;
}
.el-dialog{
  width:200px!important;
}
.el-dialog__footer{
  padding:0px 0px 30px 0px!important;
}
.el-button+.el-button{
  margin-right: 10px;
}
</style>
