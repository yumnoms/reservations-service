/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import Icons from './Icons.jsx';


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
    <SelectContainer>
      <IconAlignLeft><Icons.PeopleIcon /></IconAlignLeft>
      <SelectStyle name="people" id={`PeopleSelect${modal ? 'Modal' : ''}`}>
        {createSelections()}
      </SelectStyle>
      <IconAlignRight><Icons.TriangleDown /></IconAlignRight>
    </SelectContainer>
  );
};

export default PeopleSelection;


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
  margin-left 6px;
  position: relative;
  width: 100%;
`;
