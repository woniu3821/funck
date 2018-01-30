// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储

const asyncRouter = [
    {
        path: '/asyncRouter',
        component: r => require.ensure([], () => r(require('../components/layout/layout.vue')), 'layout'),
        children: []
    },
    {
        path: '/creat',
        meta: {
            permission: []
        },
        
        component: r => require.ensure([], () => r(require('../components/creat/index.vue')), 'Creat'),
    },
    {   
        name: 'build',
        path: '/build',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/creat/Build.vue')), 'Creat')
    },
    {   
        path: '/created',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/creat/Created.vue')), 'Creat')
    },
    {
        path: '/census',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/creat/Census.vue')), 'Creat')
    },
    {
        path: '/schedule',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/creat/Census.vue')), 'Schedule')
    },
    {
        path: '/dailylog',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/creat/Census.vue')), 'Dailylog')
    },
    {
        name: 'setting',
        path: '/setting',
        meta: {
            permission: []
        },
        
        component: r => require.ensure([], () => r(require('../components/page/setting/index.vue')), 'Setting'),
    },
    {
        path: '/usersetting',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/page/setting/UserList.vue')), 'Setting')
    },
    {
        path: '/authority',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/page/setting/UserAuthority.vue')), 'Setting')
    },
    {
        path: '/organize',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/page/setting/UserOrganize.vue')), 'Setting')
    },

    {
        path: '/work',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/worke/index.vue')), 'Work'),
        
    },
    {
        path: '/finished',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/worke/Finished.vue')), 'Work')
    },
    {
        path: '/waiting',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/worke/Waiting.vue')), 'Work')
    },
    {
        path: '/working',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/worke/Working.vue')), 'Work')
    },
    {
        path: '/overtimer',
        meta: {
            permission: []
        },
        component: r => require.ensure([], () => r(require('../components/worke/Overtimer.vue')), 'Work')
    }
]

export default asyncRouter
