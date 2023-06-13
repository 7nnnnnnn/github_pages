import instance from "./axios";
import api from './axios.js'
const userLogin = (data) => {
    return instance.request({
        url: 'api/mobile/elogin',
        method: 'post',
        data,
    })
}

const competitionPage = (data) => {
    return instance.request({
        url: 'api/competition/page',
        method: 'post',
        data
    })
}
const competitionDelId = (params) => {
    return instance.request({
        url: 'api/competition/delete',
        params
    })
}

const competitionAdd = (data) => {
    return instance.request({
        url: 'api/competition/add',
        method: 'post',
        data
    })
}

const competitionEdit = (data) => {
    return instance.request({
        url: 'api/competition/edit',
        method: 'post',
        data
    })
}
const school = async (data) => {
    return instance.request({
        url: '/api/school/all',
        method: 'get',
        data
    })
}
const competitionAll = (params) => {
    return instance.request({
        url: 'api/competition/all',
        params
    })
}
const competitionOne = (params) => {
    return instance.request({
        url: 'api/competition/one',
        params
    })
}



export default {
    userLogin,
    competitionPage,
    competitionDelId,
    competitionAdd,
    competitionEdit,
    competitionAll,
    competitionOne,
    school
}