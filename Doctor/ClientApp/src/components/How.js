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
      Выберите, что вас тревожит и подходящего врача
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Выберите длительность консультации и стоимость
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Введите ваши контактные данные
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Выберите удобный канал связи
      </div>
      <img alt='arrow' className="how-arrow" src={arrow} />
      <div className="how-step">
      Оплатите выбранную услугу и ожидайте звонка врача
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
