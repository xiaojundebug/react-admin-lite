// type Permission = ['admin', 'guest'][number] // 这样写提示会详细一些

type Permission = 'admin' | 'guest'

interface IMenu {
  name: string
  key: string
  icon?: string
  component?: React.ComponentType<any>
  children?: IMenu[]
  permissions?: Permission[]
}
