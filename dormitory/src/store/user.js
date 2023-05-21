//src/stores/counter.js
import { defineStore } from 'pinia';

//选项式
export const useUserStore = defineStore('user', {
    //状态值是核心
    state:() => {  
        return {
            token:'',
            userinfo:{
                "state":1,
                "id":0,
                "userName":"",
                "userType":"",
                "token":"",
                "binding":0,
                "createTime":"",
                "updateTime":"",
                "email":"",
        }
        }
    },
    // state:()=>({count:0})
    getters:{
        getToken(){
            return this.token;
        }
    },
    actions:{
        setToken(token){
            this.token=token;
        },
        fillUserinfo(user){
            this.userinfo=user;
        },
        
    },
    persist:{
        
        enabled:true,
        strategies:[{
            key:'userinfo',
            storage:localStorage, //会话存储 sessionStorage 本地存储 localStorage
            paths:['token'] //部分存储
        }],
    },
})

