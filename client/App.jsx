import React from 'react';
import $ from 'jquery';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';
import ResultsModal from './ResultsModal.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantId: '',
      restaurantInfo: {},
      searchResults: {},
      showResults: false,
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {
    const restaurantId = window.location.pathname;
    $.ajax({
      url: `/api${restaurantId}`,
      method: 'GET',
      success: (response) => {
        this.setState({
          restaurantId,
          restaurantInfo: response,
        });
      },
    });
  }

  closeModal() {
    this.setState({
      showResults: false,
    });
  }

  submitSearch(modal) {
    const { restaurantId } = this.state;
    const date = document.getElementById(`DateSelect${modal ? 'Modal' : ''}`).value;
    const time = document.getElementById(`TimeSelect${modal ? 'Modal' : ''}`).value;
    const people = document.getElementById(`PeopleSelect${modal ? 'Modal' : ''}`).value;

    $.ajax({
      url: `/api${restaurantId}search`,
      method: 'GET',
      data: {
        date,
        time,
        people,
      },
      success: (response) => {
        this.setState({
          searchResults: response,
          showResults: true,
        });
      },
    });
  }


  render() {
    const { restaurantInfo, showResults, searchResults } = this.state;
    const modalDisplay = showResults
      ? (
        <ResultsModal
          restaurantInfo={restaurantInfo}
          results={searchResults}
          submitSearch={this.submitSearch}
          closeModal={this.closeModal}
        />
      )
      : null;

    return (
      <div>
        <h2>Make a Reservation</h2>
        <form>
          <div><DateSelection dates={restaurantInfo.dates} /></div>
          <TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} />
          <PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} />
          <p><button type="button" onClick={() => this.submitSearch(false)}>Find a Table</button></p>
        </form>
        <div>
          {modalDisplay}
        </div>
      </div>
    );
  }
}


export default App;
