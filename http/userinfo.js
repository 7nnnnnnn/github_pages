//统一api管理
import instance from "./axios";
const userLogin = (data) => {
    //返回Promise对象
    return instance.request({
        url: 'api/mobile/elogin', //url=baseUrl+url,
        method: 'post',
        data,
        headers: {

        }
    })
}

//对应all
const getalluserinfo = (data) => {
    return instance.request({
        url: 'api/userinfo/all',
        data
    })
}
//对应delete
const deleteuserinfo = (params) => {
    return instance.request({
        url: 'api/userinfo/delete',
        params
    })
}
//对应add
const adduserinfo = (data) => {
    return instance.request({
        url: 'api/userinfo/add',//看api文档
        method: 'post',
        data
    })
}
//对应edit
const edituserinfo = (data) => {
    return instance.request({
        url: 'api/userinfo/edit',//改 
        method: 'post',
        data
    })
}
//可有可无,没用到
const getoneuserinfo = (data) => {
    return instance.request({
        url: 'api/userinfo/one',//改

        data
    })
}

export {
    userLogin,
    getalluserinfo,
    adduserinfo,
    deleteuserinfo,
    edituserinfo,
    getoneuserinfo

} 