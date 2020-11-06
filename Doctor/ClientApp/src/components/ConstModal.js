import React, { useState } from 'react'
import { Button, Modal, ModalHeader} from 'reactstrap';
import '../css/constmodal.css'
import choosepic from '../media/2/1.svg'
function ConstModal(props) {


  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <button className={props.style} color="danger" onClick={toggle}>{props.name}</button>

      <Modal isOpen={modal} toggle={toggle} >
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
        <button value='Педиатр' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Педиатр</button>
        <button value='Кардиолог' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Кардиолог</button>
        <button value='Пульмонолог' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Пульмонолог</button>
        <button value='Инфекционисты' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Инфекционисты</button>
        <button value='Дерматовенеролог' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Дерматовенеролог</button>
        <button value='Гинекология' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Гинекология</button>
        <button value='Уролог' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Уролог</button>
        <button value='Семейные врачи' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Семейные врачи</button>
        <button value='Терапевт' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>Терапевт</button>
        <button value='ЛОР врач' className="choose-category-btn" onClick={(e)=> {console.log(e.target.value)}}>ЛОР врач</button>
        </div>
        
      </Modal>
    </div>
  )
}

export default ConstModal
