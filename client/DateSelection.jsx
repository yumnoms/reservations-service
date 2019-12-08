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
      <>
        <ShowCalendar
          toggle={(show) => (
            <>
              <IconAlignLeft><Icons.CalIcon /></IconAlignLeft>
              <InputStyle
                onClick={() => show()}
                onFocus={() => show()}
                value={dateDisplay}
                readOnly
              />
              <IconAlignRight><Icons.TriangleDown /></IconAlignRight>
            </>
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
      </>
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
    <SelectContainer ref={ref}>
      {toggle(show)}
      {isShown && content(hide)}
    </SelectContainer>
  );
};

export default DateSelection;


const InputStyle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-color: transparent;
  border: 1px solid #999;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  padding: 5px 30px;
  width: 100%;
  z-index: 1;
`;

const IconAlignLeft = styled.div`
  display: inline-block;
  padding: 5px;
  position: absolute;
`;

const IconAlignRight = styled.div`
  display: inline-block;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 1px;
`;

const CalendarPopover = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 10px;
  position: absolute;
  width: 310px;
  left: -5px;
  top: 27px;
  z-index: 100;
`;

const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
