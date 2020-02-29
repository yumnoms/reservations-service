/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import styled from 'styled-components';

// const ec2 = 'http://52.52.160.137';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: '',
      showResults: true,
    };

    this.makeReservation = this.makeReservation.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        showResults: true,
      });
    }
  }

  sortResults() {
    const { results } = this.props;

    const times = [];
    const resultsObjects = {};

    results.forEach((result) => {
      if (Object.hasOwnProperty.call(resultsObjects, result.time)) {
        if (result.isOpen) resultsObjects[result.time].unshift(result);
        else resultsObjects[result.time].push(result);
      } else {
        resultsObjects[result.time] = [result];
        times.push(result.time);
      }
    });

    const sortedResults = [];
    times.sort().forEach((time) => {
      sortedResults.push(resultsObjects[time]);
    });
    return sortedResults;
  }

  makeReservation(tableId) {
    const restaurantId = window.location.pathname;
    $.ajax({
      // url: `${ec2}/api${restaurantId}reservation`,
      url: `/api${restaurantId}reservation`,
      method: 'POST',
      data: {
        table: tableId,
      },
      success: (response) => {
        this.setState({
          table: response,
          showResults: false,
        });
      },
    });
  }

  render() {
    const { table, showResults } = this.state;
    if (!showResults && table) return (<div>Reservation Successful!</div>);
    return (
      <>
        {this.sortResults().map((timeGroup) => {
          const tableTime = moment(timeGroup[0].time, 'H:mm:ss').format('h:mm a');
          if (timeGroup[0].isOpen && tableTime > moment().format('h:mm a')) {
            return (
              <OpenStyle
                key={timeGroup[0].id}
                onClick={() => {
                  this.makeReservation(timeGroup[0].id);
                }}
              >
                {tableTime}
              </OpenStyle>
            );
          }

          return <ClosedStyle key={timeGroup[0].id}>{tableTime}</ClosedStyle>;
        })}
      </>
    );
  }
}


export default ResultsList;


const ClosedStyle = styled.span`
  background: #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #666;
  display: inline-block;
  font-size: 14px;
  margin: 0 6px;
  padding: 8px 25px;
  text-align: center;
  text-decoration: line-through;
  vertical-align: middle;
`;

const OpenStyle = styled.span`
  background: coral;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 0 6px;
  padding: 8px 25px;
  text-align: center;
  vertical-align: middle;
  &:hover {
    background-color: #ff8f66;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;
