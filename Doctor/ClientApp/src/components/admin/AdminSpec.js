import React, { useEffect, useState } from 'react'
import { getSpec, deleteSpec, updateSpec, addNewSpec } from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import { connect } from 'react-redux';
import '../../css/adminspec.css'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'

function AdminSpec({getSpec, ...props}) {
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [prio,setPrio] = useState('');

  const [name2, setName2] = useState('');
  const [price2, setPrice2] = useState('');
  const [prio2,setPrio2] = useState('');
  const [isEdit,setIsEdit] = useState();

  useEffect(() => {
    Axios.get(url + "/api/Specialty").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getSpec(data);
      
    });
  }, [getSpec]);
  console.log(props);
  function deleteSpeci(id){
    async function deleteS(id) {
      const res = await Axios.delete(url + `/api/Specialty/${id}`);
      console.log(res);
      props.deleteSpec(id);
     
    }
    deleteS(id);
  }

  function EditData(id, name, price, prio) {
    setName(name);
    setPrice(price);
    setPrio(prio);
    if (isEdit !== id) {
      
      setIsEdit(id);
    } else {
      setIsEdit("");
    }
  }
  function saveData(id) {
    

    const data = {
      "specialtyId": id,
      "name": name,
      "price": parseInt(price) ,
      "priority": parseInt(prio) 
    };
    setIsEdit("");

    async function saveProduct() {
      const res = await Axios.put(url + `/api/Specialty`, data);
      props.updateSpec(res.data);
      console.log(res.data);
      
    }
    saveProduct(id);
  }
  function Sbtn1(){
    document.querySelector('.aspec-wrap').style.display = 'flex'
    document.querySelector('.aspec-wrap2').style.display = 'none'
  }
  function Sbtn2(){
    document.querySelector('.aspec-wrap2').style.display = 'block'
    document.querySelector('.aspec-wrap').style.display = 'none'
  }

  function handleSub(e){
    e.preventDefault();
    const data1 ={
      "name": name2,
      "price": parseInt(price2) ,
      "priority": parseInt(prio2) 
    }
    if(name2 !== '' && price2 !== ''){
      async function addData(){
        const res = await Axios.post(url + '/api/Specialty', data1)
        console.log(res);
        props.addNewSpec(data1)
        setPrice2('');
        setName2('');
        setPrio2('');
        
      }
      addData();
     setTimeout(() => {
       window.location.reload(false);
     }, 1000); 
    }
  }
  return (
    <div>
      <button className='adoc-btn' onClick={Sbtn1}>Услуги</button>
      <button className='adoc-btn' onClick={Sbtn2}>Добавить услугу</button>
    <hr />
      <div className='aspec-wrap'>

     {props.specs.map(spec => (
       <div className='admin-spec-box' key={spec.specialtyId}>
         <div className='aspec-title'>{spec.name}</div>
         <div className='aspec-info dd'>Время: 60 мин</div>
         <div className='aspec-info ddd'>Цена: {spec.price} сом</div>
         <div className='aspec-info ddd2'>Приоритет: {spec.priority}</div>
         {isEdit === spec.specialtyId ? (
                  <div>
                    
                    <Input
                      placeholder='Цена'
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-100 m-1"
                    />

                    <Input
                      placeholder='Приоритет'
                      onChange={(e) => setPrio(e.target.value)}
                      className="w-100 m-1"
                    />
                    <button
                      onClick={() => saveData(spec.specialtyId)}
                      className="btn btn-warning btn w-100"
                    >
                      save
                    </button>
                  </div>
                ) : null}
        <button  onClick={() =>
                    EditData(
                      spec.specialtyId,
                      spec.name,
                      spec.price,
                      spec.priority
                    )
                  } className='aspec-btn'>Настроить сервис</button>
        <button onClick={() => deleteSpeci(spec.specialtyId)} className='aspec-btn-del'>Удалить сервис</button>
         </div>
     ))}

      </div>

      <div style={{display: 'none'}} className='aspec-wrap2'>
      <Form className='m-2' onSubmit={(e)=>handleSub(e)}>
    
    <FormGroup>
      <Label for="Product Name">Название Услуги</Label>
      <Input 
      value={name2} 
      onChange={(e)=> setName2(e.target.value)} 
      type="text" name="product" id="Product Name" placeholder="Услуга" />
    </FormGroup>
    <FormGroup>
      <Label for="price">Цена услуги</Label>
      <Input 
      value={price2}
       onChange={(e)=> setPrice2(e.target.value)} 
       type="text" name="price" id="price" placeholder="Цена" />
    </FormGroup>
    <FormGroup>
      <Label for="info">Приоритет услуги</Label>
      <Input 
      value={prio2}
       onChange={(e)=> setPrio2(e.target.value)} 
       type="text" name="info" id="info" placeholder="Приоритет" />
    </FormGroup>
    
    <Button className="mb-5 mt-2 bg-primary"  type="submit">Добавить Услугу</Button>
  </Form>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  
  let {specs} = state.SpecReducer;
  return { specs };
};

export default connect(mapStateToProps, {getSpec, deleteSpec, updateSpec, addNewSpec})(AdminSpec) 

