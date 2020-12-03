import React from 'react'
import '../css/questions.css'
import SlideDown from './SlideDown'
import fat from '../media/fatrec.png'
function Questions() {
  return (
    <div className='questions'>
      <div className='q-info'>
      <h2 className='title'>Часто задаваемые вопросы</h2>
      <img className='q-img' src={fat}></img>

      </div>
      <div className='q-list'>
        <SlideDown  text='random text asdf dfaskdfjkds jfksd kdfs'/>
        <SlideDown  text='random text asdf dfaskdfjkds jfksd kdfs'/>
        <SlideDown  text='random text asdf dfaskdfjkds jfksd kdfs'/>
       
        
      </div>
    </div>
  )
}

export default Questions
