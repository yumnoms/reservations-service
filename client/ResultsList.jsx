import React from 'react';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.makeReservation = this.makeReservation.bind(this);
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
    console.log(tableId);
  }

  render() {
    return (
      <span>
        {this.sortResults().map((timeGroup) => {
          if (timeGroup[0].isOpen) {
            return (
              <span key={timeGroup[0].id} onClick={() => {
                this.makeReservation(timeGroup[0].id);
              }}>
                {timeGroup[0].time}
              </span>
            );
          }

          return <span key={timeGroup[0].id}>{timeGroup[0].time}</span>;
        })}
      </span>
    );
  }
}


export default ResultsList;
