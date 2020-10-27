import React from 'react'
import Main from './Main';
import About from './About';
import {Switch, Route} from 'react-router-dom'
function Routers() {
  return (
    <Switch>
         <Route exact path="/" component={Main} />
         <Route exact path="/about" component={About} />
       </Switch>
  )
}

export default Routers;
