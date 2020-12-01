import React, { useEffect } from 'react'
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
  return (
    <div>
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
