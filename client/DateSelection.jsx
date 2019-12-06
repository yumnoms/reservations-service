import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import Calendar from './Calendar.jsx';


class DateSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(),
    };

    this.changeSelectedDate = this.changeSelectedDate.bind(this);
  }

  changeSelectedDate(newDate) {
    this.setState({
      selectedDate: newDate,
    });
  }

  render() {
    const { dates } = this.props;
    const { selectedDate } = this.state;
    const day = selectedDate.format('ddd');
    const month = selectedDate.format('MMM');
    const date = selectedDate.date();
    const dateDisplay = `${day}, ${month} ${date}`;
    return (
      <div>
        <ShowCalendar
          toggle={(show) => (
            <input
              onClick={() => show()}
              onFocus={() => show()}
              value={dateDisplay}
              readOnly
            />
          )}
          content={(hide) => (
            <div>
              <Calendar
                openDates={dates}
                selectedDate={selectedDate}
                changeSelectedDate={(newDate) => {
                  this.changeSelectedDate(newDate);
                  hide();
                }}
              />
            </div>
          )}
        />
        <input type="hidden" name="date" id="DateSelect" value={selectedDate} readOnly />
      </div>
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
    <div ref={ref}>
      {toggle(show)}
      {isShown && content(hide)}
    </div>
  );
};

export default DateSelection;
