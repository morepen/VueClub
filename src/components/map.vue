<template>
    <div class="_map">
        <div class="amap-page-container">
            
          <el-amap ref="map"  vid="amapDemo" :plugin="plugin"  :zoom="zoom" :center="center" class="amap-demo" :events="events">
            <el-amap-marker vid="component-marker" :position="makerConf.position" :content="makerConf.content"  ></el-amap-marker>
          </el-amap>


   
    </div>
    </div>
  </template>
 
  <style>
    .amap-page-container{
        height: 400px;
        position: relative;
    }
    .search-box {
      position: absolute !important;
      top: 25px;
      left: 20px;
      z-index: 200 !important;
    }
    .amap-logo {
            display: none;
     }
   .amap-copyright {
          bottom:-100px;
           display: none;
    } 
    .amap-scalecontrol{
        bottom: 4px !important;
    }
    .amap-geolocation-con{
        bottom: 30px !important;
        z-index: 199 !important;
    }
    ul li.active{
        color: deeppink;
    }
  </style>
 
  <script>
     
     
    export default {
      name: 'amap-page',
      components: {},
      data() {
        var me = this;
        me.city = me.city || '武汉';
        return {
          list:[], 
          currIndex:0,
          zoom: 16,
          events:{
            "dragend":function(e){
                //console.log("dragging",e,this.getCenter());
                var point = this.getCenter();
                var pos = [point.lng,point.lat];
                me.makerConf.position =  [point.lng,point.lat];
                me.getList(pos);
            }
          },
          makerConf: {
            position:  [114.397169, 30.50576],
            content:""
          },
         searchOption: {
            city: me.city,
            citylimit: true
         },
          center: [121.59996, 31.197646],
          lng: 0,
          lat: 0,
          loaded: false,
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
               
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                     debugger;
                     me.center = [result.position.lng,result.position.lat];
                     me.$store.state.address=result.formattedAddress;
                    
                  }
                });
              }
            }
          }]

        };
      },
      created(){
        var me = this;
 
      },
      mounted(){
     
      },
      methods: {
        select:function(item,index){
            var me = this;
            me.currIndex = index;
            var point = item.location;
            me.makerConf.position =  [point.lng,point.lat];
            me.center = [point.lng,point.lat];
             
        },
        //this.$refs.map.$$getCenter()
       getList:function(result){
            //获取列表
            var me = this;
            me.$Geocoder({
                lnglatXY:result,
                success:function(res){
                    if(res.regeocode && res.regeocode.pois){
                        me.list = res.regeocode.pois;
                    }else{
                        me.list = [];
                    }
                },
                error:function(res){
                    me.list = [];
                }
            });
         
       },
       onSearchResult(pois) {
           //搜索
          let latSum = 0;
          let lngSum = 0;
          var me = this;
          
          var mymap = me.$refs.map.$$getInstance();
             
          if (pois && pois.length > 0) {
             
            //如果长度为1则无需转化
                var poi = pois[0];
                var lng = poi["lng"];
                var lat = poi["lat"];
                me.center = [lng, lat];
                me.makerConf.position  = [lng, lat];
                //me.makerConf.content = poi.name;
                me.list = pois;
            }else{
                me.list = [];
            }
       },
      
        $Geocoder(options){
            //将坐标点转化为，详细地址
            options = options || {};
            var that=this;
            if(AMap){
                AMap.plugin(['AMap.Geocoder'], () => {
                const geocoder = new AMap.Geocoder({
                    radius: options.radius || 1000,
                    extensions: options.extensions || "all"
                })
                var  lnglatXY = options.lnglatXY; //已知点坐标
               
                geocoder.getAddress(lnglatXY, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        
                        that.$store.state.address=result.regeocode.formattedAddress;
                   
                        options.success && options.success(result);
                    }else{
                        options.error && options.error(status,result);
                    }
                });
                });
                 
            }
             
         }
       },
       "watch":{
         list:function(){
            this.currIndex = 0;
         }
       }
       
    };
     
    /*
      me.$Geocoder({
                    lnglatXY:[center.lng, center.lat],
                    success:function(res){
                        console.log(res);
                    }
        });
     *
     * */
</script>