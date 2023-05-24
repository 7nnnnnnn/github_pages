import instance from "./axios";

const add = (data) => {
   return instance.request({
      url: 'api/articleCat/add',
      method: 'post',
      data
   })
}

const remove = (data) => {
   return instance.request({
      url: 'api/articleCat/delete',
      method: 'get',
      params: data
   })
}

const update = (data) => {
   return instance.request({
      url:'api/articleCat/edit',
      method:'post',
      data
   })
}

const select = (data) => {
   return instance.request({
      url:'api/articleCat/one',
      method:'get',
      params:data
   })
}

const entire = () => {
    return instance.request({
       url:'api/articleCat/all',
       method:'get',
       
    })
 }

 const colums = (data) => {
    return instance.request({
        url:'api/articleCat/colums',
        method:'get',
        params:data
     })
 }

 const getArticleCatForSelect = () => {
    return instance.request({
        url:'api/articleCat/getArticleCatForSelect',
        method:'get',
     })
 }

export default {
   add,remove,update,select,entire,colums
 }