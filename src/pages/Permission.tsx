import React, { useContext } from 'react'
import { Switch, Tag } from 'antd'
import AuthComponent from '../components/AuthComponent'
import { observer, useLocalStore } from 'mobx-react-lite'
import { userStore } from '../store'

const Permission: React.FC = props => {
  const { userinfo, saveUserinfo } = useContext(userStore)
  const state = useLocalStore(() => ({
    isAdmin: userinfo.permission === 'admin'
  }))

  function handleClick() {
    state.isAdmin = !state.isAdmin
    const data = state.isAdmin
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
    saveUserinfo(data)
  }

  return (
    <div>
      <Switch
        checkedChildren="admin"
        unCheckedChildren="guest"
        checked={state.isAdmin}
        onClick={handleClick}
      />
      <p>
        Current permission <strong>{state.isAdmin ? 'admin' : 'guest'}</strong>
      </p>
      <AuthComponent permissions={['admin']}>
        <Tag color="blue">only on admin</Tag>
      </AuthComponent>
    </div>
  )
}

export default observer(Permission)
