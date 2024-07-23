import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";

function ResourceCalculator() {
  // Current stellar jade number
  const [stellarJadeNum, setStellarJadeNum] = useState("0");
  // Current star rail special pass number
  const [specialPassNum, setSpecialPassNum] = useState("0");
  const serverTimeYyyymmdd = new Date().toISOString().split("T")[0];
  // Open time of the target pool in HTML format (YYYY-MM-DD)
  const [eventWrapStartDate, setEventWrapStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Remaining days till the pool open
  const [daysRemaining, setdaysRemaining] = useState("0");
  // Number of target eidolons
  const [eidolons, setEidolons] = useState("0");
  // Number of target superimposing
  const [superimposing, setSuperimposing] = useState("0");
  //Promotional 5 ★ character guarantee
  const [dropGuarantee, setDropGuarantee] = useState(false);
  //Express Supply Pass (monthly card) availability
  const [monthlyCard, setMonthlyCard] = useState(false);
  //Total available wraps
  const [availableWraps, setAvailableWraps] = useState(0);

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

  const handleStellarJadeNumChange = (stellarJadeNum: string) => {
    setStellarJadeNum(stellarJadeNum);
  };

  const handleStellarJadeNumFocus = () => {
    if (stellarJadeNum === "0") setStellarJadeNum("");
  };

  const handleStellarJadeNumBlur = () => {
    if (stellarJadeNum === "") setStellarJadeNum("0");
  };

  const handleSpecialPassNumChange = (specialPassNum: string) => {
    setSpecialPassNum(specialPassNum);
  };

  const handleSpecialPassNumFocus = () => {
    if (specialPassNum === "0") setSpecialPassNum("");
  };

  const handleSpecialPassNumBlur = () => {
    if (specialPassNum === "") setSpecialPassNum("0");
  };

  const handleDatePickerChange = (pickedDate: string) => {
    setEventWrapStartDate(pickedDate);
    setdaysRemaining(
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
    setdaysRemaining(day);
  };

  const handleDaysRemainingBlur = () => {
    if (daysRemaining === "") setdaysRemaining("0");
  };

  useEffect(() => {
    handleDateChange(daysRemaining);
  }, [daysRemaining]);

  //handle drop guarantee change
  const handleDropGuaranteeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDropGuarantee(event.target.checked);
  };

  //handle monthly card change
  const handleMonthlyCardChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthlyCard(event.target.checked);
  };

  //hande total available wraps change after the dependence changed
  // useEffect(() => {
  //   // Update availableWraps based on num1, num2, and num3
  //   const total = num1 + num2 + num3;
  //   setAvailableWraps(total);
  // }, [num1, num2, num3]);

  return (
    <>
      <h1 className="text-center my-3">Wrap Resource Calculator</h1>
      <Form className="mx-3 my-3">
        <Container className="mb-3">
          <p className="mb-1 fs-5">Current resource number</p>
          <Row>
            {/* Input Stellar Jade Number */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Form.Group as={Row} controlId="StellerJadeInput">
                <Form.Label column className="fw-bold text-start ">
                  Stellar Jade
                </Form.Label>
                <Col xs={4} sm={6}>
                  <Form.Control
                    type="text"
                    value={stellarJadeNum}
                    onChange={(event) =>
                      handleStellarJadeNumChange(event.target.value)
                    }
                    onFocus={handleStellarJadeNumFocus}
                    onBlur={handleStellarJadeNumBlur}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Input Star Rail Special Pass Number */}
            <Col xs={12} sm={6}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="SpecialPassInput"
              >
                <Form.Label column className="fw-bold text-start ">
                  Special Pass
                </Form.Label>
                <Col xs={3} sm={5}>
                  <Form.Control
                    type="text"
                    value={specialPassNum}
                    onChange={(event) =>
                      handleSpecialPassNumChange(event.target.value)
                    }
                    onFocus={handleSpecialPassNumFocus}
                    onBlur={handleSpecialPassNumBlur}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container className="mb-3">
          <p className="mb-0 fs-5 mb-1"> Estimated available wraps</p>
          <Row className="justify-content-start">
            {/* Pick event wrap open date */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Form.Group controlId="eventWrapStartDateInput">
                <Form.Label className="fw-bold ">
                  Event wrap start date
                </Form.Label>
                <Form.Control
                  type="date"
                  min={serverTimeYyyymmdd}
                  value={eventWrapStartDate}
                  onChange={(event) =>
                    handleDatePickerChange(event.target.value)
                  }
                />
              </Form.Group>
            </Col>
            {/* Remaining days */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Form.Group as={Row} controlId="DaysRemainingInput">
                <Form.Label column className="fw-bold ">
                  Days remaining
                </Form.Label>
                <Col xs="4">
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
          {/* Monthly card switch */}
          <div className="d-flex justify-content-start">
            <Form.Check
              reverse
              className="fw-bold"
              type="switch"
              id="monthlyCard-switch"
              label="Express Supply Pass (monthly card)"
              checked={monthlyCard}
              onChange={handleMonthlyCardChange}
            />
          </div>
          {/* available wraps input */}
          <Form.Group as={Row} controlId="availableWrapsInput">
            <Form.Label column className="fw-bold text-info">
              Total available wraps
            </Form.Label>
            <Col xs={3} sm={3}>
              <Form.Control
                className="text-left"
                type="number"
                min="0"
                value={availableWraps}
                readOnly
              />
            </Col>
          </Form.Group>
        </Container>
        <Container className="mb-3">
          <p className="mb-0 fs-5">Wrap target</p>
          <Row>
            {/* Target eidolons */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Form.Group as={Row} className="" controlId="EidolonsInput">
                <Form.Label column className="fw-bold text-start xs-auto ">
                  Eidolons
                </Form.Label>
                <Col xs={3} sm={4}>
                  <Form.Control
                    className="text-left"
                    type="number"
                    value={eidolons}
                    min="0"
                    max="6"
                    onChange={(event) => setEidolons(event.target.value)}
                    onKeyDown={(event) => event.preventDefault()}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Target superimposing */}
            <Col xs={12} sm={6}>
              <Form.Group as={Row} className="" controlId="SuperimposingInput">
                <Form.Label column className="fw-bold text-start ">
                  Superimposing
                </Form.Label>
                <Col xs={3} sm={4}>
                  <Form.Control
                    className="text-left input-field"
                    type="number"
                    value={superimposing}
                    min="0"
                    max="5"
                    onChange={(event) => setSuperimposing(event.target.value)}
                    onKeyDown={(event) => event.preventDefault()}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container className="mb-3">
          <div className="d-flex justify-content-start">
            <Form.Check
              reverse
              className="fw-bold"
              type="switch"
              id="guarantee-switch"
              label="Promotional 5★ guarantee"
              checked={dropGuarantee}
              onChange={handleDropGuaranteeChange}
            />
          </div>
        </Container>
      </Form>
    </>
  );
}

export default ResourceCalculator;
