import React, { useContext } from 'react'
import { Switch, Button } from 'antd'
import { observer, useLocalStore } from 'mobx-react-lite'
import { userStore } from '../store'
import { useAuthComponent } from '../common/hooks'

const Permission: React.FC = props => {
  const { userinfo, saveUserinfo } = useContext(userStore)
  const AuthButton = useAuthComponent(Button, ['admin'])
  const state = useLocalStore(() => ({
    isAdmin: userinfo.permission === 'admin'
  }))

  function hancleClick() {
    state.isAdmin = !state.isAdmin
    const userinfo = state.isAdmin
      ? {
          account: 'admin@xxx.com',
          name: 'admin',
          permission: 'admin'
        }
      : {
          account: 'guest@xxx.com',
          name: 'guest',
          permission: 'guest'
        }
    saveUserinfo(userinfo)
  }

  return (
    <div>
      <Switch
        checkedChildren="admin"
        unCheckedChildren="guest"
        checked={state.isAdmin}
        onClick={hancleClick}
      />
      <p>
        Current permission <strong>{state.isAdmin ? 'admin' : 'guest'}</strong>
      </p>
      <AuthButton type="primary">权限为admin该按钮才显示</AuthButton>
    </div>
  )
}

export default observer(Permission)
