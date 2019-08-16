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
    fields.forEach(el => {
      if (is_first_run) {
        const data = localStorage.getItem(el as string)
        data && (store[el] = JSON.parse(data))
      }
      localStorage.setItem(el as string, JSON.stringify(store[el]))
    })
    is_first_run = false
  })
  return store
}

export { randomColor, mobxPersist }
