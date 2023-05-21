//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import Login from "../views/login.vue"

const routes = [
    { path: '/', name:'home',components:{
      default:Login
    }
   },
   {
    path:'/dormitory',name:'dormitory',component:()=>import('../views/dormitory.vue')
   }
    
    

    
 ]
 //创建路由管理 router
 const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHistory(),
   routes,})
   router.beforeEach((to,from,next)=>{
    //前置路由
    // if(to.name!=='cart'){
    //   next({name:'cart'})
    // }else{
    //   next();
    // }
    next();
   })
  //导出路由
 export default router  