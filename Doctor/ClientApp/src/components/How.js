import React from 'react'
import arrow from '../media/arrowdown.svg'
import '../css/how.css'
import ad from '../media/fake-ad.png'
import ConstModal from './ConstModal'

function How() {
  // useEffect(() => {
  //   Axios.get('https://localhost:5001/api/Doctor').then((res) => {
  //     const { data } = res;
  //     console.log(res);
     
  //   });
  // }, []);
   
  return (

    <div className="how">
      <div className='how-info'>
         <h2 className="title how-title">Как получить консультацию?</h2>
      <div className="how-step">
      Первый шаг
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Второй шаг
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Третий шаг
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Четвертый шаг
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Пятый шаг
      </div>
      <ConstModal name='Получить консультацию' style='main-btn'/>
      </div>
     <div className='how-texts'>
      <h2 className='title'>
      Добро пожаловать в Название Сайта!
      </h2>
    <p className='text'>
      Здесь Вы можете получить качественную онлайн-консультацию с врачом,
       которого посчитаете нужным выбрать. Для этого просто следуйте указаниям,
        что написаны слева.</p>
     </div>
    </div>
  )
}

export default How
