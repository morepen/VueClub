<template>
    <div class="vue-uploader">
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <p class="file-name">{{file.name}}</p>
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="add" class="add">
                    <span>+</span>
                </div>
            </section>

        </div>

        <section v-if="files.length != 0" class="upload-func">
            <div class="progress-bar">
                <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
            </div>
            <div class="operation-box" v-show="false">
                <button v-if="status == 'ready'" @click="submit">上传</button>
                <button v-if="status == 'finished'" @click="finished">完成</button>
            </div>
        </section>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
    </div>
</template>
<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element)
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
            add() {
                this.$refs.file.click()
            },
            submit() {
                
            },
            resetfile(){
              debugger;
              this.files=[];
              this.filesrc=[];
              this.$store.state.files=[];
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1);
                this.imgData.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name.slice(-7),
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item);
                        
                    }
                }
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result);
                     this.filesrc[this.filesrc.length]=item.src;
                }
                reader.readAsDataURL(file);
               
            },
            isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        },
        mounted:function() {
           var arr=this.files
           for(var i = 0;i < arr.length; i++){
              this.filesrc.push(arr[0].src);
           }
           this.$store.state.files=this.filesrc;
        }
    }
</script>
<style>
.vue-uploader .file-list {
    padding:5px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    width: 90px;
    text-align: center;
}
.vue-uploader .file-list .file-item img{
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 12px;
    display: none;
    top: 4px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    display:none;
    margin: 0;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:20px;
}
.vue-uploader .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 1px dashed #dadada;
    font-size: 30px;
    cursor: pointer;
}
.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center; 
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
</style>