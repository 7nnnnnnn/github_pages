import { data, get, post } from "jquery";
import instance from "./axios";
// const token=interviewtypegetall.token;
// const headers = {
//     Authorization: 'Bearer ' + token, // 添加 Authorization 头部字段
//   }
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const interviewtypegetall =(params)=> {
    return instance.request({
        url:'api/interviewType/all',
        method:'get',
        params,
    })

}
const interviewtypeadd=(data)=>{
    return instance.request({
        url:'api/interviewType/add',
        method:'post',
        data,
    })
}
const interviewtypeedit=(data)=>{
    return instance.request({
        url:'api/interviewType/edit',
        method:'post',
        data,
    })
}
const interviewtypedelete =(params)=>{
    return instance.request({
        url:'api/interviewType/delete',
        method:'get',
        params,
    })
}
const interviewtypegetone = (params)=>{
    return instance.request({
        url:'api/interviewType/one',
        method:'get',
        params
    })
}

export {
    interviewtypegetall,
    interviewtypeadd,
    interviewtypeedit,
    interviewtypedelete,
    userLogin,
    adminLogin,
    interviewtypegetone
}