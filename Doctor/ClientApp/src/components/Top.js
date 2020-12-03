import React from 'react'
import img from '../media/mustache.png'
import '../css/top.css'
import ConstModal from './ConstModal'


function Top() {
  return (
    <div className="top">
      <div className='top-block'>
        <h1 className="top-title">Комфортная онлайн - <br /> консультация с врачом</h1>
        <ul className="top-list">
          <li className="top-list-item">
          Работаем ежедневно
          </li>
          <li className="top-list-item">
          Заявки принимаем круглосуточно
          </li>
        </ul>
         <div className='top-btn-wrap2'>
           <ConstModal name="Записаться на консультацию" style='top-btn' />
      </div>
      </div>
      
      <img alt='doctor' className="top-img" src={img}></img>
      <div className='top-btn-wrap'>
      <ConstModal name="Записаться на консультацию" style='main-btn' />

      </div>
    </div>
  )
}

export default Top
