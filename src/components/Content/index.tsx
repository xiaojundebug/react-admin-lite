import React, { Suspense } from 'react'
import { Layout, Spin } from 'antd'
import { Switch } from 'react-router-dom'
import AuthRoute from '../AuthRoute'
import menus from '../../config/menus'
import NoMatch from '../../pages/404'
import { usePermission } from '../../common/hooks'

const Content: React.FC = props => {
  const hasPermission = usePermission()

  function hasChild(menu: any) {
    return Array.isArray(menu.children) && menu.children.length > 0
  }

  function genRoute(menu: any) {
    if (!menu.component) return null
    return <AuthRoute path={menu.key} component={menu.component} key={menu.key} />
  }

  function genRoutes(menus: any) {
    return menus.reduce((prev: any, next: any) => {
      return prev.concat(
        hasChild(next)
          ? hasPermission(next) && genRoutes(next.children)
          : hasPermission(next) && genRoute(next)
      )
    }, [])
  }

  return (
    <Layout.Content
      style={{
        margin: '24px'
      }}
    >
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin tip="Loading..." />
          </div>
        }
      >
        <Switch>
          {genRoutes(menus)}
          <AuthRoute component={NoMatch} />
        </Switch>
      </Suspense>
    </Layout.Content>
  )
}

export default Content
