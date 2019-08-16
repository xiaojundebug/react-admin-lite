import './style.less'
import React, { useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import * as stores from '../../store'
import axios from '../../plugins/axios'

const FormItem = Form.Item

interface ILoginProps extends RouteComponentProps, FormComponentProps {}

const Login: React.FC<ILoginProps> = props => {
  const { userinfo, saveUserinfo } = useContext(stores.userStore)
  const { loading, openLoading, closeLoading } = useContext(stores.uiStore)
  const { getFieldDecorator, validateFields } = props.form
  // 处理提交
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    validateFields((err: any, values: any) => {
      if (!err) login(values)
    })
  }
  // 登录处理
  const login = (values: any) => {
    let { account, password } = values

    openLoading()

    axios
      .post('auth/login', {
        account,
        password
      })
      .then(res => {
        saveUserinfo(res)
        closeLoading()
      })
  }
  // 已经登录则重定向到首页
  if (Object.keys(userinfo).length > 0) {
    return <Redirect to="/" />
  }

  return (
    <div className="login">
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue: 'admin'
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=""
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: '123456'
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder=""
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
        </FormItem>

        <FormItem>
          <Button loading={loading} type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

const WrappedLogin = Form.create<ILoginProps>()(observer(Login))

export default WrappedLogin
