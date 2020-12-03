import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import '../../css/adminrec.css'
import { getReception, updateReception} from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import { connect } from 'react-redux';
import moment from 'moment'
  function AdminRec({getReception, ...props}) {
    const { useState } = React;

    useEffect(() => {
      Axios.get(url + "/api/Reception/Get").then((res) => {
        const { data } = res;
        console.log(res);
        if (data) getReception(data);
        
      });
    }, [getReception]);
  console.log(props);
 let receptions = props.receptions.map(r => {
    return ({
      id: r.receptionId,
      spec: r.specialtyName,
      date: moment(new Date(new Date(r.dateOfReceipt) + " GMT")).format('YYYY-MM-DD'),
      time: moment(new Date(new Date(r.dateOfReceipt) + " GMT")).format('h:mm'),
      doctor: r.employeeFullName,
      client: r.client.name,
      status: r.status
    })
  })
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  function getTime(x){
    let d = new Date(x);
    let h = addZero(d.getHours());
    let t = h + ":" + "00";
    return t;
  }
    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'УСЛУГА', field: 'spec', editable: 'never' },
      { title: 'ДАТА', field: 'date', editable: 'onUpdate' },
      { title: 'ВРЕМЯ', field: 'time', editable: 'onUpdate' },
      { title: 'ВРАЧ', field: 'doctor', editable: 'never' },
      { title: 'КЛИЕНТ', field: 'client', editable: 'never' },
      {
        title: 'СТАТУС',
        field: 'status',
        lookup: { 'Одобрено': 'Одобрено', 'Отменено': 'Отменено', 'В Ожидании':  'В Ожидании' },
      },
    ]);
    const [data,setData] = useState([]);
    console.log(receptions);
   

    
    // const [data, setData] = useState([
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   { name: 'ZeasdfdfdddBetül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   { name: 'Zedda ddddBetül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    // ]);
  const [dataU,setDataU] = useState('')

    function handleUpdate(newdata, cdata){
  let newdate = new Date(newdata.date) 
      console.log(newdate);
     
      let newD = new Date(newdate.toDateString().toString() + ' ' + newdata.time + ':00 GMT' ) ;
      console.log(newD.toJSON());
    
      const data1 = {
        "receptionId": newdata.id,
        "dateOfReceipt": newD.toJSON(),
        "status": newdata.status
        

      };
     
  
      async function saveData() {
        const res = await Axios.put(url + `/api/Reception/Put`, data1);
        props.updateReception(res.data);
        console.log(res.data);
        
      }
      saveData();

      // setTimeout(() => {
      //   window.location.reload(false)
      // }, 700);
    }

    return (
      <div className='adminrec'>

        <MaterialTable
          title="Все приемы"
          columns={columns}
          data={receptions}
          editable={{
            
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  console.log(newData);
                  setDataU(newData)
                  
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  
                 // setData([...dataUpdate]);

                  resolve(
                   
                    handleUpdate(newData));
                }, 5000)
              })
            
          }}
        />
      </div>
    )
  }

  const mapStateToProps = (state) => {
  
    let {receptions} = state.ReceptionReducer;
    return { receptions };
  };
  
  export default connect(mapStateToProps, {getReception, updateReception})(AdminRec) 
