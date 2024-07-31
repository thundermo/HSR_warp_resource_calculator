import React, { ChangeEvent, useEffect } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { getHTMLFormattedTime } from "../scripts/getHTMLFormattedTime";
import NumButton from "./NumButton";
import useInputHandler from "../hooks/useFormInputHandler";

type WarpDate = {
  date: Date;
  daysRemaining: number | "";
  firstDayOfMonthCount: number;
  mondayCount: number;
  treasuresLightwardCount: number;
};

interface WarpDatePickerProps {
  warpDate: WarpDate;
  setWarpDate: React.Dispatch<React.SetStateAction<WarpDate>>;
}

const WarpDatePicker: React.FC<WarpDatePickerProps> = ({
  warpDate,
  setWarpDate,
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
      setWarpDate({
        ...warpDate,
        date: new Date(pickedDate),
        daysRemaining: getDaysDiff(new Date(pickedDate), servertime),
      });
    }
  };

  const addDate = (days: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + days));
    // Format the date as yymmdd
    setWarpDate({ ...warpDate, date: newDate });
  };

  const getFirstDayOfMonthCount = (date: Date) => {
    const warpyear = date.getFullYear();
    const warpmonth = date.getMonth() + 1;

    const currentYear = servertime.getFullYear();
    const currentMonth = servertime.getMonth() + 1;

    const FirstDayOfMonthCount =
      12 * (warpyear - currentYear) + (warpmonth - currentMonth);

    return FirstDayOfMonthCount;
  };

  function countMondays() {
    const day =
      typeof warpDate.daysRemaining === "number" ? warpDate.daysRemaining : 0;
    if (day === 0) return 0;
    const currentDay = servertime.getDay() === 0 ? 7 : servertime.getDay();
    const count = Math.floor((currentDay + day - 1) / 7);
    return count;
  }

  const countTreasuresLightward = () => {
    const treasuresLightwardStartDate = new Date(2024, 6, 22);
    const Count = Math.floor(
      (getDaysDiff(warpDate.date, treasuresLightwardStartDate) - 1) / 14
    );
    return Count;
  };

  useEffect(() => {
    if (warpDate.daysRemaining === "") return;
    addDate(warpDate.daysRemaining);
  }, [warpDate.daysRemaining]);

  useEffect(() => {
    if (warpDate.daysRemaining === "") return;
    setWarpDate({
      ...warpDate,
      firstDayOfMonthCount: getFirstDayOfMonthCount(warpDate.date),
      mondayCount: countMondays(),
      treasuresLightwardCount: countTreasuresLightward(),
    });
  }, [warpDate.date]);

  const { handleNumberChange, handleFocus, handleBlur } = useInputHandler(
    warpDate,
    setWarpDate
  );

  return (
    <>
      <Row className="justify-content-start">
        {/* Pick event warp open date */}
        <Col xs={12} sm={6} className="mb-1 mb-sm-0">
          <Row className="d-flex align-items-center">
            <Col xs={6}>
              <Form.Text as={Col} className="fw-bold ">
                Warp date
              </Form.Text>
            </Col>
            <Col xs={6} sm={12}>
              <Form.Control
                type="date"
                min={HTMLFormattedServerTime}
                name="date"
                value={getHTMLFormattedTime(warpDate.date)}
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
                  value={warpDate.daysRemaining}
                  onChange={(event) => handleNumberChange(event)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <NumButton
                  targetObject={warpDate}
                  targetItem={"daysRemaining"}
                  setTarget={setWarpDate}
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

export default WarpDatePicker;
