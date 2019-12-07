import React from 'react';
import moment from 'moment';
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
    const { restaurantInfo, results, submitSearch, closeModal } = this.props;
    const selectedDate = document.getElementById('DateSelect').value;

    const dateObject = moment(selectedDate);
    const day = dateObject.format('ddd');
    const month = dateObject.format('MMM');
    const date = dateObject.date();
    const dateDisplay = `${day}, ${month} ${date}`;

    return (
      <div>
        <h2>{restaurantInfo.name}</h2>
        <form>
          <DateSelection dates={restaurantInfo.dates} selectedDate={selectedDate} modal="true" />
          <TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} modal="true" />
          <PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} modal="true" />
          <button type="button" onClick={() => submitSearch(true)}>Find a Table</button>
        </form>
        <div>
          <span><h3>{dateDisplay}</h3></span>
          <span><ResultsList results={results} closeModal={closeModal} /></span>
        </div>
      </div>
    );
  }
}


export default Results;
