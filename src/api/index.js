// import Vue from 'vue';
import Axios from 'axios';
import stores from '../store/index'
Axios.defaults.headers = { "Content-Type": "application/x-www-form-urlencoded" }

// Vue.prototype.$http = Axios;  
Axios.interceptors.request.use(function(config){  
    stores.dispatch('showLoading')  
    return config  
},function(err){  
    return Promise.reject(err)  
});  

Axios.interceptors.response.use(function(response){  
    stores.dispatch('hideLoading')  
    return response  
},function(err){  
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    setTimeout(() => {
        let fs = false;
        stores.dispatch('error', err.message, fs)
    }, 2000);
    return Promise.reject(err)  
});  

export function ajax(url) {
    return new Promise((resolve, reject) => {
        Axios.get(url).then(respones => {
            resolve(respones);
        }).catch(error => {
            reject(error);
        })
    })
} 

export default {
    todoApi: (url) => ajax(url)
}