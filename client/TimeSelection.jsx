import React from 'react';

class TimeSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span>
        <select name="time" id="TimeSelect">
          <option value="09:00:00">9:00 am</option>
          <option value="10:00:00">10:00 am</option>
          <option value="11:00:00">11:00 am</option>
          <option value="12:00:00">12:00 pm</option>
          <option value="13:00:00">1:00 pm</option>
          <option value="14:00:00">2:00 pm</option>
          <option value="15:00:00">3:00 pm</option>
          <option value="16:00:00">4:00 pm</option>
        </select>
      </span>
    );
  }
}


export default TimeSelection;
