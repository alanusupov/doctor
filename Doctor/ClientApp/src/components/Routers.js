import React from 'react'
import Main from './Main';

import {Switch, Route} from 'react-router-dom'
import How from './How';
import About from './About';
import Doctors from './Doctors';
import Consult from './Consult';
import Questions from './Questions';
import DoctorDetails from './DoctorDetails';
import MainHold from './MainHold';
function Routers() {
  return (
    <Switch>
         
          <Route exact path="/main/" component={Main} /> 
         <Route exact path="/how" component={How} />
         <Route exact path="/about" component={About} />
         <Route exact path="/consult" component={Consult} />
         <Route exact path="/doctors" component={Doctors} />
         <Route exact path="/questions" component={Questions} />
         <Route exact path="/doctors/:id" component={DoctorDetails} />

         
       </Switch>
  )
}

export default Routers;
