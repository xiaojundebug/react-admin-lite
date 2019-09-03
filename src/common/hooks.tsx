import React, { useContext } from 'react'
import { userStore } from '../store'
// 处理菜单级别权限
function usePermission() {
  const { userinfo } = useContext(userStore)
  const hasPermission = (menu: any) => {
    const { permissions } = menu
    // 没配置permissions字段代表所有用户都有权限
    if (!permissions) return true
    return permissions.includes(userinfo.permission)
  }

  return hasPermission
}
// 处理元素级别权限，类似高阶组件
function useAuthComponent(...permissions: Permission[]) {
  const { userinfo } = useContext(userStore)
  const hasPermission = permissions.includes(userinfo.permission)

  return <P extends {}>(...BaseComponents: React.ComponentType<P>[]): React.FC<P>[] =>
    BaseComponents.map(Component => props => (hasPermission ? <Component {...props} /> : null))
}

export { usePermission, useAuthComponent }
