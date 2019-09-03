import './style.less'
import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Dropdown, Icon, Avatar, Modal, Input, BackTop, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import Menus from '../components/Menus'
import Content from '../components/Content'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as stores from '../store'

const { Header, Sider } = Layout

const Home: React.FC<RouteComponentProps> = props => {
  const { userinfo, cleanUserinfo } = useContext(stores.userStore)
  const state = useLocalStore(() => ({
    passwordModalVisible: false,
    collapsed: false
  }))

  const toggle = () => {
    state.collapsed = !state.collapsed
  }
  // 处理下拉菜单click事件
  const handleDropdownClick = ({ key }: ClickParam) => {
    switch (key) {
      case 'logout':
        logout()
        break
      case 'password':
        state.passwordModalVisible = true
        break
      default:
        break
    }
  }
  // 注销
  const logout = () => {
    cleanUserinfo()
  }
  // 修改密码
  const changePassword = () => {}

  return (
    <Layout className="home">
      {/* 侧边导航 */}
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        {/* logo */}
        <div className="logo" />
        <Menus />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <div className="right-block">
            {/* 头像 */}
            <Avatar
              style={{ marginRight: '10px' }}
              src="https://avatars0.githubusercontent.com/u/24448924?s=460&v=4"
            />
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu onClick={handleDropdownClick}>
                  <Menu.Item key="password">
                    <span>修改密码</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout">注销</Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button type="link">
                {userinfo.name} <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </Header>
        {/* 主内容 */}
        <Content />
      </Layout>
      <Modal
        title="修改密码"
        width="360px"
        visible={state.passwordModalVisible}
        okText="修改"
        cancelText="取消"
        onOk={changePassword}
        onCancel={() => {
          state.passwordModalVisible = false
        }}
      >
        <Input type="password" placeholder="旧密码" />
        <br />
        <br />
        <Input type="password" placeholder="新密码" />
        <br />
        <br />
        <Input type="password" placeholder="确认密码" />
      </Modal>
      <BackTop />
    </Layout>
  )
}

export default observer(Home)
