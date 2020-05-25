<template>
  <div class="load_wrap">
    <div class="loading">
    
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                status: 'ready',
                files: [],
                filesrc: [],
                point: {},
                uploading: false,
                percent: 0
            }
        },
        methods: {
        }
           
    }
</script>
<style>
.load_wrap{
  position:relative;
  top:0px;
  left:0px;
  padding:100px 0px;
}
.loading{
            /*固定loading*/
            position: absolute;
            top: 50%;
            left: 50%;
            /*垂直水平居中*/
            margin: -20px 0 0 -20px;
            width: 40px;
            height: 40px;
            border: 2px solid;
            border-color: #333 #333 transparent;
            border-radius: 50%;
            box-sizing: border-box;
            /*动画时间1s，线性变化，无限循环*/
            animation: loading 1s linear infinite;
}
@keyframes loading{
            0%{
                transform: rotate(0deg);
            }
            100%{
                transform: rotate(360deg);
            }
}

</style>