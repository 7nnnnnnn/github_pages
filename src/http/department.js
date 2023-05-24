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
const getallDepartment = (data) => {
    return instance.request({
        url: 'api/department/all',
        data
    })
}
//对应delete
const deleteDepartment = (params) => {
    return instance.request({
        url: 'api/department/delete',
        params
    })
}
//对应add
const addDepartment = (data) => {
    return instance.request({
        url: 'api/department/add',//看api文档
        method: 'post',
        data
    })
}
//对应edit
const editDepartment = (data) => {
    return instance.request({
        url: 'api/department/edit',//改 
        method: 'post',
        data
    })
}
//可有可无,没用到
const getoneDepartment = (data) => {
    return instance.request({
        url: 'api/department/one',//改

        data
    })
}
//里面的内容要改名记得一起 下面这些名字在dormitory.vue 的116行一样 记得要一起
export {
    userLogin,
    getallDepartment,
    addDepartment,
    deleteDepartment,
    editDepartment,
    getoneDepartment

} 