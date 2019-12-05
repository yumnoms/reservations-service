import React from 'react';

class PeopleSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span>
        <select name="people" id="PeopleSelect">
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5 people</option>
          <option value="6">6 people</option>
        </select>
      </span>
    );
  }
}


export default PeopleSelection;
