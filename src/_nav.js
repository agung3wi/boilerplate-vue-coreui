export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'System',
      url: '/system',
      icon: 'icon-star',
      children: [
        {
          name: 'User',
          url: '/system/user',
          icon: 'icon-star'
        },
        {
          name: 'Role',
          url: '/system/role',
          icon: 'icon-star'
        },
        {
          name: 'Permission',
          url: '/system/permission',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    }
  ]
}
