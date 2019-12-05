import React from 'react';

class PeopleSelection extends React.Component {
  createSelections() {
    const { min, max } = this.props;
    const children = [];
    for (let i = min; i <= max; i += 1) {
      if (i === 1) children.push(<option value={i}>{i} person</option>);
      else children.push(<option value={i}>{i} people</option>);
    }
    return children;
  }

  render() {
    return (
      <span>
        <select name="people" id="PeopleSelect">
          {this.createSelections()}
        </select>
      </span>
    );
  }
}


export default PeopleSelection;
