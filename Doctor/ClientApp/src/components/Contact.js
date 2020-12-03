import React from 'react'
import insta from '../media/instagram.svg'
import logo from '../media/blacklogo.svg'
import face from '../media/face.svg'
import '../css/contact.css'
import ConstModal from './ConstModal'
function Contact() {
  return (
    <div className='contact'>

    <div className='contact-icons'>
      <div className='contact-item'>
        <img alt='icon social media' src={insta}></img>
      </div>
     
      <div className='contact-item'>
      <img alt='icon social media' src={face}></img>
      {/* <img alt='icon social media' src={process.env.PUBLIC_URL +'/about3.png'}></img> */}

      </div>
     
    </div>
    <ConstModal name='Заказать консультацию' style='main-btn'/>
    <a className='contact-link linkcon1' href='#'>Политика конфиденциальности</a>
    <a className='contact-link' href='#'>Публичный договор</a>
    <img src={logo}/>
    </div>
  )
}

export default Contact
