import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';


class DateSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { dates } = this.props;
    return (
      <div>
        <ShowCalendar
          toggle={(show) => (
            <select onClick={show} name="date" id="DateSelect">
              <option value="2019-12-02">Mon, Dec 2</option>
            </select>
          )}
          content={(hide) => (
            ReactDOM.createPortal(
              <div>
                <Calendar dates={dates} />
                <button type="button" onClick={hide}>Close</button>
              </div>,
              document.getElementById('calendarPortal'),
            )
          )}
        />
        <div id="calendarPortal" />
      </div>
    );
  }
}

const ShowCalendar = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

export default DateSelection;
