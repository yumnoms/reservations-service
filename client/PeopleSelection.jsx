import React from 'react';

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
      <select name="people" id={`PeopleSelect${modal ? 'Modal' : ''}`}>
        {createSelections()}
      </select>
    </span>
  );
};

export default PeopleSelection;
