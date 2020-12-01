import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div style={{display: 'table-cell'}}>

    <div className='admin-nav'>
       
      <Link className='admin-link' to='/admin'>ПАНЕЛЬ УПРАВЛЕНИЯ</Link>
      <Link className='admin-link' to='/admin/cal'>КАЛЕНДАРЬ</Link>
      <Link className='admin-link' to='/admin/rec'>ПРИЁМ</Link>
      <div className='admin-nav-div'>ЗАПИСИ <hr className='admin-nav-line' /></div>
      <Link className='admin-link' to='/admin/spec'>УСЛУГИ</Link>
      <Link className='admin-link' to='/admin/docs'>ВРАЧИ</Link>
      <Link className='admin-link' to='/admin/clients'>КЛИЕНТЫ</Link>
      
    </div>
    </div>
  )
}

export default AdminNav
