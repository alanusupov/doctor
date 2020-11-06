import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../media/logo.jpg'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import ConstModal from './ConstModal'
function NavBar() {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar className="p-0" style={{background: '#00A3FF'}} color="faded" light>
        <NavbarBrand href="/"  className=" p-2 " style={{color: 'white'}}>
          <img style={{width: '30px'}} src={logo}></img> DoctorOnline</NavbarBrand>
          <nav className='top-nav'>
            <NavLink className='top-nav-item' to='/'>Регистрация</NavLink>
            <NavLink className='top-nav-item' to='/how'>Как заказать</NavLink>
            <NavLink className='top-nav-item' to='/doctors'>Врачи</NavLink>
            <NavLink className='top-nav-item' to='/questions'>Вопросы</NavLink>
            <NavLink className='top-nav-item' to='/contact'>Контакты</NavLink>
           
            <ConstModal name='Заказать' style='main-btn'/>
           
          </nav>
        <NavbarToggler onClick={toggleNavbar} className="mr-2 custom-toggler"  />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="text-center  bg-white"  navbar>
            <div className="nav-shadow">

          <NavItem>
              <NavLink className="nav-link" to="/"><img style={{width: '112px'}} src={logo}></img></NavLink>
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


