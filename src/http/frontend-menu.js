import instance from "./axios";
const menuall=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'/api/menu/all', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'get',
        data,
      
    })
}
const menuAdd=(data)=>{
    return instance.request({
        url:'api/menu/add',
        method:'post',
        data
    })}
    const menuEdit=(data)=>{
        return instance.request({
            url:'api/menu/edit',
            method:'post',
            data
        })
    }
    const menuDelId=(params)=>{
        return instance.request({
            url:'api/menu/delete',
            params
        })
    }
    const menuOne=(data)=>{
        return instance.request({
            url:'api/menu/one',
            method:'get',
            data
        })
    }
export {
    menuall,
    menuAdd,
    menuEdit,
    menuDelId,
    menuOne
}