import { createContext } from 'react'
import { observable, action, computed } from 'mobx'
import { mobxPersist } from '../../common/utils'

export class UserStore {
  @observable userinfo: any = {}

  @action
  saveUserinfo = (data: any) => {
    this.userinfo = data
  }

  @computed
  get isLogged() {
    return Object.keys(this.userinfo).length > 0
  }

  @action
  cleanUserinfo = () => {
    this.userinfo = {}
  }
}

export default createContext(mobxPersist(new UserStore(), ['userinfo']))
