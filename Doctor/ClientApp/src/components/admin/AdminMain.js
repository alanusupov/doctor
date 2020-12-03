import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getReception} from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import Slider from "react-slick";
import moment from 'moment'
import 'slick-carousel/slick/slick.css'
import 'react-day-picker/lib/style.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import 'moment/locale/ru'
import {DateRange} from 'react-date-range'
import {VictoryChart, VictoryTheme, VictoryLine} from 'victory';


function AdminMain({getReception, ...props}) {
  const nameMapper = {
    ru: 'Russian',
   
  }
 

  const [locale, setLocale] = useState('ru')
  const [datas,setDatas] = useState([]);
  const [rdata,setRdata] = useState('');
  const [first,setFirst] = useState('');
  const [second,setSecond] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  console.log(state);
  function setDay(item){
   setState([item.selection])
   console.log(item);
    setFirst(moment(new Date(item.selection.startDate)).format('YYYY-MM-DD'))
    setSecond(moment(new Date(item.selection.endDate)).format('YYYY-MM-DD'))
    console.log(first);
    console.log(second)
  }
  function handleData(){
    //console.log(days);
    //   let obj = {
    //   "formDate": first,
    //   "toDate": second
    // }
    // console.log(obj);

    async function senddate(){
       const res = await Axios.post(url + '/api/Reception/GetStatistics', 
       {
        "formDate": first,
        "toDate": second
      })
      console.log(res.data.result)
      setDatas(res.data.result.map(x => {
        return (
          {
          x: moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD'),
          y: (res.data.result.filter(n => moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD') === moment(new Date(n.dateOfReceipt)).format('YYYY-MM-DD'))).length 
        })
       }))
    }
    senddate()
    console.log(datas)
    // let newd = datas.result ? datas.result.map(x => {
    //  return (
    //    {
    //    x: moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD'),
    //    y: (datas.result.filter(n => moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD') === moment(new Date(n.dateOfReceipt)).format('YYYY-MM-DD'))).length 
    //  })
    // })
    // :null
    //console.log(newd);
    //setRdata(newd)
    
  
    //let newData = datas.result
    // .map(x => {
    //   return {
    //     date: x.result.dateOfReceipt, reception: 1
    //   }
    // })
    
  }
  const showArr = useEffect(() => {
   
    setDatas(datas)
   console.log(datas);
  
  
  }, [datas]);
  
  
  useEffect(() => {
    Axios.get(url + "/api/Reception/Get").then((res) => {
      const { data } = res;
     
      if (data) getReception(data);
      //console.log(days);
    });
  }, [getReception]);
 
  const [docs,setDocs] = useState('');
  useEffect(() => {
    Axios.get(url + "/api/Employee").then((res) => {
      const { data } = res;
     
      setDocs(data)
      
    });
  }, []);

  const [stats, setStats] = useState('');
  useEffect(() => {
    Axios.get(url + "/api/Statistical").then((res) => {
      const { data } = res;
    
      let i;
      let ndata = [];
      for(i = 0; i < 4; i++){
           
       
       ndata.push(data[i])
      }
      setStats(ndata)
      
    });
  }, []);
console.log(stats);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  function setDate(x){
  return  moment(new Date(new Date(x) + " GMT")).format('YYYY-MM-DD h:mm')
  }
  let dates = '';
  let imgu = '';
  function getImg(id){
   
     let doc = docs.filter(d => d.employeeId == id)
     
       let img = doc[0].imgUrl;
      
       return url + img
  }
  console.log(dates);
  
  return (
    <div>
      <div className='atop-wrap'>
       
        <div className="admin-stat-input">
        <DateRange
         
           editableDateInputs={true}
           onChange={item => setDay(item)}
           moveRangeOnFirstSelection={false}
           ranges={state} />
        <button style={{color: 'white'}} className="btn bg-primary" onClick={handleData}>Получить Статистику</button>
        </div>

        <VictoryChart
        minDomain={{ y:0}}
        theme={VictoryTheme.material}>
        <VictoryLine
          
          style={{
            data: { stroke: "#0185CF" },
            parent: { border: "1px solid #ccc"}
          }}
          data={datas ? datas : []}
        />
      </VictoryChart>
<div>

      <div className='doc-stats'>
        <h3 style={{color: "#333333", fontSize: '16px', margin: '6px 15px'}}>Лучшие врачи</h3>
        <div className='stat-wrap'>
          {stats ? stats.map(d => (
            <div className="stat-block">
              <div>
               <img className="stat-img" src={getImg(d.employeeId)} />
              </div>
              <div>
                {d.reservation} <span> Броней</span>
              </div>
              <div>
                {d.hours}<span> Часов</span>
              </div>
              <div>
               <p>{d.income} <span className="stat-span"> сом</span></p>  <span className="stat-span1"> Доход</span>
              </div>
            </div>
          )): "loading..."}
        </div>
</div>
      </div>
      </div>



      <div>
        <h2 className="amain-title"> ВСТРЕЧИ </h2>
        <Slider {...settings}>
          
            {props.receptions.map(r => (
              <div className="slide-rec">
                Врач: <br />
               <span className="slide-name">{r.employeeFullName}</span> <br />
               Клиент: <br />
               <span className="slide-name">{r.client.name}</span> <br />
               Дата: <br />
               <span className="slide-name">{setDate(r.dateOfReceipt)}</span>
              </div>
            ))}
            
          
        </Slider>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  
  let {receptions} = state.ReceptionReducer;
  return { receptions };
};

export default connect(mapStateToProps, {getReception})(AdminMain)
