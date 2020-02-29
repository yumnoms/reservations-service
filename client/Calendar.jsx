import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Icons from './Icons.jsx';


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

  calendarDaysOpen(monthArray, day, dateValue) {
    const { openDates, selectedDate } = this.props;
    const match = selectedDate.format('YYYY-MM-DD') === dateValue;

    if (!openDates.includes(dateValue) || dateValue < moment().format('YYYY-MM-DD')) {
      monthArray.push(
        <NotSelectable key={dateValue}>
          {day}
        </NotSelectable>,
      );
    } else if (match) {
      monthArray.push(
        <SelectedDay key={dateValue} onClick={() => { this.onDayClick(dateValue); }}>
          {day}
        </SelectedDay>,
      );
    } else {
      monthArray.push(
        <Selectable key={dateValue} onClick={() => { this.onDayClick(dateValue); }}>
          {day}
        </Selectable>,
      );
    }
  }

  daysFromCurrentMonth() {
    const { selectedMonth } = this.state;

    const currentMonthDays = [];
    for (let day = 1; day <= selectedMonth.daysInMonth(); day += 1) {
      const dateValue = `${selectedMonth.format('YYYY-MM')}-${String(day).padStart(2, '0')}`;
      this.calendarDaysOpen(currentMonthDays, day, dateValue);
    }

    return currentMonthDays;
  }

  daysFromPreviousMonth() {
    const { selectedMonth } = this.state;
    const firstDayOfMonth = this.firstDayOfMonth();
    const previousMonth = selectedMonth.clone().add(-1, 'M');

    const previousMonthDays = [];
    for (let i = 0; i < firstDayOfMonth; i += 1) {
      const daysUntil = firstDayOfMonth - i;
      const day = previousMonth.daysInMonth() - daysUntil + 1;
      const dateValue = `${previousMonth.format('YYYY-MM')}-${String(day).padStart(2, '0')}`;
      this.calendarDaysOpen(previousMonthDays, day, dateValue);
    }

    return previousMonthDays;
  }

  currentMonthCalendar() {
    const { selectedMonth } = this.state;

    const totalSlots = [...this.daysFromPreviousMonth(), ...this.daysFromCurrentMonth()];

    const nextMonth = selectedMonth.clone().add(1, 'M');
    const nextMonthDays = [];
    for (let day = 1; (totalSlots.length + nextMonthDays.length) % 7 !== 0; day += 1) {
      const dateValue = `${nextMonth.format('YYYY-MM')}-${String(day).padStart(2, '0')}`;
      this.calendarDaysOpen(nextMonthDays, day, dateValue);
    }

    totalSlots.push(...nextMonthDays);

    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) cells.push(row);
      else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) rows.push(cells);
    });

    const calendar = rows.map((week, i) => <RowStyle key={`week ${i}`}>{week}</RowStyle>);

    return calendar;
  }

  render() {
    const { selectedMonth } = this.state;
    return (
      <TableStyle cellspacing="0">
        <thead>
          <tr key="Month & Year">
            <th>
              <PrevNextButton onClick={() => { this.onPreviousClick(); }}>
                <Icons.LeftIcon />
              </PrevNextButton>
            </th>
            <TitleStyle colSpan="5">
              {`${selectedMonth.format('MMMM')} ${selectedMonth.format('Y')}`}
            </TitleStyle>
            <th>
              <PrevNextButton onClick={() => { this.onNextClick(); }}>
                <Icons.RightIcon />
              </PrevNextButton>
            </th>
          </tr>
          <DaysStyle key="Days">
            <td key="Sunday">Su</td>
            <td key="Monday">Mo</td>
            <td key="Tuesday">Tu</td>
            <td key="Wednesday">We</td>
            <td key="Thursday">Th</td>
            <td key="Friday">Fr</td>
            <td key="Saturday">Sa</td>
          </DaysStyle>
        </thead>
        <tbody>{this.currentMonthCalendar()}</tbody>
      </TableStyle>
    );
  }
}

export default Calendar;

const DaysStyle = styled.tr`
  color: slateblue;
  font-size: 8pt;
  font-weight: 900;
  text-align: center;
  & > td {
    padding-bottom: 5px;
  }
`;

const TableStyle = styled.table`
  border-collapse: collapse;
`;

const NotSelectable = styled.td`
  color: #dce0e0;
`;

const Selectable = styled.td`
  cursor: pointer;
  &:hover {
    background-color: AliceBlue;
  }
`;

const SelectedDay = styled.td`
  background-color: slateblue;
  cursor: pointer;
  color: #fff;
`;

const RowStyle = styled.tr`
  & > td {
    border: 1px solid #ccc;
    font-size: 10pt;
    font-weight: 400;
    line-height: 25px;
    padding: 5px;
    text-align: center;
    width: 37px;
  }
`;

const TitleStyle = styled.th`
  font-size: 11pt;
  padding: 20px;
`;

const PrevNextButton = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  height: 24px;
  width: 24px;
`;
