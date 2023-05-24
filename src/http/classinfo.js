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
const getallclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/all',
    data
  })
}
//对应delete
const deleteclassinfo = (params) => {
  return instance.request({
    url: 'api/classinfo/delete',
    params
  })
}
//对应add
const addclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/add',//看api文档
    method: 'post',
    data
  })
}
//对应edit
const editclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/edit',//改 
    method: 'post',
    data
  })
}
//可有可无,没用到
const getoneclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/one',//改

    data
  })
}
const getClassinfoBySchoolAndDepartAndMajorclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/getClassinfoBySchoolAndDepartAndMajor',
    data
  })
}
const getClassinfosPageclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/getClassinfosPage',
    method: 'post',
    data
  })
}
const getClassinfosPageBySchoolclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/getClassinfosPageBySchoolclassinfo',
    method: 'get',
    data
  })
}
const getClassinfosForSelectByMajorIdclassinfo = (data) => {
  return instance.request({
    url: 'api/classinfo/getClassinfosForSelectByMajorIdclassinfo',
    method: 'get',
    data
  })
}
// 根据school、depart和major查询班级信息
export function getClassinfoBySchoolAndDepartAndMajor(school, depart, major) {
  return request({
    url: 'api/classinfo/getClassinfoBySchoolAndDepartAndMajor',
    method: 'get',
    params: {
      school,
      depart,
      major
    }
  })
}

// 分页查询班级信息
export function getClassinfosPage(pageNum, pageSize) {
  return request({
    url: 'api/classinfo/getClassinfosPage',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 根据school分页查询班级信息
export function getClassinfosPageBySchool(school, pageNum, pageSize) {
  return request({
    url: 'api/classinfo/getClassinfosPageBySchool',
    method: 'get',
    params: {
      school,
      pageNum,
      pageSize
    }
  })
}

// 根据majorId查询班级信息，用于下拉框选择
export function getClassinfosForSelectByMajorId(majorId) {
  return request({
    url: 'api/classinfo/getClassinfosForSelectByMajorId',
    method: 'get',
    params: {
      majorId
    }
  })
}
//里面的内容要改名记得一起 下面这些名字在dormitory.vue 的116行一样 记得要一起
export {
  userLogin,
  getallclassinfo,
  addclassinfo,
  deleteclassinfo,
  editclassinfo,
  getoneclassinfo,
  getClassinfoBySchoolAndDepartAndMajorclassinfo,
  getClassinfosPageclassinfo,
  getClassinfosPageBySchoolclassinfo,
  getClassinfosForSelectByMajorIdclassinfo

} 
