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
  const [selectedDate, handleDateChange] = useState(
    new Date("Jan 5, 2021 15: 37: 25")
  );
  // const [distance, setDistance] = useState(new Date().getDate("3033034034534"));
  const classes = useStyles();

  useEffect(() => {
    setInterval(() => setDate(new Date()), 950);
    // setDistance(new Date("Jan 5, 2021 15: 37: 25").toLocaleTimeString("pl"));
  }, [selectedDate, date]);

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
          numbers={date.toLocaleTimeString("pl").slice(0, 2)}
        />
        <Separator>:</Separator>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={date.toLocaleTimeString("pl").slice(3, 5)}
        />
        <Separator>:</Separator>
        <FlipNumbers
          height={150}
          width={150}
          color="red"
          background="white"
          play
          perspective={1500}
          numbers={date.toLocaleTimeString("pl").slice(6, 8)}
        />
      </FlipContainer>

      <Clock value={date} size={250} />
      <DatePicker>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker value={selectedDate} onChange={handleDateChange} />
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
