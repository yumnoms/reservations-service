import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
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
      <AppContainer>
        <h2>Make a Reservation</h2>
        <form>
          <div><BottomPadding><DateSelection dates={restaurantInfo.dates} /></BottomPadding></div>
          <BottomPadding><TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} /></BottomPadding>
          <BottomPadding><PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} /></BottomPadding>
          <div><ButtonStyle type="button" onClick={() => this.submitSearch(false)}>Find a Table</ButtonStyle></div>
        </form>
        <div>
          {modalDisplay}
        </div>
      </AppContainer>
    );
  }
}


export default App;

const AppContainer = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  padding: 0px 11px 11px 11px;
  width: 340px;
`;

const ButtonStyle = styled.button`
  background: #d32323;
  border: 1px solid #d32323;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 30px
  text-align: center;
  width: 100%;
  vertical-align: middle;
`;

const BottomPadding = styled.span`
  display: inline-block;
  padding-bottom: 6px;
`;
