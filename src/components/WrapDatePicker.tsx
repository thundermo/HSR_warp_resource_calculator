import React, { ChangeEvent, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getHTMLFormattedTime } from "../scripts/getHTMLFormattedTime";

type WrapDate = {
  date: string;
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
  const serverTimeYYYYMMDD = getHTMLFormattedTime(servertime);

  const calculateDateDiff = (date1: string, date2: string) => {
    const year1 = date1.split("-")[0];
    const month1 = date1.split("-")[1];
    const day1 = date1.split("-")[2];

    const year2 = date2.split("-")[0];
    const month2 = date2.split("-")[1];
    const day2 = date2.split("-")[2];

    const jsDate1 = new Date(`${year1}-${month1}-${day1}`);
    const jsDate2 = new Date(`${year2}-${month2}-${day2}`);
    const timeDiff = Math.abs(jsDate2.getTime() - jsDate1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  };

  const handleDatePickerChange = (e: ChangeEvent<any>) => {
    if (e.target.value < serverTimeYYYYMMDD) {
      return;
    } else {
      setWrapDate({
        ...wrapDate,
        date: e.target.value,
        daysRemaining: calculateDateDiff(e.target.value, serverTimeYYYYMMDD),
      });
    }
  };

  const addDate = (days: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + days));
    // Format the date as yymmdd
    setWrapDate({ ...wrapDate, date: getHTMLFormattedTime(newDate) });
  };

  const getFirstDayOfMonthCount = (date: string) => {
    const wrapyear = parseInt(date.split("-")[0]);
    const wrapmonth = parseInt(date.split("-")[1]);

    const currentYear = parseInt(serverTimeYYYYMMDD.split("-")[0]);
    const currentMonth = parseInt(serverTimeYYYYMMDD.split("-")[1]);

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
    console.log(currentDay, day, count);
    return count;
  }

  const countTreasuresLightward = () => {
    const treasuresLightwardStartDate = new Date(2024, 6, 22);
    const Count = Math.floor(
      (calculateDateDiff(
        wrapDate.date,
        treasuresLightwardStartDate.toISOString().split("T")[0]
      ) -
        1) /
        14
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
    console.log(wrapDate);
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

  return (
    <>
      <Row className="justify-content-start">
        {/* Pick event wrap open date */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Row className="d-flex align-items-center">
            <Col xs={6} sm={3}>
              <Form.Text as={Col} className="fw-bold ">
                Wrap date
              </Form.Text>
            </Col>
            <Col xs={6} sm={9}>
              <Form.Control
                type="date"
                min={serverTimeYYYYMMDD}
                name="date"
                value={wrapDate.date}
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
            <Col xs={3} sm={5}>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default WrapDatePicker;
