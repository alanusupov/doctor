import React, { useEffect, useState } from 'react'
import { getDoctor } from '../redux/actions';
import Axios from "axios";
import { url } from '../url/url';
import { connect } from "react-redux";
import '../../node_modules/react-rater/lib/react-rater.css'
import '../css/docs.css'
import Rater from 'react-rater'
import { useHistory } from "react-router-dom";

function Doctors({getDoctor, ...props}) {

  useEffect(() => {
    Axios.get(url + "/api/Employee").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getDoctor(data);
      console.log(data);
      
    });
  }, [getDoctor]);

  const history = useHistory();
  function handleClick(id, e) {
    e.stopPropagation();
    console.log("clicked");
    history.replace("/doctors/" + id);
  }
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const filteredProducts = props.doctors.filter((product) => {
    return String(product.fullName).toLowerCase().match(input);
  });
  const handleInputChange = (e) => {
    e.preventDefault(
        setInput(e.target.value)
    )
};
  return (
    <div style={{padding: '10px'}}>
      <input
        onChange={handleInputChange}
        value={input}
        className="form-control input"
        style={{maxWidth: '600px', margin: '0 auto', background: '#D6F0FF'}}
        type="text"
        placeholder="Найти Врача"
        
      />
      <ul className="searchList">
        {filteredProducts.map((item, id) => {
          return input !== "" ? (
            <li key={id} onClick={(e) => handleClick(item.employeeId, e)}>
              {item.fullName}
              <img
                className="searchListImage"
                src={url + item.imgUrl}
                alt={'img'}
              />
              {item.productN}
            </li>
          ) : null;
        })}
      </ul>
      <div className='docs'>
      {props.doctors ? props.doctors.map(doc => (
        <div id={doc.employeeId} onClick={(e) => handleClick(doc.employeeId, e)} className="doctor">
            <div className="doc-img-wrap">
              <img className='doc-img' src={url + doc.imgUrl} />
            </div>
            <Rater total={5} rating={doc.rating}></Rater>
      <div className='doc-name'>{doc.fullName}</div>
      <div>{doc.employeeSpecialties.map(spec => (
        <div className="doc-spec">{spec.name} </div>
      ))}</div>
        </div>
     
      )) : null}

      </div>
     
    </div>
  )
}

const mapStateToProps = (state) => {
  let { doctors } = state.DoctorReducer;
  return { doctors };
};

export default  connect(mapStateToProps, {getDoctor})(Doctors)
