import React, { useContext, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Select, Table, Badge, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { ColumnProps } from 'antd/lib/table'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as stores from '../../store'
import axios from '../../common/axios'
import { ORDER_STATUS_MAP } from '../../common/const'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

/*---------- 子组件区域 ----------*/

interface ISearchFormProps extends FormComponentProps {
  onSubmit: (params: any) => any
}

const SearchForm: React.FC<ISearchFormProps> = props => {
  const { getFieldDecorator, validateFields } = props.form
  const { loading } = useContext(stores.uiStore)
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values)
      }
    })
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem label="产品名称">
        {getFieldDecorator('productCode', {
          initialValue: '0'
        })(
          <Select style={{ width: 120 }} allowClear>
            <Option value="0">全部</Option>
            <Option value="1">product-1</Option>
            <Option value="2">product-2</Option>
            <Option value="3">product-3</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="合作商订单号">{getFieldDecorator('merOrderNo')(<Input />)}</FormItem>
      <FormItem label="本地订单号">{getFieldDecorator('payOrderId')(<Input />)}</FormItem>
      <FormItem label="商户编号">{getFieldDecorator('roadCode')(<Input />)}</FormItem>
      <FormItem label="商户名称">{getFieldDecorator('merName')(<Input />)}</FormItem>
      <FormItem label="交易时间">
        {getFieldDecorator('datetime')(
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['', '']}
          />
        )}
      </FormItem>
      <FormItem>
        <Button loading={loading} type="primary" htmlType="submit">
          查询
        </Button>
      </FormItem>
    </Form>
  )
}

const WrappedSearchForm = Form.create<ISearchFormProps>()(observer(SearchForm))

/*---------- 父组件区域 ----------*/

const columns: ColumnProps<unknown>[] = [
  {
    title: '合作商订单号',
    dataIndex: 'merOrderNo',
    key: 'merOrderNo'
  },
  {
    title: '本地订单号',
    dataIndex: 'payOrderId',
    key: 'payOrderId'
  },
  {
    title: '商户编号',
    dataIndex: 'roadCode',
    key: 'roadCode'
  },
  {
    title: '商户名称',
    dataIndex: 'merName',
    key: 'merName'
  },
  {
    title: '交易金额（元）',
    dataIndex: 'amount',
    align: 'right',
    width: 140,
    key: 'amount'
  },
  {
    title: '交易时间',
    dataIndex: 'createTime',
    align: 'center',
    key: 'createTime'
  },
  {
    title: '交易状态',
    dataIndex: 'status',
    align: 'left',
    render: (status: number) => {
      return (
        <div>
          <Badge
            status={
              ({
                10: 'default',
                20: 'warning',
                30: 'processing',
                40: 'error',
                50: 'success'
              } as Record<number, any>)[status]
            }
          />
          {ORDER_STATUS_MAP[status]}
        </div>
      )
    },
    key: 'status'
  }
]

interface ITradeQueryState {
  data: any
  pagination: any
}

const TradeQuery: React.FC = props => {
  const { loading, openLoading, closeLoading } = useContext(stores.uiStore)
  const state = useLocalStore(
    () =>
      ({
        data: [],
        pagination: {}
      } as ITradeQueryState)
  )

  useEffect(() => {
    query()
    // eslint-disable-next-line
  }, [])

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let pager = { ...state.pagination }
    pager.current = pagination.current
    state.pagination = pager
    query({
      results: pagination.pageSize
    })
  }

  const query = (params = {}) => {
    openLoading()
    axios
      .get('/trade-query', {
        params: {
          results: 10,
          ...params
        }
      })
      .then(data => {
        const pagination = { ...state.pagination }
        pagination.total = 200
        state.data = data
        state.pagination = pagination
        closeLoading()
      })
  }

  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      <WrappedSearchForm onSubmit={query} />
      <Divider dashed />
      <Table
        loading={loading}
        columns={columns}
        rowKey="id"
        dataSource={state.data}
        pagination={state.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default observer(TradeQuery)
