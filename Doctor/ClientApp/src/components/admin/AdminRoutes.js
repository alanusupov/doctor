import React from 'react'
import { Switch } from 'react-router-dom'
import AdminClients from './AdminClients'
import AdminMain from './AdminMain'
import { PrivateRoute } from '../privateroute'
import AdminDocs from './AdminDocs'
import AdminCal from './AdminCal'
import AdminRec from './AdminRec'
import AdminSpec from './AdminSpec'


function AdminRoutes() {
  return (
    <div>
      <Switch>
         <PrivateRoute exact path="/admin/clients" component={AdminClients}/>
         <PrivateRoute exact path="/admin" component={AdminMain}/> 
         <PrivateRoute exact path="/admin/docs" component={AdminDocs}/> 
         <PrivateRoute exact path="/admin/cal" component={AdminCal}/> 
         <PrivateRoute exact path="/admin/rec" component={AdminRec}/> 
         <PrivateRoute exact path="/admin/spec" component={AdminSpec}/> 
        
      </Switch>
    </div>
  )
}

export default AdminRoutes
