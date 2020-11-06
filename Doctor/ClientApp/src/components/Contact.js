import React from 'react'
import insta from '../media/instagram.svg'
import whats from '../media/whatsapp.svg'
import odno from '../media/odnokl.svg'
import twi from '../media/twi.svg'
import teleg from '../media/teleg.svg'
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
        <img alt='icon social media' src={whats}></img>
      </div>
      <div className='contact-item'>
        <img id='odno' alt='icon social media' src={odno}></img>
      </div>
      <div className='contact-item'>
        <img alt='icon social media' src={twi}></img>
      </div>
      <div className='contact-item'>
        <img alt='icon social media' src={teleg}></img>
      </div>
      <div className='contact-item'>
      <img alt='icon social media' src={face}></img>
      {/* <img alt='icon social media' src={process.env.PUBLIC_URL +'/about3.png'}></img> */}

      </div>
     
    </div>
    <ConstModal name='Заказать консультацию' style='main-btn'/>
    <a className='contact-link linkcon1' href='#'>Политика конфиденциальности</a>
    <a className='contact-link' href='#'>Публичный договор</a>
    </div>
  )
}

export default Contact
