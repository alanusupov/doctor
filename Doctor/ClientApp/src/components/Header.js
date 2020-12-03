import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../media/mainlogo.svg'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import ConstModal from './ConstModal'
import logo2 from '../media/blacklogo.svg'
function NavBar() {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar className="p-0" style={{background: 'linear-gradient(90deg, #00A3FF 0%, #0090E1 100%, #005D92 100%)'}} color="faded" light>
        <NavbarBrand href="/"  className=" p-2 " style={{color: 'white'}}>
          <img style={{width: '162px', height: '51px', margin: '20px', marginBottom: 0}} src={logo}></img></NavbarBrand>
          <nav className='top-nav'>
            <NavLink className='top-nav-item' to='/how'>Как заказать</NavLink>
            <NavLink className='top-nav-item' to='/doctors'>Врачи</NavLink>
            <NavLink className='top-nav-item' to='/questions'>Вопросы</NavLink>
            <NavLink className='top-nav-item' to='/contact'>Контакты</NavLink>
           
            <ConstModal name='Записаться' style='main-btn'/>
           
          </nav>
        <NavbarToggler onClick={toggleNavbar} className="mr-2 custom-toggler"  />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="text-center  bg-white"  navbar>
            <div className="nav-shadow">

          <NavItem>
              <NavLink className="nav-link" to="/"><img style={{width: '112px'}} src={logo2}></img></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/how">Как заказать</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/doctors'>Врачи</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/about'>Отзывы</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/questions'>Вопросы</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/contact'>Контакты</NavLink>
            </NavItem>
            </div>  
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar


