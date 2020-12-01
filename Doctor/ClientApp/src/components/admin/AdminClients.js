import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getClient, updateClient} from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import MaterialTable from 'material-table'
function AdminClients({getClient, ...props}) {

  
  useEffect(() => {
    Axios.get(url + "/api/Client").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getClient(data);
      
    });
  }, [getClient]);
console.log(props);

const [data,setData] = useState([]);

let clients = props.clients.map(r => {
  return ({
    id: r.clientId,
    client: r.name,
    number: r.phone,
    email: r.email

  })
})

const [columns, setColumns] = useState([
  { title: 'ID', field: 'id', editable: 'never' },
  { title: 'КЛИЕНТ', field: 'client', editable: 'onUpdate' },
  { title: 'НОМЕР ТЕЛЕФОНА', field: 'number', editable: 'onUpdate' },
  { title: 'EMAIL', field: 'email', editable: 'onUpdate' },
  
]);


function handleUpdate(newdata, cdata){
  let newdate = new Date(newdata.date) 
      console.log(newdate);
     
      let newD = new Date(newdate.toDateString().toString() + ' ' + newdata.time + ':00' ) ;
      console.log(newD.toISOString());
      //console.log(newdate);
      const data1 = {
        "clientId": newdata.id,
        "name": newdata.client,
        "phone": newdata.number,
        "email": newdata.email
        

      };
     
  
      async function saveData() {
        const res = await Axios.put(url + `/api/Client`, data1);
        props.updateClient(res.data);
        console.log(res.data);
        
      }
      saveData();
      // setTimeout(() => {
      //   window.location.reload(false)
      // }, 700);
    }
  return (
    <MaterialTable
      title="Список клиентов"
      columns={columns}
      data={clients}
      editable={{
        
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              console.log(newData);
                     
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              
              setData([...dataUpdate]);

         
              resolve(
               
                handleUpdate(newData));
            }, 1000)
          })
        
      }}
    />
  )
}
const mapStateToProps = (state) => {
  
  let {clients} = state.ClientReducer;
  return { clients };
};

export default connect(mapStateToProps, {getClient, updateClient})(AdminClients) 

