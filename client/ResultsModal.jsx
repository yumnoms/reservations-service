import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';
import ResultsList from './ResultsList.jsx';
import Icons from './Icons.jsx';


class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const { restaurantInfo, results, submitSearch, closeModal } = this.props;
    const selectedDate = document.getElementById('DateSelect').value;
    const dateDisplay = moment(selectedDate).format('ddd, MMM D');

    console.log(results);
    const showResults = results.length !== 0
      ? (<ResultsList results={results} closeModal={closeModal} />)
      : <NoAvailability>No Availability</NoAvailability>;

    return (
      <ModalOverlay>
        <ModalContainer>
          <CloseModal onClick={closeModal}><Icons.ClosingIcon /></CloseModal>
          <BottomPadding><h2>{restaurantInfo.name}</h2></BottomPadding>
          <FlexBox>
            <DateSelection dates={restaurantInfo.dates} selectedDate={selectedDate} modal="true" />
            <TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} modal="true" />
            <PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} modal="true" />
            <ButtonStyle type="button" onClick={() => submitSearch(true)}>Find a Table</ButtonStyle>
          </FlexBox>
          <FlexBox>
            <FlexSize1><h3>{dateDisplay}</h3></FlexSize1>
            <FlexSize7>
              {showResults}
            </FlexSize7>
          </FlexBox>
        </ModalContainer>
      </ModalOverlay>
    );
  }
}


export default Results;


const ButtonStyle = styled.button`
  background: #0097ec;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 25px;
  text-align: center;
  vertical-align: middle;
  &:hover {
    background-color: #3ab5fc;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  margin: auto;
  margin-top: 150px;
  padding: 0px 80px 40px;
  text-align: center;
  width: 820px;
`;

const CloseModal = styled.div`
  position: relative;
  right: -70px;
  top: 10px;
  text-align: right;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexSize1 = styled.div`
  display: flex;
  flex-grow: 1;
`;

const FlexSize7 = styled.div`
  display: flex;
  flex-grow: 7;
  justify-content: space-evenly;
`;

const NoAvailability = styled.div`
  background: #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #666;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 25px;
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;

const BottomPadding = styled.span`
  display: inline-block;
  padding-bottom: 30px;
`;
