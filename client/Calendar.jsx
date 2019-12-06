import React from 'react';
import moment from 'moment';


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment(),
    };
  }

  firstDayOfMonth() {
    const { dateObject } = this.state;
    const firstDay = moment(dateObject)
      .startOf('month')
      .format('d');
    return firstDay;
  }

  render() {
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i += 1) {
      blanks.push(
        <td>{''}</td>,
      );
    }

    const daysInMonth = [];
    for (let d = 1; d <= this.state.dateObject.daysInMonth(); d += 1) {
      daysInMonth.push(
        <td key={d}>
          {d}
        </td>,
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    const daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    const { dateObject } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th> </th>
            <th colSpan="5">{dateObject.format('MMMM')} {dateObject.format('Y')}</th>
            <th> </th>
          </tr>
          <tr>
            <td>Su</td>
            <td>Mo</td>
            <td>Tu</td>
            <td>We</td>
            <td>Th</td>
            <td>Fr</td>
            <td>Sa</td>
          </tr>
        </thead>
        <tbody>{daysinmonth}</tbody>
      </table>
    );
  }
}

export default Calendar;
