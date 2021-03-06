/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';
import ResultsModal from './ResultsModal.jsx';


// const ec2 = 'http://52.52.160.137';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantId: '',
      restaurantInfo: {},
      modalTime: null,
      modalPeople: null,
      searchResults: {},
      showResults: false,
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {
    const restaurantId = window.location.pathname;
    $.ajax({
      // url: `${ec2}/api${restaurantId}`,
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
      // url: `${ec2}/api${restaurantId}search`,
      url: `/api${restaurantId}search`,
      method: 'GET',
      data: {
        date,
        time,
        people,
      },
      success: (response) => {
        this.setState({
          modalTime: time,
          modalPeople: people,
          searchResults: response,
          showResults: true,
        });
      },
    });
  }


  render() {
    const {
      restaurantInfo,
      modalTime,
      modalPeople,
      showResults,
      searchResults,
    } = this.state;
    const modalDisplay = showResults
      ? (
        <ResultsModal
          restaurantInfo={restaurantInfo}
          results={searchResults}
          submitSearch={this.submitSearch}
          closeModal={this.closeModal}
          modalTime={modalTime}
          modalPeople={modalPeople}
        />
      )
      : null;

    return (
      <>
        <TopSection>
          <img src="logo.png" alt="YumNoms Logo" width="125px" height="125px" />
          <RestaurantName>{restaurantInfo.name}</RestaurantName>
        </TopSection>
        <BottomSection>
          <AppContainer>
            <BottomPadding><h2>Make a Reservation</h2></BottomPadding>
            <form>
              <BottomPadding><DateSelection dates={restaurantInfo.dates} /></BottomPadding>
              <BottomPadding>
                <TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} />
                <PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} />
              </BottomPadding>
              <div><ButtonStyle type="button" onClick={() => this.submitSearch(false)}>Find a Table</ButtonStyle></div>
            </form>
          </AppContainer>
          <Instsructions>
            <p><i>** You are currently viewing restaurant {window.location.pathname.slice(1, -1)} of 10 **</i></p>
            <p><i>** View others by changing the URL pathname in your address bar **</i></p>
          </Instsructions>
        </BottomSection>
        <div>
          {modalDisplay}
        </div>
      </>
    );
  }
}


export default App;

const AppContainer = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  cursor: default;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  padding: 0px 11px 11px 11px;
  top: -97px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  width: 320px;
`;

const ButtonStyle = styled.button`
  background: slateblue;
  border-radius: 5px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 30px
  text-align: center;
  width: 100%;
  vertical-align: middle;

  &:hover {
    background-color: #8376d5;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const BottomPadding = styled.div`
  display: inline-flex;
  padding-bottom: 6px;
  position: relative;
  width: 100%;
`;

const BottomSection = styled.div`
  position: relative;
`;

const RestaurantName = styled.h1`
  text-align: center;
  margin-top: calc(50vh - 300px);
  color: coral;
  font-size: 2.5em;
  font-family: Lato;
`;

const TopSection = styled.div`
  background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/restaurant_icons.png");
  height: 50vh;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const Instsructions = styled.div`
  text-align: center;
  padding-top: 100px;
`;
