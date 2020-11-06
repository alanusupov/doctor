import React from 'react'
import ad from '../media/fake-ad.png'
import '../css/consult.css'
function Consult() {
  return (
    <div className="consult">
      <div className="cons-texts">
      <h2 className="title">Онлайн <br className="linebreak1"/> консультация</h2>
      <h4 className='text'>Краткое описание блока. Краткое описание блока. Краткое описание блока. Краткое описание блока. Краткое описание блока.</h4>
      <img alt='pic' className="consult-pic" src={ad}></img>
      </div>
      <ul className="consult-list">
        <li className='consult-item'>
        Преимущества в онлайн консультировании
        </li>
        <li className='consult-item'>
        Преимущества в онлайн консультировании
        </li>
        <li className='consult-item'>
        Преимущества в онлайн консультировании
        </li>
        <li className='consult-item'>
        Преимущества в онлайн консультировании
        </li>
        <li className='consult-item'>
        Преимущества в онлайн консультировании
        </li>
      </ul>
      

    </div>
  )
}

export default Consult
