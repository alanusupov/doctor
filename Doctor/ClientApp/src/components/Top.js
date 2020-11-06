import React from 'react'
import img from '../media/topdoc.png'
import '../css/top.css'
import ConstModal from './ConstModal'


function Top() {
  return (
    <div className="top">
      <div className='top-block'>
        <h1 className="top-title">Онлайн-консультация с врачом</h1>
         <h4 className="top-sub">Получите рекомендации опытного врача сидя на диване.</h4>
         <div className='top-btn-wrap2'>
           <ConstModal name="Получить консультацию" style='top-btn' />
      </div>
      </div>
      
      <img alt='doctor' className="top-img" src={img}></img>
      <div className='top-btn-wrap'>
      <ConstModal name="Получить консультацию" style='main-btn' />

      </div>
    </div>
  )
}

export default Top
