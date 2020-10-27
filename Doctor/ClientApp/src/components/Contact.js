import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {getContact, deleteContact, addNewContact,updateContact} from '../redux/actions'
import {useCustomFetch} from '../helpers/customFetch'
import {url} from '../helpers/url'
import Axios from 'axios';

function Contact(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isEdit, setIsEdit] = useState();
  const {data} = useCustomFetch({
    url: url + '/contacts'
  })
  useEffect(()=>{ 
    if(data)props.getContact(data)
    console.log('getcontact');
  },[data])

  function delData(id){
    async function delContact(id){
      const res = await Axios.delete(url+`/contacts/${id}`)
      console.log(res);
      props.deleteContact(id)
    }
    delContact(id);
  }
  function EditData(id,name,address){
    setName(name)
    setAddress(address)
    if(isEdit !== id){
      setIsEdit(id)
    }else{
      setIsEdit('')
    }
    
  }
  function saveData(id){
    const data = {
      id,
      name,
      address
    }
    setIsEdit('')
    
  
    async function saveContact(id){
      const res = await Axios.patch(url+`/contacts/${id}`, data)
      props.updateContact(data)
      console.log(res.data);
  
    }
    saveContact(id)
  }
  return (
    
    <div className='list-group'>
      {props.contacts ? props.contacts.map(contact => (
      <li className="list-group-item d-flex justify-content-between" key={contact.id}>
        {isEdit === contact.id ? 
         <div> 
           <input value={name} onChange={(e)=> setName(e.target.value)} className="w-50"  />
           <input value={address} onChange={(e)=> setAddress(e.target.value)} className="w-50"  />
           <button onClick={()=> saveData(contact.id)} className="btn btn-warning btn mr-3">save</button>
         </div>
         :<div><p>{contact.name} </p> <p>{contact.address}</p></div> }
       

        <div>
        <button className="btn btn-warning btn mr-3"
             onClick={()=> EditData(contact.id, contact.name, contact.address)}>EDIT</button>
          <button onClick={()=>delData(contact.id)} className='btn btn-danger'>DELETE</button>
        </div>
      </li>

      )) : <p>Contact List is empty</p>}
      
    </div>
  )
}
const mapStateToProps = (state)=>{
  let {contacts} = state.ContactReducer;
  return {contacts}
}

export default connect(mapStateToProps, {getContact, addNewContact, deleteContact, updateContact})(Contact)
