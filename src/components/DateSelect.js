
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import "moment/locale/ko";
import React, { useState } from 'react';

moment.locale("ko");
export default props => {
  const [selectedDate, setSeletDate] = useState(new Date());

  const handleDateChange = event => {
    // 2020-02-28T06:18:25
    setSeletDate(event);
    const formatedDate = event.format('YYYY-MM-DD');
    props.onChange({target: {value: formatedDate}})
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        label={props.label}
        inputVariant="outlined"
        format="YYYY/MM/DD"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />
    </MuiPickersUtilsProvider>
  )
}