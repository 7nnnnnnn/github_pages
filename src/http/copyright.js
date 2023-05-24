//统一api管理
import instance from "./axios";
const userLogin=(data)=>{
    //返回Promise对象
    return instance.request({
        url:'api/mobile/elogin', //url=baseUrl+url,
        method:'post',
        data,
        headers:{

        }
    })
}

const adminLogin=(data)=>{
    return instance.request({
        url:'',
        method:'',
        data
    })
}
const copyrightPage=(data)=>{
    return instance.request({
        url:'api/copyright/page',
        method:'post',
        data
    })
}
const copyrightDelId=(params)=>{
    return instance.request({
        url:'api/copyright/delete',
        params
    })
}
const copyrightAdd=(data)=>{
    return instance.request({
      url:'api/copyright/add',
      method :'post',
      data
  })
  }
  const copyrightEdit=(data)=>{
    return instance.request({
      url:'api/copyright/edit',
      method :'post',
     data
  })
  } 
  
  const getOneData = async (id) => {
    return await requestWithLoading({
      url: 'api/copyright/one?id=' + id,
      method: 'get',
      headers,
    })
  }
const adminLogin1=function(data){
    return instance.request({
    url:'', 
    method:'post',
    data
})
}

export {
    userLogin,
    adminLogin,
    copyrightPage,
    copyrightDelId,
    copyrightAdd,
    copyrightEdit
} 