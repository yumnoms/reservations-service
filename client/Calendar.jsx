import React from 'react';
import moment from 'moment';


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment(),
    };

    this.onDayClick = this.onDayClick.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentDidMount() {
    const { selectedDate } = this.props;
    this.setState({
      selectedMonth: selectedDate,
    });
  }

  onDayClick(dateValue) {
    const { changeSelectedDate } = this.props;
    changeSelectedDate(moment(dateValue));
    this.setState({
      selectedMonth: moment(dateValue),
    });
  }

  onPreviousClick() {
    const { selectedMonth } = this.state;
    this.setState({
      selectedMonth: moment(selectedMonth).month(selectedMonth.month() - 1),
    });
  }

  onNextClick() {
    const { selectedMonth } = this.state;
    this.setState({
      selectedMonth: moment(selectedMonth).month(selectedMonth.month() + 1),
    });
  }


  firstDayOfMonth() {
    const { selectedMonth } = this.state;
    const firstDay = moment(selectedMonth)
      .startOf('month')
      .format('d');
    return firstDay;
  }

  daysInPreviousMonth() {
    const { selectedMonth } = this.state;
    const previousMonth = selectedMonth.month() - 1;
    const daysInPreviousMonth = moment().month(previousMonth).daysInMonth();
    return daysInPreviousMonth;
  }


  currentMonthCalendar() {
    const { selectedMonth } = this.state;
    const firstDayOfMonth = this.firstDayOfMonth();
    const previousMonth = selectedMonth.month() - 1;
    const nextMonth = selectedMonth.month() + 1;

    const previousMonthDays = [];
    for (let i = 0; i < firstDayOfMonth; i += 1) {
      const daysUntil = firstDayOfMonth - i;
      const year = moment().month(previousMonth).year();
      const month = moment().month(previousMonth).month() + 1;
      const day = this.daysInPreviousMonth() - daysUntil + 1;
      const dateValue = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      previousMonthDays.push(
        <td key={dateValue}>
          <span onClick={() => { this.onDayClick(dateValue); }}>
            {day}
          </span>
        </td>,
      );
    }

    const currentMonthDays = [];
    for (let day = 1; day <= selectedMonth.daysInMonth(); day += 1) {
      const year = selectedMonth.year();
      const month = selectedMonth.month() + 1;
      const dateValue = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      currentMonthDays.push(
        <td key={dateValue}>
          <span onClick={() => { this.onDayClick(dateValue); }}>
            {day}
          </span>
        </td>,
      );
    }

    const totalSlots = [...previousMonthDays, ...currentMonthDays];

    const nextMonthDays = [];
    for (let day = 1; (totalSlots.length + nextMonthDays.length) % 7 !== 0; day += 1) {
      const year = moment().month(nextMonth).year();
      const month = moment().month(nextMonth).month() + 1;
      const dateValue = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      nextMonthDays.push(
        <td key={dateValue}>
          <span onClick={() => { this.onDayClick(dateValue); }}>
            {day}
          </span>
        </td>,
      );
    }

    totalSlots.push(...nextMonthDays);

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

    const calendar = rows.map((week, i) => <tr key={`week ${i}`}>{week}</tr>);

    return calendar;
  }

  render() {
    const { selectedMonth } = this.state;
    return (
      <table>
        <thead>
          <tr key="Month & Year">
            <th>
              <span onClick={() => { this.onPreviousClick(); }}>
                P
              </span>
            </th>
            <th colSpan="5">
              {`${selectedMonth.format('MMMM')} ${selectedMonth.format('Y')}`}
            </th>
            <th>
              <span onClick={() => { this.onNextClick(); }}>
                N
              </span>
            </th>
          </tr>
          <tr key="Days">
            <td key="Sunday">Su</td>
            <td key="Monday">Mo</td>
            <td key="Tuesday">Tu</td>
            <td key="Wednesday">We</td>
            <td key="Thursday">Th</td>
            <td key="Friday">Fr</td>
            <td key="Saturday">Sa</td>
          </tr>
        </thead>
        <tbody>{this.currentMonthCalendar()}</tbody>
      </table>
    );
  }
}

export default Calendar;
