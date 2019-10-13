import React, { useState, useEffect } from "react";
import FlipNumbers from "react-flip-numbers";
import Clock from "react-clock";
import styled from "styled-components";
// import { makeStyles } from "@material-ui/styles";
// import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
// import moment from 'moment';

// const useStyles = makeStyles({
//   root: {
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     border: 0,
//     borderRadius: 3,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//     height: 48,
//     padding: "0 30px"
//   }
// });

const NumberFlip = ({ number }) => (
  <FlipNumbers
    height={100}
    width={100}
    color="red"
    background="white"
    play
    perspective={1500}
    numbers={number.toString()}
  />
);

const App = () => {
  const [date, setDate] = useState(new Date());
  const [targetDate, handleDateChange] = useState(
    new Date() + new Date().setMinutes(20)
  );
  const intervalTime = 1000;
  const now = () => Date.now();

  const [timeRemaining, setTimeRemaining] = useState(
    () => new Date(targetDate) - new Date(now())
  );

  const [seconds, setSecounds] = useState(
    Math.floor((timeRemaining / 1000) % 60)
  );

  const [minutes, setMinutes] = useState(
    Math.floor((timeRemaining / 1000 / 60) % 60)
  );

  const [hours, setHours] = useState(
    Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
  );

  const [days, setDays] = useState(
    Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  );

  // const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date(targetDate) - new Date(now());
      if (current > 0) {
        setTimeRemaining(current);
      } else {
        setTimeRemaining(0);
      }
      setDate(new Date());
    }, intervalTime);

    setSecounds(Math.floor((timeRemaining / 1000) % 60));
    setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60));
    setHours(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
    setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));

    return () => clearInterval(interval);
  }, [intervalTime, timeRemaining, targetDate]);
  console.log(timeRemaining);
  return (
    <Containter>
      <RowContainer>
        <NumberFlip number={days.toString()} />
        <Separator>DAYS</Separator>
        <NumberFlip number={hours.toString()} />
        <Separator>HOURS</Separator>
        <NumberFlip number={minutes.toString()} />
        <Separator>MINUTES</Separator>
        <NumberFlip number={seconds.toString()} />
        <Separator>SECONDS</Separator>
      </RowContainer>
      <RowContainer>
        <Clock value={date} size={250} />
        <DatePicker>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={targetDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
        </DatePicker>
      </RowContainer>
    </Containter>
  );
};

export default App;

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

const DatePickerContainer = styled.div`
  width: 400px;
`;

const Separator = styled.div`
  display: flex;
  font-size: 50px;
`;

const DatePicker = styled(DatePickerContainer)`
  display: flex;
  justify-content: flex-end;
`;
