import React from 'react'
import {  BrowserRouter, Link } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'
import { authenticationService } from '../../_services/authentication.service';
import { history } from '../../_helpers/history';
import AdminNav from './AdminNav';
import '../../css/admin.css'
import AdminMain from './AdminMain';

function Admin() {
  
  function logout() {
    authenticationService.logout();
    history.push('/login');
}
  return (
    <div>
      <BrowserRouter>
      <div className='top-admin'>
     <Link to='/admin'>Admin Panel</Link> 
    <div onClick={logout}>Logout</div>
        
      </div>
     <div className='admin-wrap'>
      <AdminNav />
      <div style={{width: '100%'}}>

      <AdminRoutes />
      </div>
     </div>    
      </BrowserRouter>
     
    </div>
  )
}

export default Admin
