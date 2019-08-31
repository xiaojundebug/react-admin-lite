import React from 'react'
import { Icon, Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import menus from '../../config/menus'
import { usePermission } from '../../common/hooks'

const Menus: React.FC<RouteComponentProps> = props => {
  const { location, history } = props
  const hasPermission = usePermission()

  function handleNavClick({ key }: ClickParam) {
    history.push(key)
  }

  function hasChild(menu: any) {
    return Array.isArray(menu.children) && menu.children.length > 0
  }

  function genSubMenu(menu: any) {
    return (
      <Menu.SubMenu
        title={
          <span>
            {menu.icon && <Icon type={menu.icon} />}
            <span>{menu.name}</span>
          </span>
        }
        key={menu.key}
      >
        {genMenus(menu.children)}
      </Menu.SubMenu>
    )
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
        hasChild(next)
          ? hasPermission(next) && genSubMenu(next)
          : hasPermission(next) && genMenItem(next)
      )
    }, [])
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={handleNavClick}
    >
      {genMenus(menus)}
    </Menu>
  )
}

export default withRouter(Menus)
