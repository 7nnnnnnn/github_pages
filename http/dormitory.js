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
const getalldormitory = (data) => {
    return instance.request({
        url: 'api/dormitory/all',
        data
    })
}
//对应delete
const deleteDormitory = (params) => {
    return instance.request({
        url: 'api/dormitory/delete',
        params
    })
}
//对应add
const addDormitory = (data) => {
    return instance.request({
        url: 'api/dormitory/add',//看api文档
        method: 'post',
        data
    })
}
//对应edit
const editDormitory = (data) => {
    return instance.request({
        url: 'api/dormitory/edit',//改 
        method: 'post',
        data
    })
}
//可有可无,没用到
const getonedormitory = (data) => {
    return instance.request({
        url: 'api/dormitory/one',//改

        data
    })
}
//里面的内容要改名记得一起 下面这些名字在dormitory.vue 的116行一样 记得要一起
export {
    userLogin,
    getalldormitory,
    addDormitory,
    deleteDormitory,
    editDormitory,
    getonedormitory

} 