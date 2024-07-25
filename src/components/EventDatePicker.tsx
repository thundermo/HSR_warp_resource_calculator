import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface EventDatePickerProps {
  daysRemaining: string;
  setDaysRemaining: (days: string) => void;
  firstDayOfMonthCount: number;
  setFirstDayOfMonthCount: (num: number) => void;
  mondayCount: number;
  setMondayCount: (num: number) => void;
  treasuresLightwardCount: number;
  setTreasuresLightwardCount: (num: number) => void;
}

const EventDatePicker: React.FC<EventDatePickerProps> = ({
  daysRemaining,
  setDaysRemaining,
  firstDayOfMonthCount,
  setFirstDayOfMonthCount,
  mondayCount,
  setMondayCount,
  treasuresLightwardCount,
  setTreasuresLightwardCount,
}) => {
  const servertime = new Date();
  const serverTimeYyyymmdd = servertime.toISOString().split("T")[0];
  // Start time of event wrap in HTML format (YYYY-MM-DD)
  const [wrapDate, setWrapDate] = useState(serverTimeYyyymmdd);

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

  const getFirstDayOfMonthCount = (wrapDate: string) => {
    const wrapyear = parseInt(wrapDate.split("-")[0]);
    const wrapmonth = parseInt(wrapDate.split("-")[1]);

    const currentYear = parseInt(serverTimeYyyymmdd.split("-")[0]);
    const currentMonth = parseInt(serverTimeYyyymmdd.split("-")[1]);

    const FirstDayOfMonthCount =
      12 * (wrapyear - currentYear) + (wrapmonth - currentMonth);

    return FirstDayOfMonthCount;
  };

  function countMondays() {
    const currentDay = servertime.getDay();
    const Count = Math.floor((currentDay + parseInt(daysRemaining) - 1) / 7);
    return Count;
  }

  const calTreasuresLightwardCount = () => {
    const treasuresLightwardStartDate = new Date(2024, 6, 22)
      .toISOString()
      .split("T")[0];
    const Count = Math.floor(
      (calculateDateDiff(wrapDate, treasuresLightwardStartDate) - 1) / 14
    );
    return Count;
  };

  const handleDatePickerChange = (pickedDate: string) => {
    setWrapDate(pickedDate);
    setDaysRemaining(
      calculateDateDiff(pickedDate, serverTimeYyyymmdd).toString()
    );
  };

  //handle days remaining change
  //handle event wrap date change after days remain change
  const handleDateChange = (daysRemaining: string) => {
    if (daysRemaining === "") return;
    const currentDate = new Date();
    const newDate = new Date(
      currentDate.setDate(currentDate.getDate() + parseInt(daysRemaining))
    );
    // Format the date as yymmdd
    setWrapDate(newDate.toISOString().split("T")[0]);
  };

  const handleDaysRemainingChange = (day: string) => {
    setDaysRemaining(day);
  };

  const handleDaysRemainingBlur = () => {
    if (daysRemaining === "") setDaysRemaining("0");
  };

  const handleDaysRemainingFocus = () => {
    if (daysRemaining === "0") setDaysRemaining("");
  };

  useEffect(() => {
    handleDateChange(daysRemaining);
  }, [daysRemaining]);

  useEffect(() => {
    setFirstDayOfMonthCount(getFirstDayOfMonthCount(wrapDate));
    setMondayCount(countMondays());
    setTreasuresLightwardCount(calTreasuresLightwardCount());
  }, [wrapDate]);

  return (
    <div>
      <Row className="justify-content-start">
        {/* Pick event wrap open date */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Form.Group
            as={Row}
            controlId="wrapDateInput"
            className="d-flex align-items-center"
          >
            <Col>
              <Form.Label className="fw-bold ">Wrap date</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="date"
                min={serverTimeYyyymmdd}
                value={wrapDate}
                onChange={(event) => handleDatePickerChange(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
        {/* Remaining days */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Form.Group
            as={Row}
            controlId="DaysRemainingInput"
            className="d-flex align-items-center"
          >
            <Form.Label column className="fw-bold ">
              Days remaining
            </Form.Label>
            <Col xs={3} sm={5}>
              <Form.Control
                className="text-left"
                type="number"
                min="0"
                value={daysRemaining}
                onChange={(event) =>
                  handleDaysRemainingChange(event.target.value)
                }
                onFocus={handleDaysRemainingFocus}
                onBlur={handleDaysRemainingBlur}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default EventDatePicker;
