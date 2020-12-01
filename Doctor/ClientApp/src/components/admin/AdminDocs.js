import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getDoctor, deleteDoctor, getSpec, addNewDoctor } from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import Rater from 'react-rater';
import docf from '../../media/docform.png'
import '../../css/admindoc.css'

function AdminDocs({getDoctor, getSpec, ...props}) {

  
  
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [number,setNumber] = useState('');
  const [info, setInfo] = useState('');
  const [ed, setEd] = useState('');
  const [exp,setExp] = useState('');
  const [proc,setProc] = useState('');
  const [sick,setSick] = useState('');
  const [rate,setRate] = useState('');
  const [workN,setWorkN] = useState('');
  
  
  const [specData,setSpecData] = useState('');
  const [img,setImg] = useState('');
  const [arr,setArr] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  


  useEffect(() => {
    Axios.get(url + "/api/Employee").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getDoctor(data);
     
      
    });
  }, [getDoctor]);

  useEffect(() => {
    Axios.get(url + "/api/Specialty").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getSpec(data);
     setSpecData(data)
      
    });
  }, [getSpec]);
  

  function deleteDoc(id){
    
    async function delDoctor(id) {
      const res = await Axios.delete(url + `/api/Employee/${id}`);
      console.log(res);
      console.log(props);
      props.deleteDoctor(id);
     
    }
    delDoctor(id);
   // Axios.delete(url + `api/Employee/${id}`)
  }
 
  function handleSub(e){
    e.preventDefault();
    

    let newarr = arr.filter((thing, index, self) =>
       index === self.findIndex((t) => (
         t.place === thing.place && t.name === thing.name
       ))
     )
   

   console.log(img);

    const data1 = {
      "fullName": name,
      "email": email,
      "imgUrl": img,
      "employeeSpecialties": newarr,
      "aboutMe": info,
      "experience": parseInt(workN),
      "workExperience": exp.split('.'),
      "education": ed.split('.'),
      "performedProcedures": proc.split('.'),
      "treatmentOfDiseases": sick.split('.'),
      "rating": parseInt(rate) 
              
    }
   
  async function sendData(){
    const res = await Axios.post(url + "/api/Employee/", data1);
    props.addNewDoctor(data1)
    console.log(res);
    setName('')
    setNumber('')
    setEmail('')
    setInfo('');
    setEd('');
    setExp('');
    setProc('');
    setSick('');
    setRate('');
    setWorkN('');
  }
  setTimeout(() => {
     sendData()
  }, 1000);
 



  }
  function Dbtn1(){
    document.querySelector('.adocs').style.display = 'flex';
    document.querySelector('.add-doc').style.display = 'none';
  }
   function Dbtn2(){
    document.querySelector('.adocs').style.display = 'none';
    document.querySelector('.add-doc').style.display = 'block';
  }
  const [fname, setFname] = useState('');


  function sendPic(e){
    console.log(e.target.files[0]);
   setSelectedFile(e.target.files[0]);
   setFname(e.target.files[0].name)
   
     
  }
     async function sendFile(e){
       e.preventDefault();
      console.log(selectedFile);
      const formData = new FormData();
      formData.append('fileName', fname)
      formData.append('formFile', selectedFile)
      console.log( formData);
    
    const res = await Axios.post(url + '/api/File', formData)
      console.log(res.data);
      setImg(res.data);
    }
  
    
 
  const showArr = useEffect(() => {
   
    setArr(arr)
   console.log(arr);
  
  
  }, [arr]);
  console.log(arr);
  
  function handleSpec(e){

    let obj = {
      "name": e.target.value
     }
   
     if(e.target.checked){
       setArr(arr.concat(obj))
       
     } else if(e.target.checked !== true){
        var index = arr.map(function(e) { return e.name; }).indexOf(e.target.value);
     console.log(index);
     arr.splice(index, 1)
     }
     
    
  }
  
  
  


  return (
    <div style={{width: '100%'}}>
      <button className='adoc-btn' onClick={Dbtn1}>Врачи</button>
      <button className='adoc-btn' onClick={Dbtn2}>Добавить врача</button>
<hr />

       <div style={{margin: '0 50px'}}  className='docs adocs'>
      {props.doctors ? props.doctors.map(doc => (
        <div key={doc.employeeId} id={doc.employeeId} style={{margin: '22px'}} className="doctor">
            <div className="doc-img-wrap-a">
              <img className='doc-img' src={url + doc.imgUrl} />
            </div>
            <Rater total={5} rating={doc.rating}></Rater>
      <div style={{fontSize: "11px", maxWidth: "120px"}} className='doc-name'>{doc.fullName}</div>
        <button  onClick={() => deleteDoc(doc.employeeId)} className="admin-btn">Удалить</button>
        </div>
     
      )) : null}

      </div>
      {//------------ADD DOCS--------->>>
      }
      <div style={{display: 'none'}} className='add-doc'>
        <form onSubmit={(e) => handleSub(e)} className='sdoc-form'>
         <div className='sdoc-top'>
           <div className='sdoc-top-in'>
          <input
          className='sdoc-inputs' 
          value={name} 
          onChange={(e)=> setName(e.target.value)} 
          type="text" name="name" placeholder="Ф.И.О. врача" />

          <input
          className='sdoc-inputs' 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)} 
          type="email" name="email" placeholder="E-mail врача" />

          <input
          className='sdoc-inputs' 
          value={number} 
          onChange={(e)=> setNumber(e.target.value)} 
          type="number" name="number" placeholder="Номер врача" />

           <input 
            type="number"
            placeholder="Рейтинг 1-5" 
            value={rate} 
            min="1" max="5"
            onChange={(e)=> setRate(e.target.value)}
            className='sdoc-inputs' name="Рейтинг" >
            </input>
            <input 
            type="number"
            placeholder="Лет опыта" 
            value={workN} 
            onChange={(e)=> setWorkN(e.target.value)}
            className='sdoc-inputs' name="Рейтинг" >
            </input>
        
            
         
        
          
           </div>
        <div  className='sdoc-img-form'>
          <img  src={docf} className='sdoc-img' />
          <input style={{maxWidth: '180px'}} onChange={(e) => sendPic(e)} type='file' id='file' className='in-file' />
          <button onClick={(e) => sendFile(e)}>Add file</button>
        </div>
         </div>
          <div className='sdoc-bottom'>
            <div className='sdoc-bwrap'>
            <textarea 
            placeholder="Описание врача"
            value={info} 
            onChange={(e)=> setInfo(e.target.value)}
             className='sdoc-bigin' name="Описание врача" rows="8" cols="48">
            </textarea>
            <textarea 
            placeholder="Образование" 
            value={ed} 
            onChange={(e)=> setEd(e.target.value)}
            className='sdoc-bigin' name="Образование" rows="8" cols="48">
            </textarea>
            </div>

            <div className='sdoc-bwrap'>
            <textarea 
            placeholder="Опыт работы"
            value={exp} 
            onChange={(e)=> setExp(e.target.value)}
             className='sdoc-bigin' name="Опыт работы" rows="8" cols="48">
            </textarea>
            <textarea 
            placeholder="Выполняемые процедуры" 
            value={proc} 
            onChange={(e)=> setProc(e.target.value)}
            className='sdoc-bigin' name="Выполняемые процедуры" rows="8" cols="48">
            </textarea>
            </div>

            <div className='sdoc-bwrap'>
            <textarea 
            placeholder="Лечение заболеваний"
            value={sick} 
            onChange={(e)=> setSick(e.target.value)}
             className='sdoc-bigin' name="Лечение заболеваний" rows="8" cols="48">
            </textarea>
            <div className='check-wrap'>
          {specData ? specData.map(spec => (
              
              <div className='sdoc-check'>
              {spec.name}  
              <input   id={spec.specialtyId} 
              value={spec.name} type='checkbox' 
              onClick={(e) => {handleSpec(e)}}/>
                </div>

            )): 'Loading...'}
        </div>
            
            </div>
            </div>    
        <button type='submit' className='btn btn-primary'>Добавить врача</button>
         
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  let { doctors } = state.DoctorReducer;
  let {specs} = state.SpecReducer;
  return { doctors, specs };
};

export default connect(mapStateToProps, {getDoctor, deleteDoctor, addNewDoctor, getSpec})(AdminDocs) 
