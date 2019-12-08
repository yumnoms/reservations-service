/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DateSelection from './DateSelection.jsx';
import TimeSelection from './TimeSelection.jsx';
import PeopleSelection from './PeopleSelection.jsx';
import ResultsList from './ResultsList.jsx';
import Icons from './Icons.jsx';


const Results = (props) => {
  const {
    restaurantInfo,
    results,
    modalTime,
    modalPeople,
    submitSearch,
    closeModal,
  } = props;

  const selectedDate = document.getElementById('DateSelectModal')
    ? document.getElementById('DateSelectModal').value
    : document.getElementById('DateSelect').value;

  const dateDisplay = moment(selectedDate).format('ddd, MMM D');

  const showResults = results.length !== 0
    ? (<ResultsList results={results} closeModal={closeModal} />)
    : <NoAvailability>No Availability</NoAvailability>;


  return (
    <ModalOverlay>
      <div>
        <LogoStyle>
          <Icons.YelpIcon />
          Reservations
        </LogoStyle>
      </div>
      <ModalContainer>
        <CloseModal onClick={closeModal}><Icons.ClosingIcon /></CloseModal>
        <BottomPadding><h1>{restaurantInfo.name}</h1></BottomPadding>
        <FlexBox>
          <FlexSize1><DateSelection dates={restaurantInfo.dates} selectedDate={selectedDate} modal="true" /></FlexSize1>
          <ContainerMargin>
            <TimeSelection open={restaurantInfo.open} close={restaurantInfo.close} modalTime={modalTime} modal="true" />
            <PeopleSelection min={restaurantInfo.min} max={restaurantInfo.max} modalPeople={modalPeople} modal="true" />
          </ContainerMargin>
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
};


export default Results;


const ButtonStyle = styled.button`
  background: #0097ec;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 25px;
  white-space: nowrap;
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
  background-color: rgba(0, 0, 0, .7);
  text-align: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  margin: auto;
  padding: 40px 80px;
  position: relative;
  text-align: center;
  width: 820px;
  z-index: 51;
`;

const CloseModal = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  text-align: right;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

const FlexSize1 = styled.div`
  display: flex;
  flex-grow: 1;
`;

const FlexSize7 = styled.div`
  display: flex;
  flex-grow: 7;
  justify-content: center;
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

const ContainerMargin = styled.div`
  display: inline-flex;
  flex-grow: 2;
  margin: 0 6px;
`;

const LogoStyle = styled.div`
  color: #fff;
  display: inline-flex;
  font-size: 15pt;
  font-weight: 500;
  line-height: 45px;
  padding: 50px 0;
`;
