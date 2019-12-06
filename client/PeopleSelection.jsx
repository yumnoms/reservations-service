import React from 'react';

const PeopleSelection = (props) => {
  const createSelections = () => {
    const { min, max } = props;
    const children = [];
    for (let i = min; i <= max; i += 1) {
      if (i === 1) children.push(<option value={i}>{i} person</option>);
      else children.push(<option value={i}>{i} people</option>);
    }
    return children;
  };

  return (
    <span>
      <select name="people" id="PeopleSelect">
        {createSelections()}
      </select>
    </span>
  );
};

export default PeopleSelection;
