import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './mock'
import BasicLayout from './layouts/BasicLayout'
import Login from './pages/Login'

const App: React.FC = props => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={BasicLayout} />
      </Switch>
    </Router>
  )
}

export default App
