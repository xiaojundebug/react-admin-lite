import { lazy } from 'react'

interface Menu {
  name: string
  key: string
  icon?: string
  component?: React.ReactNode
  children?: Menu[]
}

const menus: Menu[] = [
  {
    name: '合作商户',
    key: '/information',
    icon: 'user',
    component: lazy(() => import('../pages/Home/Information'))
  },
  {
    name: '订单查询',
    key: '/order-query',
    icon: 'file-text',
    component: lazy(() => import('../pages/Home/OrderQuery'))
  },
  {
    name: '交易查询',
    key: '/trade-query',
    icon: 'pay-circle',
    component: lazy(() => import('../pages/Home/TradeQuery'))
  },
  {
    name: '报表导出',
    key: '/reports',
    icon: 'upload',
    component: lazy(() => import('../pages/Home/Reports'))
  },
  {
    name: '一级菜单',
    key: '/level1',
    children: [
      {
        name: '二级菜单',
        key: '/level2',
        children: [
          {
            name: '三级菜单',
            key: '/level3',
            component: lazy(() => import('../pages/MultiLevelNav'))
          }
        ]
      }
    ]
  }
]

export default menus
