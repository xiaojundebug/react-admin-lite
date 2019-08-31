/**
 * 必须登录才能展示
 */
import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import * as stores from '../../store'

type PickRequired<T, K extends keyof T> = T & Required<Pick<T, K>>

const AuthRoute: React.FC<PickRequired<RouteProps, 'component'>> = props => {
  const { isLogged } = useContext(stores.userStore)
  const { component: Component, ...rest } = props
  
  return (
    <Route
      {...rest}
      render={props => {
        return isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )
}

export default AuthRoute
