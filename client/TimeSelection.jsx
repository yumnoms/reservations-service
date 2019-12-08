import React from 'react';
import styled from 'styled-components';
import Icons from './Icons.jsx'


class TimeSelection extends React.Component {
  createSelections() {
    const { open, close } = this.props;
    const children = [];

    let timeValue = open;
    while (timeValue !== close) {
      const hh = timeValue.split(':')[0];
      const mm = timeValue.split(':')[1];
      let timeDisplay = `${hh}:${mm}`;

      if (timeValue < '12:00:00') children.push(<option value={timeValue}>{timeDisplay} am</option>);
      else {
        if (timeValue >= '13:00:00') timeDisplay = `${Number(hh) - 12}:${mm}`;
        children.push(<option key={timeValue} value={timeValue}>{timeDisplay} pm</option>);
      }

      if (mm === '30') timeValue = `${Number(hh) + 1}:00:00`;
      else timeValue = `${hh}:${Number(mm) + 30}:00`;
    }
    return children;
  }

  render() {
    const { modal } = this.props;
    return (
      <span>
        <IconAlign><Icons.ClockIcon /></IconAlign>
          <SelectStyle name="time" id={`TimeSelect${modal ? 'Modal' : ''}`}>
            {this.createSelections()}
          </SelectStyle>
        <IconAlign><Icons.TriangleDown /></IconAlign>
      </span>
    );
  }
}


export default TimeSelection;


const SelectStyle = styled.select`
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
  padding: 5px 53px 5px 10px;
`;

const IconAlign = styled.span`
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
`;
