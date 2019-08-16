import React from 'react'
import { Form, Button, DatePicker, Timeline, Divider, Icon, Tooltip } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { observer } from 'mobx-react-lite'

const FormItem = Form.Item

interface ISearchFormProps extends FormComponentProps {}

const SearchForm: React.FC<ISearchFormProps> = props => {
  const { getFieldDecorator, validateFields } = props.form

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem label="日期">{getFieldDecorator('date')(<DatePicker placeholder="" />)}</FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </FormItem>
    </Form>
  )
}

const WrappedSearchForm = Form.create<ISearchFormProps>()(observer(SearchForm))

const Reports: React.FC = props => {
  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      <WrappedSearchForm />
      {/* <Divider /> */}
      <Divider dashed />
      <Timeline>
        <Timeline.Item dot={<Icon type="clock-circle-o" />} color="red">
          <Tooltip placement="right" title="还未生成">
            <span style={{ color: '#999', cursor: 'not-allowed' }}>2018/4/26（今天）</span>
          </Tooltip>
        </Timeline.Item>
        {new Array(10).fill(null).map((el, index) => (
          <Timeline.Item key={index}>
            <Tooltip placement="right" title="201804112018032610021.csv">
              <span
                onClick={() => {
                  window.location.href = 'https://www.baidu.com'
                }}
                style={{ cursor: 'pointer' }}
              >
                2018/4/{new Date().getDate() - index - 1}
              </span>
            </Tooltip>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default Reports
