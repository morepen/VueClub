import Axios from "axios"
import qs from "qs"
var httpUrl="https://www.xdty.net/public/"
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        Axios.post(url, qs.stringify(params))
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
/**
* 管理系统接口
*/
export default {
    baseAction:function(action,param){	
        Axios.defaults.timeout = 50000;
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        Axios.defaults.baseURL = httpUrl;
        return fetch(action,param);
        } 
       
    }