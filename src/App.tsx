import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './mock'
import Home from './views/home'
import Login from './views/login'

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
