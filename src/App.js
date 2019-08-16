import React, { useState, useEffect } from "react";
import FlipNumbers from "react-flip-numbers";
import Clock from "react-clock";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

const App = () => {
  const [date, setDate] = useState(new Date());
  const [targetDate, handleDateChange] = useState(
    new Date("Jan 5, 2020 15: 37: 25")
  );

  const [timeRemaining, setTimeRemaining] = useState(
    Date.parse(targetDate) - Date.parse(date)
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

  const classes = useStyles();

  // function useCountdown(date, options = {}) {
  //   const { intervalTime = 1000, now = () => Date.now() } = options;
  //   const [timeLeft, setTimeLeft] = useState(
  //     () => new Date(date()) - new Date(now())
  //   );

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setTimeLeft(current => {
  //         if (current <= 0) {
  //           clearInterval(interval);

  //           return 0;
  //         }

  //         return current - intervalTime;
  //       });
  //     }, intervalTime);

  //     return () => clearInterval(interval);
  //   }, [intervalTime]);

  //   return timeLeft;
  // }

  // setTimeRemaining(Date.parse(targetDate) - Date.parse(new Date()));
  useEffect(() => {
    setInterval(() => {
      setDate(new Date());

      setSecounds(Math.floor((timeRemaining / 1000) % 60));
      setMinutes(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
      setHours(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
      setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
      setTimeRemaining(Date.parse(targetDate) - Date.parse(new Date()));
    }, 1000);
  }, [targetDate, date, timeRemaining]);

  return (
    <Containter>
      <FlipContainer>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={days.toString()}
        />
        <Separator>Days</Separator>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={hours.toString()}
        />
        <Separator>:</Separator>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={minutes.toString()}
        />
        <Separator>:</Separator>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={seconds.toString()}
        />
      </FlipContainer>

      <Clock value={date} size={250} />
      <DatePicker>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker value={targetDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
        <Button className={classes.root}>Hook</Button>
      </DatePicker>
    </Containter>
  );
};

export default App;
const Containter = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlipContainer = styled.div`
  display: flex;
  width: 800px;
  height: 300px;
  align-items: center;
`;
const DatePickerContainer = styled.div`
  width: 400px;
`;

const Separator = styled.div`
  display: flex;
  font-size: 40px;
`;

const DatePicker = styled(DatePickerContainer)`
  display: flex;
  justify-content: flex-end;
`;
