/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import Icons from './Icons.jsx';


const TimeSelection = (props) => {
  const {
    open,
    close,
    modalTime,
    modal,
  } = props;

  const createSelections = () => {
    const children = [];

    let timeValue = open;
    while (timeValue !== close) {
      const hh = Number(timeValue.split(':')[0]);
      const mm = timeValue.split(':')[1];
      let timeDisplay = `${hh}:${mm}`;

      if (timeValue < '12:00:00') children.push(<option value={timeValue} selected={modalTime === timeValue}>{timeDisplay} am</option>);
      else {
        if (timeValue >= '13:00:00') timeDisplay = `${Number(hh) - 12}:${mm}`;
        children.push(
          <option
            key={timeValue}
            value={timeValue}
            selected={modalTime === timeValue}
          >{timeDisplay} pm
          </option>,
        );
      }

      if (mm === '30') timeValue = `${Number(hh) + 1}:00:00`;
      else timeValue = `${String(hh).padStart(2, '0')}:${Number(mm) + 30}:00`;
    }
    return children;
  };

  return (
    <SelectContainer>
      <IconAlignLeft><Icons.ClockIcon /></IconAlignLeft>
      <SelectStyle name="time" id={`TimeSelect${modal ? 'Modal' : ''}`}>
        {createSelections()}
      </SelectStyle>
      <IconAlignRight><Icons.TriangleDown /></IconAlignRight>
    </SelectContainer>
  );
};


export default TimeSelection;


const SelectStyle = styled.select`
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

const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
