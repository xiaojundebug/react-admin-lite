import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './mock'
import Layout from './Layout'
import Login from './pages/Login'

const App: React.FC = props => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  )
}

export default App
