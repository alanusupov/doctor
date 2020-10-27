import React, { useState } from 'react'
import Axios from 'axios';
import { url } from '../helpers/url';
import {connect} from 'react-redux'
import {addNewContact} from '../redux/actions'
function Form(props) {
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');

  function addContact(e){
    
    e.preventDefault();
    const data ={
      id: Date.now(),
      name,
      address
    }
    if(name !== '' && address !== ''){
      async function addData(){
        const res = await Axios.post(url + '/contacts', data)
        console.log(res);
        props.addNewContact(data)
        setAddress('');
        setName('')
      }addData();
    }
  }

  return (
    <form onSubmit={(e)=> addContact(e)}>
      <div className='form-group d-flex '>
        <input
        required
        className='form-control'
        type='text'
        placeholder='Enter Name'
        value={name}
        onChange={(e)=> setName(e.target.value)}
        
        />
        <input
        required
        className='form-control'
        type='text'
        placeholder='Enter Address'
        value={address}
        onChange={(e)=> setAddress(e.target.value)}
        />
      </div>
      <button className='btn-primary btn w-100' type='submit'>Add Contact</button>
      
    </form>
   
  )
}

export default connect(null, {addNewContact})(Form)
