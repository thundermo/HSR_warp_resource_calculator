import React, { ChangeEvent, useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { getHTMLFormattedTime } from "../scripts/getHTMLFormattedTime";
import NumButton from "./NumButton";

type WrapDate = {
  date: Date;
  daysRemaining: number | "";
  firstDayOfMonthCount: number;
  mondayCount: number;
  treasuresLightwardCount: number;
};

interface WrapDatePickerProps {
  wrapDate: WrapDate;
  setWrapDate: React.Dispatch<React.SetStateAction<WrapDate>>;
}

const WrapDatePicker: React.FC<WrapDatePickerProps> = ({
  wrapDate,
  setWrapDate,
}) => {
  const servertime = new Date();
  const HTMLFormattedServerTime = getHTMLFormattedTime(servertime);

  const getDaysDiff = (date1: Date, date2: Date) => {
    return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
  };

  const handleDatePickerChange = (e: ChangeEvent<any>) => {
    if (e.target.value < HTMLFormattedServerTime) {
      return;
    } else {
      const pickedDate = new Date(e.target.value);
      setWrapDate({
        ...wrapDate,
        date: new Date(pickedDate),
        daysRemaining: getDaysDiff(new Date(pickedDate), servertime),
      });
    }
  };

  const addDate = (days: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + days));
    // Format the date as yymmdd
    setWrapDate({ ...wrapDate, date: newDate });
  };

  const getFirstDayOfMonthCount = (date: Date) => {
    const wrapyear = date.getFullYear();
    const wrapmonth = date.getMonth() + 1;

    const currentYear = servertime.getFullYear();
    const currentMonth = servertime.getMonth() + 1;

    const FirstDayOfMonthCount =
      12 * (wrapyear - currentYear) + (wrapmonth - currentMonth);

    return FirstDayOfMonthCount;
  };

  function countMondays() {
    const day =
      typeof wrapDate.daysRemaining === "number" ? wrapDate.daysRemaining : 0;
    if (day === 0) return 0;
    const currentDay = servertime.getDay() === 0 ? 7 : servertime.getDay();
    const count = Math.floor((currentDay + day - 1) / 7);
    return count;
  }

  const countTreasuresLightward = () => {
    const treasuresLightwardStartDate = new Date(2024, 6, 22);
    const Count = Math.floor(
      (getDaysDiff(wrapDate.date, treasuresLightwardStartDate) - 1) / 14
    );
    return Count;
  };

  const handleDaysRemainingChange = (e: React.ChangeEvent<any>) => {
    setWrapDate({
      ...wrapDate,
      daysRemaining: e.target.value === "" ? "" : parseInt(e.target.value),
    });
  };

  useEffect(() => {
    if (wrapDate.daysRemaining === "") return;
    addDate(wrapDate.daysRemaining);
  }, [wrapDate.daysRemaining]);

  useEffect(() => {
    if (wrapDate.daysRemaining === "") return;
    setWrapDate({
      ...wrapDate,
      firstDayOfMonthCount: getFirstDayOfMonthCount(wrapDate.date),
      mondayCount: countMondays(),
      treasuresLightwardCount: countTreasuresLightward(),
    });
  }, [wrapDate.date]);

  const handleFocus = (e: React.FocusEvent<any>) => {
    if (e.target.value === "0") {
      setWrapDate({
        ...wrapDate,
        [e.target.name]: "",
      });
      console.log(e.target.value, "focus");
    }
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    if (e.target.value === "") {
      console.log("blur");
      setWrapDate({
        ...wrapDate,
        [e.target.name]: 0,
      });
    }
  };

  const handleDaysRemainingButtonClick = (e: any, num: number) => {
    if (wrapDate.daysRemaining === "") return;
    const newDays =
      wrapDate.daysRemaining + (wrapDate.daysRemaining + num < 0 ? 0 : num);
    setWrapDate({
      ...wrapDate,
      daysRemaining: newDays,
    });
  };

  return (
    <>
      <Row className="justify-content-start">
        {/* Pick event wrap open date */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Row className="d-flex align-items-center">
            <Col xs={6}>
              <Form.Text as={Col} className="fw-bold ">
                Wrap date
              </Form.Text>
            </Col>
            <Col xs={6} sm={12}>
              <Form.Control
                type="date"
                min={HTMLFormattedServerTime}
                name="date"
                value={getHTMLFormattedTime(wrapDate.date)}
                onChange={(event) => handleDatePickerChange(event)}
              />
            </Col>
          </Row>
        </Col>
        {/* Remaining days */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Row className="d-flex align-items-center">
            <Form.Text as={Col} className="fw-bold ">
              Remaining days
            </Form.Text>
            <Col xs={6} sm={12} className="d-flex align-items-center">
              <InputGroup>
                <Form.Control
                  className="text-left"
                  type="number"
                  min="0"
                  name="daysRemaining"
                  value={wrapDate.daysRemaining}
                  onChange={(event) => handleDaysRemainingChange(event)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <NumButton
                  target={wrapDate}
                  setTarget={setWrapDate}
                  addValue={1}
                  subtractValue={-1}
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default WrapDatePicker;
