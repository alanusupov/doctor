import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { url } from '../url/url';
import '../css/doc-detail.css'
import '../../node_modules/react-rater/lib/react-rater.css'
import Rater from 'react-rater'
import box from '../media/boxf.png'
import ConstModal from './ConstModal';

function DoctorDetails() {

  const params = useParams();
  const [data,setData] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(params);
  useEffect(()=>{
    Axios.get(url + '/api/Employee/' + params.id)
    .then(({data}) => {
      setData(data);
      console.log(data);
    })
    .finally(()=>{
      setLoading(false)
    })
    
  }, [params.id])
  if(loading)return (<h1>Loading...</h1>)
  console.log(data);
  return (
    <div>
     {data ? (
       <div>
       <div className='doc-detail'>
         <div className="dd-top">
         <div className="dd-show">
           <div className="dd-img-wrap">
             <img className="doc-img" src={url + data.imgUrl} />
           </div>
           <div className="dd-rating">
             {data.rating} <Rater total={5} rating={data.rating}/>
           </div>
     <div className="dd-exp"><span className='dd-exnum'>{data.experience}</span>лет опыта</div>
         </div>
         <div className="dd-info">
     <h2 className='title'>{data.fullName}</h2>
     <div className='dd-specs'>
       {data.employeeSpecialties.map(spec => (
         <div className='dd-spec'>{spec.name}</div>
       ))}
     </div>
     <p className='dd-text'>
       {data.aboutMe}
     </p>
         </div>
         </div>
         <ConstModal name="Записаться" style='top-btn' />
       </div>
        <hr className="dd-line"></hr>
        <div className='doc-detail2'>
          <div className='dd-list-info'>
            <h2 className='dd-title'>Опыт работы</h2>
            <ul className='dd-list'>
                {data.workExperience.map(info => (
                  <li className='dd-item'>
                    {info}  
                  </li>
                ))}
            </ul>
          </div>
          <div className="dd-pic-wrap">
            <img className='dd-pic' src={box}/>
          </div>
        </div>
        <hr className="dd-line"></hr>
        <div className='doc-detail2'>
          <div className='dd-list-info'>
            <h2 className='dd-title'>Образование</h2>
            <ul className='dd-list'>
                {data.education.map(info => (
                  <li className='dd-item'>
                    {info}  
                  </li>
                ))}
            </ul>
          </div>
          <div className="dd-pic-wrap">
            <img className='dd-pic' src={box}/>
          </div>
        </div>
        <hr className="dd-line"></hr>
        <div className='doc-detail2'>
          <div className='dd-list-info'>
            <h2 className='dd-title'>Выполняемые процедуры</h2>
            <ul className='dd-list'>
                {data.performedProcedures.map(info => (
                  <li className='dd-item'>
                    {info}  
                  </li>
                ))}
            </ul>
          </div>
          <div className="dd-pic-wrap">
            <img className='dd-pic' src={box}/>
          </div>
        </div>
        <hr className="dd-line"></hr>
        <div className='doc-detail2'>
          <div className='dd-list-info'>
            <h2 className='dd-title'>Лечение заболеваний</h2>
            <ul className='dd-list'>
                {data.treatmentOfDiseases.map(info => (
                  <li className='dd-item'>
                    {info}  
                  </li>
                ))}
            </ul>
          </div>
          <div className="dd-pic-wrap">
            <img className='dd-pic' src={box}/>
          </div>
        </div>
       </div>
     ): (
       null
     )}
    </div>
  )
}

export default DoctorDetails
