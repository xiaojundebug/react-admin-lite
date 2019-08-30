import React from 'react'
import { Icon, Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import menus from '../../config/menus'

function hasChild(menu: any) {
  return Array.isArray(menu.children) && menu.children.length > 0
}

function genMenItem(menu: any) {
  return (
    <Menu.Item key={menu.key}>
      {menu.icon && <Icon type={menu.icon} />}
      <span>{menu.name}</span>
    </Menu.Item>
  )
}

function genMenus(menus: any) {
  return menus.reduce((prev: any, next: any) => {
    return prev.concat(
      hasChild(next) ? (
        <Menu.SubMenu title={next.name} key={next.key}>
          {genMenus(next.children)}
        </Menu.SubMenu>
      ) : (
        genMenItem(next)
      )
    )
  }, [])
}

const Menus: React.FC<RouteComponentProps> = props => {
  const { location, history } = props

  // 处理导航菜单click事件
  function handleNavClick({ key }: ClickParam) {
    history.push(key)
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      onClick={handleNavClick}
    >
      {genMenus(menus)}
    </Menu>
  )
}

export default withRouter(Menus)
