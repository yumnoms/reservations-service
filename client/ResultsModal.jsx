import React from 'react';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';
import ResultsList from './ResultsList.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Restauant Name</p>
        <form>
          <DateSelection />
          <TimeSelection />
          <PeopleSelection />
          <button type="submit">Find a Table</button>
          <ResultsList />
        </form>
      </div>
    );
  }
}


export default Results;
