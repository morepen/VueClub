import axios from 'axios';
import qs from 'qs';

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'https://www.hdhome.net/public/';
//axios.defaults.baseURL = 'http://127.0.0.1:8091/';//测试地址

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/LoginCheck', params)
    },
    
    /**
     * 用户注册
     */
    Regist(params) {
        return fetch('/Register', params)
    },
     /**
     * 上传图片
     */
    PicUpload(params){
       return fetch('/PicUpload', params) 
    },
       /**
     * 图片列表
     */
    PicList(params){
       return fetch('/PicList', params) 
    },
       /**
     * 获取标签
     */
    Comment(params){
       return fetch('/comment', params)  
    },
    postCommentList(params){
       return fetch('/GetCommentList', params)  
    },
    GetcommunityDetail(params){
       return fetch('/GetcommunityDetail', params)  
    },
        /**
     * 获取组列表
     */
    GetLive(params){
       return fetch('/GetLive', params);  
    },
    CreatLive(params){
       return fetch('/CreatLive', params);  
    },
    GetSz(params){
       return fetch('/GetTeam', params);  
    },
    CreatSz(params){
       return fetch('/CreatSz', params);  
    },
    GetTeam(params){
       return fetch('/GetTeam', params);  
    },
    CreatTeam(params){
       return fetch('/CreatTeam', params);  
    },
 
    GetUserList(params){
       return fetch('/GetUserList', params);  
    },
    PublishPlan(params){
       return fetch('/PublishPlan', params);  
    },
    DiaryUpload(params){
       return fetch('/DiaryUpload', params) 
    },
    DiaryList(params){
       return fetch('/DiaryList', params)  
    },
       /**
     * 计划清单
     */
    CreatPlan(params){
       return fetch('/CreatPlan', params)  
    },
    GetPlanList(params){
       return fetch('/GetPlanList', params)  
    },
    getIp(){
      // axios.defaults.timeout = 50000;
      // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      // axios.get('http://pv.sohu.com/cityjson?ie=utf-8').then(function(res){
      //               alert(res);
      //               return res;

      //           }).catch(function(res){
                   
      //           });
      
    }
   
    

}
