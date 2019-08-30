import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Icon, Input, Button, Table, Divider } from 'antd'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as stores from '../../../store'
import axios from '../../../plugins/axios'

const FormItem = Form.Item

const columns = [
  {
    title: '合作商订单号',
    dataIndex: '1',
    key: '1'
  },
  {
    title: '订单ID',
    dataIndex: '2',
    key: '2'
  },
  {
    title: '商户编号',
    dataIndex: '3',
    key: '3'
  },
  {
    title: '商户名称',
    dataIndex: '4',
    key: '4'
  },
  {
    title: '交易金额',
    dataIndex: '5',
    key: '5'
  },
  {
    title: '订单状态',
    dataIndex: '6',
    key: '6'
  },
  {
    title: '下单时间',
    dataIndex: '7',
    key: '7'
  }
]

interface IProps extends RouteComponentProps {}
interface IState {
  dataSource: any
  orderNo: string
}

const OrderQuery: React.FC<IProps> = props => {
  const { loading, openLoading, closeLoading } = useContext(stores.uiStore)
  const state = useLocalStore(
    () =>
      ({
        dataSource: [],
        orderNo: ''
      } as IState)
  )

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log(ev);
    state.orderNo = ev.target.value
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    query()
  }

  const query = async () => {
    openLoading()
    await axios.get('/order-query', {
      params: {
        orderNo: state.orderNo
      }
    })
    closeLoading()
  }

  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem>
          <Input
            onChange={handleInputChange}
            prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入合作商订单号"
          />
        </FormItem>
        <FormItem>
          <Button loading={loading} disabled={!state.orderNo} type="primary" htmlType="submit">
            查询
          </Button>
        </FormItem>
      </Form>
      <Divider dashed />
      <Table loading={loading} dataSource={state.dataSource} columns={columns} size="middle" />
    </div>
  )
}

export default observer(OrderQuery)
