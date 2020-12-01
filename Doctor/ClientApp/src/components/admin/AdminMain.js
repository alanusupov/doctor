import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getReception} from '../../redux/actions';
import Axios from 'axios';
import { url } from '../../url/url';
import Slider from "react-slick";
import moment from 'moment'
import 'slick-carousel/slick/slick.css'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru'
import {VictoryChart, VictoryTheme, VictoryLine} from 'victory';

function AdminMain({getReception, ...props}) {
  const [days,setDays] = useState({
    from: null,
    to: null
  })
  const modifiers = { start: days.from, end: days.to };
  const [locale, setLocale] = useState('ru')
  const [datas,setDatas] = useState({});
  const [rdata,setRdata] = useState('');

 function handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, days);
    setDays(range);
    console.log(range);
    days.to ? handleData() : handleData();
    
  }
 useEffect(() => {
   
    setDays(days)
   console.log(days);
  
    
  }, [days]);
 
  function handleData(){
    if(days.to){
      let obj = {
      "formDate":   moment(new Date(days.from)).format('YYYY-MM-DD'),
      "toDate": moment(new Date(days.to)).format('YYYY-MM-DD')
    }
    console.log(obj);
    Axios.post(url + '/api/Reception/GetStatistics', obj).then((res) => {
      const {data} = res;
      console.log(data);
      setDatas(data)
      console.log(datas);
    })

    setDatas(datas);
    console.log(datas.result);
    let newd = datas.result ? datas.result.map(x => {
     return ({
       x: moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD'),
       y: (datas.result.filter(n => moment(new Date(x.dateOfReceipt)).format('YYYY-MM-DD') === moment(new Date(n.dateOfReceipt)).format('YYYY-MM-DD'))).length
     })
    })
    :null
    console.log(newd);
    setRdata(newd)
    }
    
    //let newData = datas.result
    // .map(x => {
    //   return {
    //     date: x.result.dateOfReceipt, reception: 1
    //   }
    // })
    
  }
  
  useEffect(()=> {
    handleData()
  }, [])
  
  useEffect(() => {
    Axios.get(url + "/api/Reception/Get").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getReception(data);
      console.log(days);
    });
  }, [getReception]);
  console.log(props);
  const [docs,setDocs] = useState('');
  useEffect(() => {
    Axios.get(url + "/api/Employee").then((res) => {
      const { data } = res;
      console.log(res);
      setDocs(data)
      
    });
  }, []);

  const [stats, setStats] = useState('');
  useEffect(() => {
    Axios.get(url + "/api/Statistical").then((res) => {
      const { data } = res;
      console.log(res);
    
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
      <div style={{width: '800px'}}>
        <div className="admin-stat-input">
        <DayPicker
          className="Selectable"
          localeUtils={MomentLocaleUtils} locale={locale}
          numberOfMonths={1}
          selectedDays={[days.from, days]}
          
          modifiers={modifiers}
          onDayClick={handleDayClick}
        />
        <button onClick={handleData}>Получить Статистику</button>
        </div>
        <VictoryChart
  theme={VictoryTheme.material}
>
  <VictoryLine
    style={{
      data: { stroke: "#0185CF" },
      parent: { border: "1px solid #ccc"}
    }}
    data={rdata ? rdata : []}
  />
</VictoryChart>

      </div>
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
