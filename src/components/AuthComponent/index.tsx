import React, { useContext } from 'react'
import * as stores from '../../store'

interface IProps {
  permissions: Permission[]
}

const AuthComponent: React.FC<IProps> = props => {
  const { userinfo } = useContext(stores.userStore)
  const { children, permissions } = props
  const hasPermission = permissions.includes(userinfo.permission)

  return hasPermission ? children as any : null
}

export default AuthComponent
