import React from 'react';

class TimeSelection extends React.Component {
  createSelections() {
    const { open, close } = this.props;
    const children = [];

    let timeValue = open;
    while (timeValue !== close) {
      const hh = timeValue.split(':')[0];
      const mm = timeValue.split(':')[1];
      let timeDisplay = `${hh}:${mm}`;

      if (timeValue < '12:00:00') children.push(<option value={timeValue}>{timeDisplay} am</option>);
      else {
        if (timeValue >= '13:00:00') timeDisplay = `${Number(hh) - 12}:${mm}`;
        children.push(<option value={timeValue}>{timeDisplay} pm</option>);
      }

      if (mm === '45') timeValue = `${Number(hh) + 1}:00:00`;
      else timeValue = `${hh}:${Number(mm) + 15}:00`;
    }
    return children;
  }

  render() {
    return (
      <span>
        <select name="time" id="TimeSelect">
          {this.createSelections()}
        </select>
      </span>
    );
  }
}


export default TimeSelection;
