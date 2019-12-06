import React from 'react';
import $ from 'jquery';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantInfo: {},
      showResults: false,
    };
  }


  componentDidMount() {
    const restaurantId = window.location.pathname;
    $.ajax({
      url: `/api${restaurantId}`,
      method: 'GET',
      success: (response) => {
        this.setState({
          restaurantInfo: response,
        });
      },
    });
  }

  render() {
    const { restaurantInfo } = this.state;
    const {
      name,
      open,
      close,
      min,
      max,
      dates,
    } = restaurantInfo;

    return (
      <div>
        <h2>Make a Reservation</h2>
        <form>
          <div><DateSelection dates={dates} /></div>
          <TimeSelection open={open} close={close} />
          <PeopleSelection min={min} max={max} />
          <p><button type="button">Find a Table</button></p>
        </form>
      </div>
    );
  }
}


export default App;
