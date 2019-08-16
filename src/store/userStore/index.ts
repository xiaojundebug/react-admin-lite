import { createContext } from 'react'
import { observable, action } from 'mobx'
import { mobxPersist } from '../../common/utils'

export class UserStore {
  @observable userinfo: any = {}

  @action
  saveUserinfo = (data: any) => {
    this.userinfo = data
  }

  @action
  cleanUserinfo = () => {
    this.userinfo = {}
  }
}

export default createContext(mobxPersist(new UserStore(), ['userinfo']))
