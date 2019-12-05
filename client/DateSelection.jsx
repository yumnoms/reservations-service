import React from 'react';
import Calendar from './Calendar.jsx';


class DateSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <select name="date" id="DateSelect">
        <option value="2019-12-02">Mon, Dec 2</option>
        <option value="2019-12-03">Tue, Dec 3</option>
        <option value="2019-12-04">Wed, Dec 4</option>
        <option value="2019-12-05">Thu, Dec 5</option>
        <option value="2019-12-06">Fri, Dec 6</option>
        <option value="2019-12-07">Sat, Dec 7</option>
        <option value="2019-12-08">Sun, Dec 8</option>
      </select>
    );
  }
}


export default DateSelection;
