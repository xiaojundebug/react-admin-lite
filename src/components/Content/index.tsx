import React, { Suspense } from 'react'
import { Layout, Spin } from 'antd'
import { Switch } from 'react-router-dom'
import AuthRoute from "../AuthRoute";
import menus from '../../config/menus'
import NoMatch from '../../pages/Home/404'

function hasChild(menu: any) {
  return Array.isArray(menu.children) && menu.children.length > 0
}

function genRoutes(menus: any) {
  return menus.reduce((prev: any, next: any) => {
    return prev.concat(
      hasChild(next) ? (
        genRoutes(next.children)
      ) : (
        <AuthRoute path={next.key} component={next.component} key={next.key} />
      )
    )
  }, [])
}

const Content: React.FC = props => {
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
