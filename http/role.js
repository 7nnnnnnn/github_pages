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
        url: 'api/role/all',
        data
    })
}
//对应delete
const deleteDormitory = (params) => {
    return instance.request({
        url: 'api/role/delete',
        params
    })
}
//对应add
const addDormitory = (data) => {
    return instance.request({
        url: 'api/role/add',//看api文档
        method: 'post',
        data
    })
}
//对应edit
const editDormitory = (data) => {
    return instance.request({
        url: 'api/role/edit',//改 
        method: 'post',
        data
    })
}
//可有可无,没用到
const getonedormitory = (data) => {
    return instance.request({
        url: 'api/role/one',//改

        data
    })
}
export {
    userLogin,
    getalldormitory,
    addDormitory,
    deleteDormitory,
    editDormitory,
    getonedormitory

} 