// const BASE_URL = "http://47.92.168.221:9342/merchant/";
// const BASE_URL = "http://192.168.1.155:9342/merchant/";
// const BASE_URL = "/merchant/";
const BASE_URL = '/api/'

const ORDER_STATUS_MAP: Record<number, string> = {
  10: '创建',
  20: '可执行',
  30: '执行中',
  40: '失败',
  50: '成功'
}

const PRODUCT_TYPE: Record<number, string> = {
  10: '微信',
  20: '支付宝',
  30: 'QQ钱包',
  40: '京东',
  50: '银联'
}

export { BASE_URL, ORDER_STATUS_MAP, PRODUCT_TYPE }
