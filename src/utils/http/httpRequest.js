import axios from "axios";
import merge from "lodash/merge";
import qs from "qs";

import {
    message
} from "antd";

const baseUrl = "http://101.33.245.249:3000/proxy/api";


const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,//跨域请求允许保存cookies
    crossDomain: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }

});

/**
 * 请求拦截
 */
//  http.interceptors.request.use(config => {
//     config.headers['Authorization'] = Vue.cookie.get('Authorization') // 请求头带上token
//     return config
//   }, error => {
//     return Promise.reject(error)
//   })





/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data.status !== 200) {
        message.error(
            response.data.message,
            1.5
        );
    }
    return response;
}, error => {
    switch (error.response.status) {
        case 400:
            message.error(
                error.response.data,
                1.5
            );
            break;
        case 401:
            message.error("您尚未登录,请重新登录...")
            break;
        case 500:
            message.error("服务器出了点小差，请稍后再试", 1.5);
            break;
        case 504:
            message.error("服务器出了点小差，请稍后再试", 1.5);
            break;
        // case 401:
        //   clearLoginInfo()
        //   router.push({ name: 'login' })
        //   break
        // case 405:
        //   Message({
        //     message: 'http请求方式有误',
        //     type: 'error',
        //     duration: 1500,
        //     customClass: 'element-error-message-zindex'
        //   })
        //   break
        // case 500:
        //   Message({
        //     message: '服务器出了点小差，请稍后再试',
        //     type: 'error',
        //     duration: 1500,
        //     customClass: 'element-error-message-zindex'
        //   })
        //   break
        // case 501:
        //   Message({
        //     message: '服务器不支持当前请求所需要的某个功能',
        //     type: 'error',
        //     duration: 1500,
        //     customClass: 'element-error-message-zindex'
        //   })
        //   break
    }
    return Promise.reject(error);
});

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return baseUrl + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    let defaults = {
        "t": new Date().getTime()
    };
    return openDefultParams ? qs.stringify(merge(defaults, params)) : qs.stringify(params);
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
    let defaults = {
        "t": new Date().getTime()
    };
    data = openDefultdata ? merge(defaults, data) : data;
    return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
};
export default http;
