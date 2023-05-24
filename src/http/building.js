import instance from './axios'
const add=(data)=>{
    return instance.request({
        url:'api/building/add',
        method:'post',
        data
    })
}
const all=(data)=>{
    return instance.request({
        url:'api/building/all',
        method:'get',
        data
    })
}
const getBuildingsByColums=(data)=>{
    return instance.request({
        url:'api/building/colums',
        method:'get',
        data
    })
}
const de=(data)=>{
    return instance.request({
        url:'api/building/delete',
        method:'get',
        data
    })
}
const edit=(data)=>{
    return instance.request({
        url:'api/building/edit',
        method:'post',
        data
    })
}
const getBuildingBySchoolId=(data)=>{
    return instance.request({
        url:'api/building/getBuildingBySchoolId',
        method:'get',
        data
    })
}
const getBuildingsBySchoolIdPage=(data)=>{
    return instance.request({
        url:'api/building/getBuildingsBySchoolIdPage',
        method:'post',
        data
    })
}
const one=(data)=>{
    return instance.request({
        url:'api/building/one',
        method:'get',
        data
    })
}
const getBuildingsPage=(data)=>{
    return instance.request({
        url:'api/building/page',
        method:'post',
        data
    })
}
export{
add,
getBuildingsPage,
one,
getBuildingsBySchoolIdPage,
getBuildingBySchoolId,
edit,
de,
getBuildingsByColums,
all,
}