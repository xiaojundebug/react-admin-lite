import { lazy } from 'react'

const menus: IMenu[] = [
  {
    name: '合作商户',
    key: '/information',
    icon: 'user',
    component: lazy(() => import('../pages/Information')),
    permissions: ['admin']
  },
  {
    name: '交易查询',
    key: '/trade-query',
    icon: 'pay-circle',
    component: lazy(() => import('../pages/TradeQuery')),
    permissions: ['admin']
  },
  {
    name: '一级菜单',
    key: '/level1',
    icon: 'man',
    children: [
      {
        name: '二级菜单',
        key: '/level2',
        icon: 'woman',
        children: [
          {
            name: '三级菜单',
            key: '/level3',
            icon: 'api',
            component: lazy(() => import('../pages/Hello'))
          }
        ]
      }
    ]
  },
  {
    name: '权限测试',
    key: '/permission',
    icon: 'medicine-box',
    component: lazy(() => import('../pages/Permission'))
  }
]

export default menus
