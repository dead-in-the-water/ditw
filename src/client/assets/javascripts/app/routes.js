import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './App'

export default (
  <Route path='/' component={App}>
    <Redirect from='*' to='404' />
  </Route>
)
