import instance from "./axios";


const getSubjectByPage = (data) => {
   return instance.request({
      url: '/api/school/all', 
      method: 'get',
      data
   })
}


const deleteById = (data) => {
   return instance.request({
      url: '/api/school/delete',
      method: 'get',
      params: data
   })
}


const updateById = (data) => {
   return instance.request({
      url:'api/school/edit',
      method:'post',
      data
   })
}


const queryById = (data) => {
   return instance.request({
      url:'api/school/one',
      method:'get',
      params:data
   })
}


const addOne = (data) => {
   return instance.request({
      url:'/api/school/add',
      method:'post',
      data
   })
}



const SelectOne = (data) => {
    return instance.request({
        url:'/api/school/one',
        method:'get',
        params:data
     })
}
const getSchoolsByRegion = (data) => {
   return instance.request({
      url: '/api/school/search',
      method:'post',
      data
   })
}
const getSchoolsByName = (data) => {
   return instance.request({
      url:'/api/school/checkname',
      method:'get',
      params:data
   })
}

export default {
   getSubjectByPage,
   deleteById,
   updateById,
   queryById,
   getSchoolsByName,
   addOne,
   getSchoolsByRegion,
   SelectOne
}