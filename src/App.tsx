import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './mock'
import Home from './pages/Home'
import Login from './pages/Login'

const App: React.FC = props => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App
