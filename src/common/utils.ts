import { autorun } from 'mobx'

/**
 * 随机生成一个HSL格式颜色
 */
function randomColor() {
  return `hsl(${Math.round(Math.random() * 360)}, 50%, 50%)`
}

/**
 * mobx 状态持久化
 */
let is_first_run = true
function mobxPersist<T, K extends keyof T>(store: T, fields: K[]): T {
  autorun(() => {
    fields.forEach(field => {
      if (is_first_run) {
        const data = window.sessionStorage.getItem(field as string)
        data && (store[field] = JSON.parse(data))
      }
      window.sessionStorage.setItem(field as string, JSON.stringify(store[field]))
    })
    is_first_run = false
  })
  return store
}

export { randomColor, mobxPersist }
