import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')

Vue.use(Router)

let routes = new Router({
  base: "/admin/",
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})

routes.beforeEach((to, from, next) => {
  // mengecek ada tidak meta auth di dalam meta
  console.log(to.name == "Login", store.state.isLogeddin)
  if (to.name == 'Login' && store.state.isLogeddin) {
    next('/dashboard');
  } else if (to.name != 'Login' && !store.state.isLogeddin) {
    next('/pages/login');
  } else {
    next();
  }
});

export default routes;
