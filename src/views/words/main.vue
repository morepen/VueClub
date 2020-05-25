<template>
  <div class="diary_main">
       <list-item></list-item>
       <pic-sidebar></pic-sidebar>
  </div>
</template>

<script>
  import ListItem from '../../components/listItem'
  import PicSidebar from '../../components/sidebar.vue'
  import Alert from '../../components/Alert'
  export default{
        components: {
            'list-item':ListItem,
            'pic-sidebar':PicSidebar
        },
        created() {
            this.$store.state.curPage=0;                    
        },
        mounted: function () {         
        },
        methods: {
            getonline(){
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
 .diary_main{
   margin: 100px auto;
    max-width: 1100px;
    padding: 0 10px;
    overflow: hidden;
  }
</style>
