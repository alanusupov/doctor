import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'

import Routers from './components/Routers';


function App() {
  return (
    <div >
     <BrowserRouter>
        <Header/>
        <div className="container pt-4">
       <Routers/>

        </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
