import { createContext } from 'react'
import { observable, action } from 'mobx'

class UiStore {
  @observable loading: boolean = false

  @action
  openLoading = () => {
    this.loading = true
  }

  @action
  closeLoading = () => {
    this.loading = false
  }
}

export default createContext(new UiStore())
