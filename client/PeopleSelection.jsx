import React from 'react';
import styled from 'styled-components';
import Icons from './Icons.jsx'


const PeopleSelection = (props) => {
  const { min, max, modal } = props;

  const createSelections = () => {
    const children = [];
    for (let i = min; i <= max; i += 1) {
      if (i === 1) children.push(<option value={i}>{i} person</option>);
      else children.push(<option key={i} value={i}>{i} people</option>);
    }
    return children;
  };

  return (
    <span>
      <IconAlign><Icons.PeopleIcon /></IconAlign>
      <span><SelectStyle name="people" id={`PeopleSelect${modal ? 'Modal' : ''}`}>
      {createSelections()}
      </SelectStyle></span>
      <IconAlign><Icons.TriangleDown /></IconAlign>
    </span>
  );
};

export default PeopleSelection;


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
  padding: 5px 52px 5px 10px;
`;

const IconAlign = styled.span`
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
`;
