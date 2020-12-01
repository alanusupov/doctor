import React from 'react'
import flogo from '../media/about1.svg'
import flogo2 from '../media/about2.svg'
import flogo3 from '../media/about3.svg'
import flogo4 from '../media/about4.svg'
import flogo5 from '../media/about5.svg'
import flogo6 from '../media/about6.svg'
import flogo7 from '../media/about7.svg'
import flogo8 from '../media/about8.svg'

import '../css/about.css'
import ad from  '../media/fake-ad.png'
import ConstModal from './ConstModal'

function About() {
  return (
    <div className="about">
      <h2 className="title">Чем мы можем Вам помочь?</h2>
      <h4 className="sub">Узнайте, какие услуги оказывает центр «название» на нашем сайте прямосейчас.</h4>
      <ul className="about-list">
        <li className="about-item">
            <img alt='icon' src={flogo} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li  className="about-item">
            <img id="icon2" alt='icon' src={flogo2} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img alt='icon' src={flogo3} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img alt='icon' src={flogo4} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img id="icon5" alt='icon' src={flogo5} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img alt='icon' src={flogo6} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img alt='icon' src={flogo7} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        <li className="about-item">
            <img alt='icon' src={flogo8} className='about-icon'></img>
            <p className="about-item-sub">Название услуги</p>
        </li>
        
      </ul>
      <ConstModal name="Получить консультацию" style='main-btn'/>
      
    </div>
  )
}

export default About
