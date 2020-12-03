import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader} from 'reactstrap';
import '../css/constmodal.css'
import choosepic from '../media/2/1.svg'
import choose1 from '../media/c1.svg'
import choose2 from '../media/c2.svg'
import choose3 from '../media/c3.svg'
import choose4 from '../media/c4.svg'
import Axios from 'axios';
import { url } from '../url/url';
import { connect } from 'react-redux';
import { getDoctor } from '../redux/actions';
import '../../node_modules/react-rater/lib/react-rater.css'
import Rater from 'react-rater'
import arrleft from '../media/arrowleft.svg'
import arrright from '../media/arrright.svg'
import time from '../media/times.svg'
import 'react-calendar/dist/Calendar.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru'
function ConstModal(props) {
  let [date,setDate] = useState(new Date());
  let [dates, setDates] = useState('')
  let [name, setName] = useState('')
  let [number, setNumber] = useState('')
  let [email, setEmail] = useState('')
  let [comment, setComment] = useState('')
  let [docId, setDocId] = useState('');
  let [day, setDay] = useState('')
  let [spec, setSpec] = useState('')
  let [dname, setDname] = useState('')
  let [specId, setSpecId] = useState('')
  const [locale, setLocale] = useState('ru')

  const modifiers = {
    saturdays: { daysOfWeek: [6] },
    sundays: { daysOfWeek: [0] },
    
  };
  const modifiersStyles = {
    sundays: {
      color: '#00A3FF',
      backgroundColor: '#ffffff',
    },
    saturdays: {
      color: '#00A3FF',
      backgroundColor: '#ffffff',
    },
  };

function getDays(value){
  console.log(value.toISOString());
   Axios.get(url + `/api/Reception/Employee/${docId}/${value.toDateString() + " GMT"}`)
   .then(res =>{
      let dates = res.data;
      console.log(dates);
      setDates(dates)
   })
}

function sendDate(value){
  setDate(value)
  console.log(value);
  getDays(value)
  console.log(value.toDateString());

 
  //document.querySelector('.cal-btns').classList.toggle('btns-remove')
 
}      
    

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let [docs,setDocs] =useState('')

function getDoc(e){
  setSpecId(e.target.id)
  let specialty = e.target.value;
  setSpec(specialty)
  Axios.get(url + "/api/Employee").then((res) => {
    const { data } = res;
    console.log(res);
    if (data) getDoctor(data);
    console.log(data);
    let filterDoc = [];
   data.forEach(d => {
    return d.employeeSpecialties.forEach(n => n.name == specialty ? filterDoc.push(d) : null)
   })
 //let newDocs =  data.filter(doc => doc.employeeSpecialties[0].name == specialty ||  doc.employeeSpecialties[1].name == specialty)
 setDocs(filterDoc)
 document.querySelector('.doc-show').style.display = 'block';
 document.querySelector('.disp-2').style.display = 'block';
 document.querySelector('.disp-1').style.display = 'none';
})
document.querySelector('.cat-show').style.display = 'none';
document.querySelector('#block1').style.display = 'block';
document.querySelector('.left-dis').style.height = '573px';
if(window.innerWidth > '1111'){
  document.querySelector('.right-dis').style.display = 'block'

}
}
function handleDoc(name, id){
  
  //console.log('doc id:' + e.target.id);
 // let docName = document.querySelector('.fdoc-title').textContent;
  setDname(name)
  setDocId(id)
  
  document.querySelector('.doc-show').style.display = 'none';
  document.querySelector('.cal-show').style.display = 'block';

  document.querySelector('.disp-2').style.display = 'none';
  document.querySelector('.disp-3').style.display = 'block';
  document.querySelector('.left-dis').style.left = '-258px';
  document.querySelector('.left-dis').style.height = '646.5px';
  
  
  //273
  document.querySelector('#block2').style.display = 'block';
  document.querySelector('.right-body').style.height = '605px';
  
  if(window.innerWidth > '1111'){
    document.querySelector('.right-dis').style.display = 'block'

  }
}
function prev1(){
  document.querySelector('.doc-show').style.display = 'none';
  document.querySelector('.cat-show').style.display = 'block';
  document.querySelector('.send-show').style.display = 'none';

  document.querySelector('.disp-2').style.display = 'none';
 document.querySelector('.disp-1').style.display = 'block';
 document.querySelector('.left-dis').style.height = '577px';
}
function prev2(){
  document.querySelector('.cal-show').style.display = 'none';
  document.querySelector('.doc-show').style.display = 'block';

  document.querySelector('.disp-2').style.display = 'block';
  document.querySelector('.disp-3').style.display = 'none';
  document.querySelector('.left-dis').style.left = '-273px';

  document.querySelector('.right-body').style.height = '532px';
}
function prev3(){
  document.querySelector('.form-show').style.display = 'none';
  document.querySelector('.cal-show').style.display = 'block';
  document.querySelector('.send-show').style.display = 'none';
  
  document.querySelector('.left-dis').style.left = '-258px';
  document.querySelector('.disp-3').style.display = 'block';
  document.querySelector('.disp-4').style.display = 'none';

}
function prev4(){
  document.querySelector('.form-show').style.display = 'block';
  document.querySelector('.send-show').style.display = 'none';

  document.querySelector('.disp-4').style.display = 'block';
  document.querySelector('.disp-5').style.display = 'none';
  document.querySelector('.right-body').style.height = '605px';
}
function handleCal(){
 
    document.querySelector('.cal-show').style.display = 'none';
    document.querySelector('.form-show').style.display = 'block';
  
    document.querySelector('.disp-4').style.display = 'block';
    document.querySelector('.disp-3').style.display = 'none';
    document.querySelector('.left-dis').style.left = '-273px';

    document.querySelector('#block3').style.display = 'block';
    document.querySelector('#block4').style.display = 'block';

    document.querySelector('.right-dis-line1').style.display = 'block';

}
function handleForm() {
  if(name !== '' && number !== ''){
    document.querySelector('.form-show').style.display = 'none';
    document.querySelector('.send-show').style.display = 'block';
  
    document.querySelector('.disp-4').style.display = 'none';
    document.querySelector('.disp-5').style.display = 'block';

    document.querySelector('#block5').style.display = 'block';
    document.querySelector('.right-body').style.height = '532px';
  }
  
}
function handleSub(e){
  e.preventDefault()
  
}
function handleDay(e){
  setDay(e.target.value);
  document.querySelector('#cal-btnc').style.display = 'block'
}
function handleSend(){
 console.log(date);
  let newD = new Date(date.toDateString().toString() + ' ' + day + ':00:00') 
  const data1 = {
    "specialtyId": parseInt(specId),
    "dateOfReceipt": new Date(newD.toISOString()),
    "employeeId":parseInt(docId),
    "client": {
      "name": name,
      "phone": number,
      "email": email
    }
    
  }
 
async function sendData(){
  const res = await Axios.post(url + "/api/Reception/Post", data1);
  console.log(res);
  setDates('')
  setName('')
  setNumber('')
  setEmail('')
  setComment('')
  toggle()
}sendData()

}



  return (
    <div>
      <button className={props.style} color="danger" onClick={toggle}>{props.name}</button>

      <Modal isOpen={modal} toggle={toggle} >
        <div className='left-dis'>
        <div className='choose-left disp-1'>
            <img className="left-icon" src={choosepic}></img>
            <h2 className="choose-title1">Выберите <br/> специальность</h2>
            <p className="choose-text1">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
          <div style={{display: 'none'}} className='choose-left disp-2'>
            <img className="left-icon" src={choose1}></img>
            <h2 className="choose-title1">Выберите <br/> специальность</h2>
            <p className="choose-text1">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
          <div style={{display: 'none'}} className='choose-left disp-3'>
            <img className="left-icon" src={choose2}></img>
            <h2 className="choose-title1">Выберите <br/> специальность</h2>
            <p className="choose-text3">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
          <div style={{display: 'none'}} className='choose-left disp-4'>
            <img className="left-icon" src={choose3}></img>
            <h2 className="choose-title1">Выберите <br/> специальность</h2>
            <p className="choose-text5">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
          <div style={{display: 'none'}} className='choose-left disp-5'>
            <img className="left-icon" src={choose4}></img>
            <h2 className="choose-title1">Выберите <br/> специальность</h2>
            <p className="choose-text1">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
        </div>
        {//------------RIGHT DISPLAY ------
        }
        <div className='right-dis'>
        <ModalHeader><span className='right-header'>Ваша заявка</span></ModalHeader>
        <div className="right-body">
        <div className='send-info2'>
          <div style={{display: 'none'}} id="block1" className='send-block1'>
            <div className='send-subitem'>УСЛУГА:</div>
            <div className='send-item1'>{spec}</div>
          </div>
         
          <div style={{display: 'none'}} id="block2" className='send-block1'>
            <div className='send-subitem'>ВРАЧ:</div>
            <div className='send-item1'>{dname}</div>
          </div>  
        </div> 
        <hr className='right-dis-line'/>
        <div className='send-info22'>
          <div style={{display: 'none'}} id="block3" className='send-block1'>
            <div className='send-subitem'>ДАТА:</div>
            <div className='send-item1'>{date.toLocaleDateString().toString()}</div>
          </div>
          <div style={{display: 'none'}} id="block4" className='send-block1'>
            <div className='send-subitem'>ВРЕМЯ:</div>
            <div className='send-item1'>{day + ':00'}</div>
          </div>
        </div>
        <hr className='right-dis-line1'/>
        <div className='send-info2'>
          <div style={{display: 'none'}} id="block5" className='send-block1'>
            <div className='send-subitem send-subitem4'>ВАШЕ ИМЯ:</div>
            <div className='send-item1'>{name}</div>
          </div>
          
        </div>

        </div>

        </div>
        <div className='cat-show'>
        <ModalHeader toggle={toggle}>Выбор специальности</ModalHeader>
        <div className='category'>

          <div className='choose-top'>
            <img src={choosepic}></img>
            <h2 className="choose-title">Выберите <br/> специальность</h2>
            <p className="choose-text">
              Пожалуйста, выберите <br/>
             специальность врача, к <br/>
              которому Вы хотите <br/>
               записаться на прием.</p>
          </div>
        <button id='1' value='Педиатр' className="choose-category-btn" onClick={getDoc}>Педиатр</button>
        <button id='2' value='Кардиолог' className="choose-category-btn" onClick={getDoc}>Кардиолог</button>
        <button id='3' value='Пульмонолог' className="choose-category-btn" onClick={getDoc}>Пульмонолог</button>
        <button id='4' value='Инфекционисты' className="choose-category-btn" onClick={getDoc}>Инфекционисты</button>
        <button id='5' value='Дерматовенеролог' className="choose-category-btn" onClick={getDoc}>Дерматовенеролог</button>
        <button id='6' value='Гинекология' className="choose-category-btn" onClick={getDoc}>Гинекология</button>
        <button id='7' value='Уролог' className="choose-category-btn" onClick={getDoc}>Уролог</button>
        <button id='8' value='Семейные врачи' className="choose-category-btn" onClick={getDoc}>Семейные врачи</button>
        <button id='9' value='Терапевт' className="choose-category-btn" onClick={getDoc}>Терапевт</button>
        <button id='10' value='ЛОР врач' className="choose-category-btn" onClick={getDoc}>ЛОР врач</button>
        </div>

        </div>
        
        
        
        
      
        <div style={{display: 'none'}} className='doc-show'>
        <ModalHeader toggle={toggle}>Выбор врача</ModalHeader>
        <div className='fdocs'>
             { docs ? docs.map(x => (
                  <div name={x.fullName} id={x.employeeId} onClick={() => handleDoc(x.fullName, x.employeeId)}
                   className='fdoc' key={x.employeeId}>
                    <div id={x.employeeId} className='fdoc-img-wrap'>
                      <img id={x.employeeId} className='fdoc-img' src={url + x.imgUrl}/>
                    </div>
                    <div id={x.employeeId} className='ratef'>
                    <Rater total={5} rating={x.rating}/>
                    <div id={x.employeeId} className='fdoc-title'>{x.fullName}</div>
                    <div id={x.employeeId} className='fdoc-exp'>стаж {x.experience} лет</div>
                    </div>
                  </div>
                )) : null}
         </div>
         <button onClick={prev1} className='const-btn-left'> <img alt='arrow' src={arrleft}/> Назад</button>
         {/* <div className='btn-wrapper'>
         <button className='const-btn-left1'> <img alt='arrow' src={arrleft}/> Назад</button>
         <button className='const-btn-right'> Далее</button>
         </div> */}



       </div>

{// ------------    CALENDAR ---------
}
      <div style={{display: 'none'}} className='cal-show'>
      <ModalHeader toggle={toggle}>Выбор date</ModalHeader>
        <div className='cal-wrap'>
        
              <DayPicker
              localeUtils={MomentLocaleUtils} locale={locale}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              onDayClick={sendDate} />
          <div className='cal-img-wrap'>
            <img src={time} className='cal-img'/>
          </div>
<div className="cal-sub">Выберите время для встречи на {date.toLocaleDateString().toString()}</div>
          <div className="cal-btns">
            {dates ? dates.map(day => (
              <button onClick={(e) => handleDay(e)} value={day.dateTime} id={day.status} className='cal-btn'>{day.dateTime}</button>
           )) : <div>Выберите дату </div>
        }
          </div>
        </div>
          

        <div className='btn-wrapper'>
         <button onClick={prev2} className='const-btn-left'> <img alt='arrow' className="arr-left" src={arrleft}/> Назад</button>
         <button id='cal-btnc' onClick={handleCal} className='const-btn-right'> Далее <img alt='arrow'  className="arr-right" src={arrright}/></button>
         </div>
      </div>
      {//------------- FORM -------
      }
      <div style={{display: 'none'}}  className='form-show'>
        <ModalHeader toggle={toggle}>Ввод данных</ModalHeader>
        <form onSubmit={(e) => handleSub(e)} className='form'>
          <input
           value={name} 
           onChange={(e)=> setName(e.target.value)}
           className='form-input' type='text' placeholder='Ваше имя и фамилия' required/>
          <input
          value={number} 
          onChange={(e)=> setNumber(e.target.value)}
          className='form-input' type='number' placeholder='Ваш номер телефона' required/>
          <input
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}
          className='form-input' type='email' placeholder='Ваша почта (не обязательно)'/>
          <input
          value={comment} 
          onChange={(e)=> setComment(e.target.value)}
           id="form-text" className='form-input' type='text' placeholder="Добавить комментарий" />

          <div className='btn-wrapper'>
         <button onClick={prev3} className='const-btn-left'> <img alt='arrow' className="arr-left" src={arrleft}/> Назад</button>
         <button onClick={handleForm} className='const-btn-right'> Далее <img alt='arrow'  className="arr-right" src={arrright}/></button>
         </div>
        </form>
        
      </div>
      {//---------SEND PAGE ---
      }
     <div style={{display: 'none'}}  className='send-show'>
     <ModalHeader toggle={toggle}>Проверьте информацию</ModalHeader>
      <div className='send-body'>
        <h4 className='send-title'>Информация о записи</h4>
        <hr className='con-line-b'/>
        <div className='send-info'>
          <div className='send-block'>
            <div className='send-subitem'>ДАТА:</div>
            <div className='send-item'>{date.toLocaleDateString().toString()}</div>
          </div>
          <div className='send-block'>
            <div className='send-subitem'>ВРЕМЯ:</div>
            <div className='send-item'>{day + ':00'}</div>
          </div>
        </div>
        <hr className='con-line-d'/>
        <div className='send-info1'>
          <div className='send-block'>
            <div className='send-subitem'>ВРАЧ:</div>
            <div className='send-item'>{dname}</div>
          </div>
          <div className='send-block'>
            <div className='send-subitem'>УСЛУГА:</div>
            <div className='send-item'>{spec}</div>
          </div>
        </div>
        <h4 className='send-title'>Информация о Вас</h4>
        <hr className='con-line-b'/>
        <div className='send-info'>
          <div className='send-block'>
            <div className='send-subitem'>ВАШЕ ИМЯ:</div>
            <div className='send-item'>{name}</div>
          </div>
          <div className='send-block'>
            <div className='send-subitem'>ВАШ НОМЕР ТЕЛЕФОНА:</div>
            <div className='send-item'>{number}</div>
          </div>
        </div>
        <hr className='con-line-d'/>
        <div className='send-block'>
            <div className='send-subitem'>ВАША ПОЧТА</div>
            <div className='send-item'>{email ? email : 'Не указано'}</div>
          </div>

          <div className='send-text'>В случае, если вы обнаружили ошибку, можете вернуться Назад и внести свои правки.</div>
          <div className='btn-wrapper'>
         <button onClick={prev4} className='const-btn-left'> <img alt='arrow' className="arr-left" src={arrleft}/> Назад</button>
         <button onClick={handleSend} className='const-btn-right'> Отправить <img alt='arrow'  className="arr-right" src={arrright}/></button>
         </div>
       </div>
     </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  let { doctors } = state.DoctorReducer;
  return { doctors };
};

export default  connect (mapStateToProps, {getDoctor})(ConstModal)
