import React from 'react'
import { NavLink } from 'react-router-dom'



function Header() {
  return (
    <div className="navbar navbar-primary navbar-expand-lg bg-primary">
      <div className="navbar-brand  ">
        CONTACT BOOK
      </div>
      <ul className="navbar-nav">
        <li className="navbar-item">
          <NavLink className="nav-link text-dark" to="/">Main page</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="nav-link text-dark" to="/about">About</NavLink>
           
        </li>
      </ul>
    </div>
  )
}

export default Header
