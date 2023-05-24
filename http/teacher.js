import instance from "./axios";
const allteacherpage=(data)=>{
    return instance.request({
        url:'api/teacher/all',
        method:'get',
        data

    })
}
const teacherdel=(params)=>{
    return instance.request({
        url:'api/teacher/delete',
        params
    })
}
const addteacher=(data)=>{
    return instance.request({
        url:'api/teacher/add',
        method:'post',
        data
    })
}
const editteacher=(data)=>{
    return instance.request({
        url:'api/teacher/edit',
        method:'post',
        data
    })
}
const teacherone=(params)=>{
    return instance.request({
        url:'api/teacher/one',
        method:'get',
        params
    })
}
export {
    allteacherpage,
    teacherdel,
    addteacher,
    editteacher,
    teacherone
} 