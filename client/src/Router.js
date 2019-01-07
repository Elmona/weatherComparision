import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import View from './View/App.js'

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={View} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router