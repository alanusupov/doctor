import React, { useEffect } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import { getReception, updateReception} from '../../redux/actions';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import Axios from 'axios'
import { url } from '../../url/url';
import 'moment/locale/ru'
function AdminCal({getReception, ...props}) {
  const localizer = momentLocalizer(moment)
  
  useEffect(() => {
    Axios.get(url + "/api/Reception/Get").then((res) => {
      const { data } = res;
      console.log(res);
      if (data) getReception(data);
      
    });
  }, [getReception]);
  console.log(props);
  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }
  const events = props.receptions.map(r => (
    {
      id: r.receptionId,
      title: `Врач: ${r.employeeFullName} \n Клиент: ${r.client.name}`,
      start: new Date( new Date(r.dateOfReceipt)+ " GMT") ,
      end: new Date( new Date(r.dateOfReceipt)+ " GMT").addHours(1)
    }
  ))
  const events1 = [
    {
      id: 0,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      allDay: true,
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2018, 0, 30, 7, 0, 0),
      end: new Date(2018, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
  ]
  
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]
  return (
    <div>
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
    </div>
  )
}

const mapStateToProps = (state) => {
  
  let {receptions} = state.ReceptionReducer;
  return { receptions };
};

export default connect(mapStateToProps, {getReception, updateReception})(AdminCal)
