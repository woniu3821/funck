import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'
import asyncRouter from './asyncRouter'
import whiteList from './directAccess'

if (Cookies.get('token')) {
  store.dispatch('user/relogin')
}
Vue.use(VueRouter)

function routerMatch(permission, asyncRouter) {
  return new Promise((resolve) => {
    const routers = asyncRouter[0]
    // 创建路由
    function createRouter(permission) {
      permission.forEach((item) => {
        if (item.child && item.child.length) {
          // 递归
          createRouter(item.child)
        }
        let path = item.path
        // 循环异步路由，将符合权限列表的路由加入到routers中
        asyncRouter.find(function (s) {
          if (s.path == path) {
            s.meta.permission = item.permission;
            if (item.child && item.child.length) s.redirect = item.child[0].path; //设置重定向路由
            routers.children.push(s)
            return
          }
        })
      })
    }
    createRouter(permission)
    resolve([routers])
  })
}

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    name: 'login',
    path: '/login',
    component: r => require.ensure([], () => r(require('../components/page/login/Login.vue')), 'Login')
  },
  {
    path: '/register',
    component: r => require.ensure([], () => r(require('../components/page/login/Register.vue')), 'Register')
  },
  {
    path: '/defaultLayout',
    component: r => require.ensure([], () => r(require('../components/layout/layout.vue')), 'layout'),
    children: [{
        path: '/home',
        component: r => require.ensure([], () => r(require('../components/layout/Home.vue')), 'Home'),
      },
      {
        path: '/admin',
        component: r => require.ensure([], () => r(require('../components/page/login/Admin.vue')), 'Admin'),
      }
    ]
  }

]
const router = new VueRouter({
  // mode: 'history',
  routes: routes
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (Cookies.get('token')) {
    // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
    // 这种情况出现在手动修改地址栏地址时
    if (to.path === '/login') {
      router.replace('/') //直接跳回根路径
    } else {
      // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
      if (store.state.permission.list.length === 0) {
        // 获取权限列表，如果失败则跳回登录页重新登录
        store.dispatch('permission/getPermission').then(res => {
          // 匹配并生成需要添加的路由对象
          routerMatch(res, asyncRouter).then(res => {
            router.addRoutes(res)
            next(to.path)
          })
        }).catch(() => {
          console.log('登录错误')
          store.dispatch('user/logout').then(() => {
            router.replace('/login')
          })
        })
      } else {
        // 如果跳转页面存在于路由中则进入，否则跳转到404
        // 因为可以通过改变url值进行访问，所以必须有该判断
        if (to.matched.length) {
          if (whiteList.indexOf(to.path) < 0) {
            // store.dispatch('user/actionlog', to)
          }
          next()
        } else {
          router.replace('/error/404')
        }
      }
    }
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.indexOf(to.path) >= 0) {
      console.log('该页面无需登录即可访问')
      next()
    } else {
      console.log('请您登录')
      router.replace('/login')
    }
  }
})


export default router
