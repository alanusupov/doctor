import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Routers from './components/Routers';
import NavBar from './components/Header';
import Contact from './components/Contact';


function App() {
  return (
    <div >  
     <BrowserRouter>
     <div className="wrapper">
       <NavBar/>  
       <Routers/>
       <Contact/>
     </div>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
