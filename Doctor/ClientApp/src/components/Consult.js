import React from 'react'
import ad from '../media/fake-ad.png'
import '../css/consult.css'
function Consult() {
  return (
    <div className="consult">
      <div className="cons-texts">
      <h2 className="title">Онлайн <br className="linebreak1"/> консультация</h2>
      <h4 className='text'>
        Онлайн-консультация врача позволяет быстро получить рекомендацию по вашему случаю и
         развеять сомнения относительно дальнейших действий по лечению.
        Консультируйтесь с опытными докторами, а не с медицинскими форумами!
</h4>
      <img alt='pic' className="consult-pic" src={ad}></img>
      </div>
      <ul className="consult-list">
        <li className='consult-item'>
       <div style={{color: '#333333'}}>У вас плотный график?</div >
      В рабочей суматохе не хватает времени на посещение больниц? 
      Сделайте это дистанционно
        </li>
        <li className='consult-item'>
       <div style={{color: '#333333'}}>Недорого</div >
       Цена за консультацию составляет 300 сом
        </li>
        <li className='consult-item'>
       <div style={{color: '#333333'}}>Не выходя из дома</div >
        Не ждите очереди – врач консультирует, когда и где вам удобно
        </li>
        <li className='consult-item'>
       <div style={{color: '#333333'}}>Заявки принимаем круглосуточно</div >
       Оставить заявку можно в любое время суток
        </li>
       
      </ul>
      

    </div>
  )
}

export default Consult
