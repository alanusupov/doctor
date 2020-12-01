import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainHold from './components/MainHold';

import { PrivateRoute } from './components/privateroute';
import { LoginPage } from './LoginPage/LoginPage';
import {history} from './_helpers/history'
import {authenticationService} from './_services/authentication.service'
import Admin from './components/admin/Admin';
import AdminDocs from './components/admin/AdminDocs';


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => setCurrentUser({x}));
    
  }, [])

  

  return (
    <div >  
     <BrowserRouter history={history}>
     <div className="wrapper">
       <Switch>
       <Redirect exact from="/" to="/main" />
          <Route path='/main' component={MainHold} />
           <PrivateRoute exact path='/admin' component={Admin} />
           <Redirect exact from="/admin/docs" to="/admin" />
           <Redirect exact from="/admin/spec" to="/admin" />
           <Redirect exact from="/admin/rec" to="/admin" />
           <Redirect exact from="/admin/clients" to="/admin" />
           <Redirect exact from="/admin/cal" to="/admin" />
           <PrivateRoute exact path='/admin/docs' component={AdminDocs} />
           {/* <PrivateRoute exact path='/admin/clients' component={AdminMain} />
           <PrivateRoute exact path='/admin/main' component={AdminClients} /> */}

          <Route path="/login" component={LoginPage} />
       </Switch>
      
       
     </div>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
