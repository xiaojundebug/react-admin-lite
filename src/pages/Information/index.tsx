import './style.less'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Card, Col, Row, Icon, Table, Badge, Tooltip, Tag, List, Avatar, Button } from 'antd'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as stores from '../../store'
import axios from '../../plugins/axios'
import { PRODUCT_TYPE } from '../../common/const'
import { randomColor } from '../../common/utils'

const columns = [
  { title: '产品ID', dataIndex: 'productId', key: 'productId', width: '200px' },
  {
    title: '产品类型',
    dataIndex: 'productType',
    key: 'productType',
    render: (type: number) => {
      return (
        <div>
          <Tag
            color={
              ({
                10: 'green',
                20: 'blue',
                30: 'cyan',
                40: 'red',
                50: 'purple'
              } as Record<number, string>)[type]
            }
          >
            {PRODUCT_TYPE[type]}
          </Tag>
        </div>
      )
    }
  },
  {
    title: '总状态',
    dataIndex: 'status',
    key: 'status',
    width: '200px',
    render(text: string) {
      return text ? (
        <Badge status="processing" text="已开启" />
      ) : (
        <Badge status="error" text="已关闭" />
      )
    }
  }
]

interface IProps extends RouteComponentProps {}
interface IState {
  dataSource: any
}

const Information: React.FC<IProps> = props => {
  const { userinfo } = useContext(stores.userStore)
  const { loading, openLoading, closeLoading } = useContext(stores.uiStore)
  const state = useLocalStore(
    () =>
      ({
        dataSource: {}
      } as IState)
  )

  useEffect(() => {
    query()
    // eslint-disable-next-line
  }, [])
  // 查询数据
  const query = async () => {
    openLoading()
    state.dataSource = await axios.get('merchant/getMerchantInfo', {
      params: {
        id: userinfo.merchantId
      }
    })
    closeLoading()
  }
  // 渲染table展开内容的方法
  const expandedRowRender = (record: any) => {
    const columns = [
      {
        title: '商户编号',
        dataIndex: 'roadCode',
        key: 'roadCode',
        width: '200px'
      },
      { title: '商户名称', dataIndex: 'name', key: 'name' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '200px',
        render(text: string) {
          return text ? (
            <Badge status="processing" text="已开启" />
          ) : (
            <Badge status="error" text="已关闭" />
          )
        }
      }
    ]

    const roadList = record.road
    const data = []
    for (let i = 0; i < roadList.length; ++i) {
      data.push(roadList[i])
    }
    return (
      <Table
        rowKey="roadCode"
        size="middle"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    )
  }

  let { account = [], product = [] } = state.dataSource

  return (
    <div>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} xl={{ span: 12 }}>
          <Card
            hoverable
            bodyStyle={{ height: '260px', marginBottom: '24px' }}
            title="合作商信息"
            bordered={false}
            loading={loading}
          >
            <p>
              <span className="label">合作商编号：</span>
              <span className="value">2018032610021</span>
            </p>
            <p>
              <span className="label">合作商名称：</span>
              <span className="value">阿里巴巴</span>
            </p>
            <p>
              <span className="label">联系人：</span>
              <span className="value">马云</span>
            </p>
            <p>
              <span className="label">联系电话：</span>
              <span className="value">10086</span>
            </p>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 12 }}>
          <Card
            hoverable
            bodyStyle={{ height: '260px', marginBottom: '24px' }}
            title="结算卡信息"
            bordered={false}
            loading={loading}
          >
            <p>
              <span className="label">持卡人：</span>
              <span className="value">马化腾</span>
            </p>
            <p>
              <span className="label">身份证：</span>
              <span className="value">110</span>
            </p>
            <p>
              <span className="label">银行卡：</span>
              <span className="value">119</span>
            </p>
            <p>
              <span className="label">银行：</span>
              <span className="value">杭州银行</span>
            </p>
            <p>
              <span className="label">支行：</span>
              <span className="value">西城支行</span>
            </p>
            <p>
              <span className="label">预留手机号：</span>
              <span className="value">120</span>
            </p>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} xl={{ span: 16 }}>
          <Card
            hoverable
            className="product-list"
            bodyStyle={{ marginBottom: '24px', overflow: 'auto' }}
            title="产品列表"
            bordered={false}
            loading={loading}
          >
            <Table
              rowKey="productId"
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={product}
              pagination={false}
              size="middle"
              expandRowByClick={true}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 8 }}>
          <Card
            hoverable
            bodyStyle={{ marginBottom: '24px', overflow: 'auto' }}
            title={
              <div>
                <span>账号</span>
                &nbsp;
                <Tooltip placement="topLeft" title="开通合作商下商户账号" arrowPointAtCenter>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>
            }
            extra={<Button type="link">新建</Button>}
            bordered={false}
            loading={loading}
            className="account"
          >
            <List
              itemLayout="horizontal"
              dataSource={account.map((el: any) => {
                return {
                  name: el.name,
                  account: el.account
                }
              })}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: randomColor()
                        }}
                      >
                        {item.name}
                      </Avatar>
                    }
                    title={<a href="/">{item.name}</a>}
                    description={item.account}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default observer(Information)
