<template>
<div class="layui-container news-list news-index">
  <div class="layui-row layui-col-space20 contentBot">
    <div class="layui-col-md8 index-list">
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">

          <li :class="{'layui-this':tagid ==-1}" v-on:click='selectTag("-1","-1")'>全部</li>
          <li v-for="(item,key) in taglist" v-on:click='selectTag(item.id)' :class="{'layui-this':tagid ==item.id}" >{{item.name}}</li>
        </ul>
       
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <vue-loading v-show="isloading"></vue-loading>
            <div v-show="listshow==true">
            <ul class="newsList" v-show="isloading==false&&listshow">
              <li v-for="item in piclist">
                <router-link :to="{path:'/articleDetail',query: {id: item.id}}">
                <a class="img" href="javascript:;"><el-image :src="this.$store.state.hosturl+item.coverimage" lazy></el-image></a><div class="txt">
                  <a href="javascript:;">{{item.title}}</a>
                  <div class="label"><span class="cyan">{{item.tag}}</span>天门周伯通 <b>2018-06-07</b></div>
                  <p class="cont">地址：{{item.address}}</p>
                </div>
                </router-link>
                <div class="creatcanves" @click="showNewsprint(item)">打早卡</div>
              </li> 
            </ul>
             <div class="btn"><a href="javascript:;" class="layui-btn layui-btn-primary">点击加载更多</a></div>
            </div>

             <div v-show="listshow==false">
             <div class="no_record">暂无数据</div>
             
            </div> 
          </div>
          <div class="layui-tab-item">
            <ul class="newsList">
              <li>
                <a class="img" href="javascript:;"><img src=""></a><div class="txt">
                  <a href="detail.html">拿iPhone X玩王者荣耀是一种怎样的体验？</a>
                  <div class="label"><span class="cyan">科技</span>爱科学 <b>2018-06-07</b> <i class="layui-icon layui-icon-news-review1"></i>200</div>
                  <p class="cont">说起苹果的iPhone手机，绝对是《王者荣耀》的最强搭档。哪怕是三年前只有1GB内存的iPhone6，跑《王者荣耀》都...</p>
                </div>
              </li>
              
            </ul>

             
           
            
          </div>
        </div>
      </div>
    </div>
    <div class="layui-col-md4 index-side">
      <div class="newsSide">
        <h2>24小时热文</h2>
        <ul>
          <li><a href="javascript:;"><span><el-image :src="hotlist.coverimage" lazy></el-image></span><p class="txt">{{hotlist.title}}</p></a></li>
        </ul>
      </div>
    </div>
    <div id="silde"><a id="refresh"><i class="layui-icon layui-icon-refresh"></i></a><a id="scroll"><i class="layui-icon layui-icon-up"></i></a></div>
  </div>


  <div class="centerbody_wrap" v-if="isNewsprint">
   <div class="centerbody">
      <html2canvas :message="this.curItem" ref="mychild"></html2canvas>
      <ul class="btn_ul">
         <li><div class="btn_no" @click="hideNewsprint()">关闭</div></li>
         <li><div class="btn_yes" @click="download()">长按保存</div></li>
      </ul>
    </div>
  </div>  
</div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
  import vueLoading from './loading.vue'
  import html2canvas from './html2canvas.vue'
  export default{
    components: {
      vueLoading,html2canvas    
    },
    data(){
      return{
        curItem:{},
        isloading:true,
        piclist:[],
        isNewsprint:false,
        taglist:[],
        piclist:[],
        hotlist:{},
        listshow:false,
        TabState:this.$route.query.tagid,
        tagid:this.$route.query.tagid,
        isNewsprint:false


      }
    },
    created() {
      this.GetTagsList();  
    
      
    },
    watch:{
      tagid:function(val){
         debugger;
         this.selectTag(val);
      }
    },
    methods: {
      GetTagsList(){
        var that=this;
        var params={
        };
        this.$http.baseAction("TagsList",params).then(function (response) {
                    
                    if(response.code=="200"){
                       
                         that.taglist=response.data; 
                         debugger;
                         that.selectTag(that.tagid);
                                             
                    }
                
                  })
            .catch(function (error) {
                  console.log(error);
            });
     },
     selectTag(id){
       var that=this;
       that.tagid=id;
        var params={
          tagid:id
        };
        debugger;
        this.$http.baseAction("ArticleList",params)
            .then(response => {
                debugger;
                if(response.code==200)
                if(response.data.length>0){
                  that.listshow=true;
                  that.piclist=response.data; 
                  that.hotlist=response.data[0];
                }else{
                  that.listshow=false; 
                }
                
                that.isloading=false;
                
            }, err => {
                console.log(err);
            })
            .catch((error) => {
               console.log(error)
        })









        
     },
    showNewsprint(item){
         
         this.curItem=item;
         this.isNewsprint=!this.isNewsprint;
      },
    hideNewsprint(){
         this.isNewsprint=!this.isNewsprint;
      },
    download(){
        this.$refs.mychild.download();
    }
    }
  }
</script>
<style>
 @import '../assets/template/news/layui/css/layui.css';
 @import '../assets/template/news/static/css/index.css';

 .newsList li{
   posotion:relative;
   top:0px;
   left:0px;
 }

</style>

