import { ElLoading } from 'element-plus'
import api from './axios.js'
import { useUserStore } from '../store/user.js'
const userStore = useUserStore() // 获取用户 store
const token = userStore.token // 获取 token
const headers = {
  Authorization: 'Bearer ' + token, // 添加 Authorization 头部字段
}

let loadingInstance // 定义加载实例

const showLoading = () => {
  // 创建加载实例并显示加载动画
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中...', // 可自定义加载提示文本
  })
}

const hideLoading = () => {
  // 关闭加载实例，隐藏加载动画
  if (loadingInstance) {
    loadingInstance.close()
  }
}

const requestWithLoading = async (config) => {
  showLoading() // 显示加载动画

  try {
    return await api.request(config) // 发起接口请求
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const school = async (data) => {
  return await requestWithLoading({
    url: '/api/school/all',
    method: 'get',
    headers,
    data,
  })
}

const department = async (data) => {
  return await requestWithLoading({
    url: '/api/department/all',
    method: 'get',
    headers,
    data,
  })
}

const getMajor = async (data) => {
  return await requestWithLoading({
    url: '/api/major/all',
    method: 'get',
    headers,
    data,
  })
}


const majorAdd = async (data) => {
  return await requestWithLoading({
    url: '/api/major/add',
    method: 'post',
    headers,
    data,
  })
}

const majorEdit = async (data) => {
  return await requestWithLoading({
    url: '/api/major/edit',
    method: 'post',
    headers,
    data,
  })
}


const getMajorsForSelectBySchoolId = async (data) => {
  return await requestWithLoading({
    url: `/api/major/getMajorsForSelectBySchoolId?schoolId=${data.schoolId}`,
    method: 'get',
    headers,
  })
}



const majorDelete = async (data) => {
  return await requestWithLoading({
    url: `/api/major/delete?id=${data.id}`,
    method: 'get',
    headers,

  })
}







export default {
  school,
  department,
  majorAdd,
  getMajor,
  majorEdit,
  majorDelete,
  getMajorsForSelectBySchoolId
}
