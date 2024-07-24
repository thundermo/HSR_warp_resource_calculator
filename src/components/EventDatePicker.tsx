import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface EventDatePickerProps {
  daysRemaining: string;
  setDaysRemaining: (days: string) => void;
}

const EventDatePicker: React.FC<EventDatePickerProps> = ({
  daysRemaining,
  setDaysRemaining,
}) => {
  const serverTimeYyyymmdd = new Date().toISOString().split("T")[0];
  // Open time of the target pool in HTML format (YYYY-MM-DD)
  const [eventWrapStartDate, setEventWrapStartDate] =
    useState(serverTimeYyyymmdd);
  //handle date picker change

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

  const handleDatePickerChange = (pickedDate: string) => {
    setEventWrapStartDate(pickedDate);
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
    setEventWrapStartDate(newDate.toISOString().split("T")[0]);
  };

  const handleDaysRemainingChange = (day: string) => {
    setDaysRemaining(day);
  };

  const handleDaysRemainingBlur = () => {
    if (daysRemaining === "") setDaysRemaining("0");
  };

  useEffect(() => {
    handleDateChange(daysRemaining);
  }, [daysRemaining]);
  return (
    <div>
      <Row className="justify-content-start">
        {/* Pick event wrap open date */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Form.Group controlId="eventWrapStartDateInput">
            <Form.Label className="fw-bold ">Event wrap start date</Form.Label>
            <Form.Control
              type="date"
              min={serverTimeYyyymmdd}
              value={eventWrapStartDate}
              onChange={(event) => handleDatePickerChange(event.target.value)}
            />
          </Form.Group>
        </Col>
        {/* Remaining days */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Form.Group as={Row} controlId="DaysRemainingInput">
            <Form.Label column className="fw-bold ">
              Days remaining
            </Form.Label>
            <Col xs={3} sm={6}>
              <Form.Control
                className="text-left"
                type="number"
                min="0"
                value={daysRemaining}
                onChange={(event) =>
                  handleDaysRemainingChange(event.target.value)
                }
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
