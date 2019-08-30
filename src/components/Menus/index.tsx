import React from 'react'
import { Icon, Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import menus from '../../config/menus'

const Menus: React.FC<RouteComponentProps> = props => {
  const { location, history } = props

  // 处理导航菜单click事件
  function handleNavClick({ key }: ClickParam) {
    history.push(key)
  }
  // 只考虑最多两层
  function genSubMenu(menu: any) {
    return (
      <Menu.SubMenu title={menu.name} key={menu.key}>
        {menu.children.map((el: any) => (
          <Menu.Item key={el.key}>
            <Icon type={el.icon} />
            <span>{el.name}</span>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    )
  }

  function genMenItem(menu: any) {
    return (
      <Menu.Item key={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.name}</span>
      </Menu.Item>
    )
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      onClick={handleNavClick}
    >
      {menus.map(menu =>
        Array.isArray(menu.children) && menu.children.length > 0
          ? genSubMenu(menu)
          : genMenItem(menu)
      )}
    </Menu>
  )
}

export default withRouter(Menus)
