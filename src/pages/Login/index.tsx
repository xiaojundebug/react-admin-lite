import './style.less'
import React, { useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as stores from '../../store'
import axios from '../../plugins/axios'

const FormItem = Form.Item

interface ILoginProps extends RouteComponentProps, FormComponentProps {}

const Login: React.FC<ILoginProps> = props => {
  const { saveUserinfo, isLogged } = useContext(stores.userStore)
  const { loading, openLoading, closeLoading } = useContext(stores.uiStore)
  const { getFieldDecorator, validateFields } = props.form
  // 处理提交
  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    validateFields((err: any, values: any) => {
      if (!err) login(values)
    })
  }
  // 登录处理
  function login(values: any) {
    let { account, pwd } = values

    openLoading()
    axios
      .get('/login', {
        params: {
          account: account.trim(),
          pwd: pwd.trim()
        }
      })
      .then(
        res => {
          saveUserinfo(res)
          closeLoading()
        },
        error => {
          closeLoading()
        }
      )
  }
  // 已经登录则重定向到首页
  if (isLogged) {
    return <Redirect to="/information" />
  }

  return (
    <div className="login">
      <Row>
        <Col xs={0} sm={12}>
          <div className="cover" />
        </Col>
        <Col xs={24} sm={12}>
          <div className="login-form">
            <img className="title" src={require('../../assets/login_title.png')} alt="title" />
            <Form onSubmit={handleSubmit}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                  initialValue: 'admin'
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('pwd', {
                  rules: [{ required: true, message: '密码不能为空' }],
                  initialValue: '123456'
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  style={{ width: '100%' }}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const WrappedLogin = Form.create<ILoginProps>()(observer(Login))

export default WrappedLogin
