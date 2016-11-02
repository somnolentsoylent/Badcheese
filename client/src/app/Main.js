// Main.js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App'
import Board from './Board'
import Home from './Home'
import Landing from './Landing'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Landing}/>
	    <Route path="/:board" component={Board}/>
    </Route>
  </Router>
), document.getElementById('root'))