import './style.less'
import React, { useContext } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Dropdown, Icon, Avatar, Modal, Input, BackTop, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as stores from '../../store'

import Information from './information' // 合作商户
import OrderQuery from './order-query' // 订单查询
import TradeQuery from './trade-query' // 交易查询
import Reports from './reports' // 报表导出

const { Header, Sider, Content } = Layout

const Home: React.FC<RouteComponentProps> = props => {
  const { userinfo, cleanUserinfo } = useContext(stores.userStore)
  const state = useLocalStore(() => ({
    passwordModalVisible: false,
    collapsed: false
  }))

  const toggle = () => {
    state.collapsed = !state.collapsed
  }
  // 处理导航菜单click事件
  const handleNavClick = ({ key }: ClickParam) => {
    props.history.push(key)
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
  // 退出
  const logout = () => {
    cleanUserinfo()
  }
  // 修改密码
  const changePassword = () => {}

  if (Object.keys(userinfo).length === 0) {
    return <Redirect to="/login" />
  }

  return (
    <Layout className="home">
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.location.pathname]}
          onClick={handleNavClick}
        >
          <Menu.Item key="/information">
            <Icon type="user" />
            <span>合作商户</span>
          </Menu.Item>
          <Menu.Item key="/order-query">
            <Icon type="file-text" />
            <span>订单查询</span>
          </Menu.Item>
          <Menu.Item key="/trade-query">
            <Icon type="pay-circle-o" />
            <span>交易查询</span>
          </Menu.Item>
          <Menu.Item key="/reports">
            <Icon type="upload" />
            <span>报表导出</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <div className="right-block">
            <Avatar
              style={{ backgroundColor: '#25b685', marginRight: '10px' }}
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
                  <Menu.Item key="logout">退出</Menu.Item>
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
        <Content
          style={{
            margin: '24px'
          }}
        >
          <Route path="/information" component={Information} />
          <Route path="/order-query" component={OrderQuery} />
          <Route path="/trade-query" component={TradeQuery} />
          <Route path="/reports" component={Reports} />
        </Content>
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
