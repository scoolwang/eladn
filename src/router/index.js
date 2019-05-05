import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    name: 'app',
    meta: {
      title: 'app',
      icon: 'guide'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/app/index'),
        name: 'application',
        meta: {
          title: 'application'
        }
      },
      {
        path: 'flow',
        component: () => import('@/views/app/flow'),
        name: 'flow',
        meta: {
          title: 'flow'
        }
      },
      {
        path: 'storage',
        component: () => import('@/views/app/storage'),
        name: 'storage',
        meta: {
          title: 'storage'
        }
      }
    ]
  },
  {
    path: '/packaging',
    component: Layout,
    redirect: '/packaging/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/packaging/index'),
        name: 'packaging',
        meta: { title: 'packaging', icon: 'documentation', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/signature',
    component: Layout,
    redirect: '/signature/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/signature/index'),
        name: 'signature',
        meta: { title: 'signature', icon: 'documentation', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/index'),
        name: 'product',
        meta: { title: 'product', icon: 'documentation', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/index',
    name: 'financial',
    meta: {
      title: 'financial',
      icon: 'money'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/financial/order'),
        name: 'order',
        meta: {
          title: 'order'
        }
      },
      {
        path: 'fund',
        component: () => import('@/views/financial/fund'),
        name: 'fund',
        meta: {
          title: 'fund'
        }
      },
      {
        path: 'withdrawal',
        component: () => import('@/views/financial/withdrawal'),
        name: 'withdrawal',
        meta: {
          title: 'withdrawal'
        }
      },
      {
        path: 'invoice',
        component: () => import('@/views/financial/invoice'),
        name: 'invoice',
        meta: {
          title: 'invoice'
        }
      }
    ]
  },
  {
    path: '/notification',
    component: Layout,
    redirect: '/notification/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/notification/index'),
        name: 'notification',
        meta: { title: 'notification', icon: 'documentation', noCache: true, affix: true }
      }
    ],
    hidden: true
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'account',
    meta: {
      title: 'account',
      icon: 'user'
    },
    children: [
      {
        path: 'personal',
        component: () => import('@/views/account/personal'),
        name: 'personal',
        meta: {
          title: 'personal'
        }
      },
      {
        path: 'authentication',
        component: () => import('@/views/account/authentication'),
        name: 'authentication',
        meta: {
          title: 'authentication'
        }
      }
    ],
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
