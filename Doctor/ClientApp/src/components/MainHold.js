import React from 'react'

import Main from './Main'
import Contact from './Contact'
import NavBar from './Header'
import { BrowserRouter } from 'react-router-dom'
import Routers from './Routers'
function MainHold() {
  return (
    <div>
      <BrowserRouter>
     <div className="wrapper">
       
        <NavBar />
       <Routers />
       <Contact/>
     </div>
        
     </BrowserRouter>
    </div>
  )
}

export default MainHold
