/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';
import Icons from './Icons.jsx';


class DateSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(),
    };

    this.changeSelectedDate = this.changeSelectedDate.bind(this);
  }

  componentDidMount() {
    const { selectedDate } = this.props;

    this.setState({
      selectedDate: moment(selectedDate) || moment(),
    });
  }

  changeSelectedDate(newDate) {
    this.setState({
      selectedDate: newDate,
    });
  }

  render() {
    const { dates, modal } = this.props;
    const { selectedDate } = this.state;
    const dateDisplay = moment(selectedDate).format('ddd, MMM D');

    return (
      <span>
        <ShowCalendar
          toggle={(show) => (
            <span>
              <span>
                <IconAlign><Icons.CalIcon /></IconAlign>
                <InputStyle
                  onClick={() => show()}
                  onFocus={() => show()}
                  value={dateDisplay}
                  readOnly
                />
                <IconAlign><Icons.TriangleDown /></IconAlign>
              </span>
            </span>
          )}
          content={(hide) => (
            <CalendarPopover>
              <Calendar
                openDates={dates}
                selectedDate={selectedDate}
                changeSelectedDate={(newDate) => {
                  this.changeSelectedDate(newDate);
                  hide();
                }}
              />
            </CalendarPopover>
          )}
        />
        <input type="hidden" name="date" id={`DateSelect${modal ? 'Modal' : ''}`} value={moment(selectedDate).format('YYYY-MM-DD')} readOnly />
      </span>
    );
  }
}

const ShowCalendar = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  const ref = useRef(null);

  const focusOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      hide();
    }
  };

  useEffect(() => {
    document.addEventListener('focusin', focusOutside);
    document.addEventListener('click', focusOutside);
    return () => {
      document.removeEventListener('focusin', focusOutside);
      document.removeEventListener('click', focusOutside);
    };
  }, []);


  return (
    <span ref={ref}>
      {toggle(show)}
      {isShown && content(hide)}
    </span>
  );
};

export default DateSelection;


const InputStyle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #fff;
  border: 1px solid #999;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  padding: 5px 55px 5px 11px;
  width: 296px;
`;

const IconAlign = styled.span`
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
`;

const CalendarPopover = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 10px;
  position: absolute;
  width: 310px;
`;
