import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import useFormInputHandler from "../hooks/useFormInputHandler";
import EventDatePicker from "./EventDatePicker";
import useSwitchHandler from "../hooks/useSwitchHandler";

function ResourceCalculator() {
  // Current stellar jade number
  const stellarJadeAmount = useFormInputHandler("0");
  // Current star rail special pass number
  const specialPassNum = useFormInputHandler("0");
  // Remaining days till the pool open
  const [daysRemaining, setDaysRemaining] = useState("0");
  // Number of target eidolons
  const [eidolons, setEidolons] = useState("0");
  // Number of target superimposing
  const [superimposing, setSuperimposing] = useState("0");
  //Express Supply Pass (monthly card) availability
  const monthlyCard = useSwitchHandler(false);
  //Promotional 5 ★ character guarantee
  const dropGuarantee = useSwitchHandler(false);

  //Total available wraps
  const [availableWraps, setAvailableWraps] = useState("0");

  //hande total available wraps change after the dependence changed
  const dailyAmount = 60;
  const wrapCost = 160;

  useEffect(() => {
    if (!stellarJadeAmount.value || !specialPassNum.value || !daysRemaining)
      return;

    // Update availableWraps based on num1, num2, and num3
    const totalJade =
      parseInt(stellarJadeAmount.value) +
      (dailyAmount + (monthlyCard.value === true ? 90 : 0)) *
        parseInt(daysRemaining);
    const totalWraps =
      Math.floor(totalJade / wrapCost) + parseInt(specialPassNum.value);
    setAvailableWraps(totalWraps.toString());
    console.log(totalJade, totalWraps);
  }, [
    stellarJadeAmount.value,
    specialPassNum.value,
    monthlyCard.value,
    daysRemaining,
  ]);

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
                    value={stellarJadeAmount.value}
                    onChange={(event) =>
                      stellarJadeAmount.handleChange(event.target.value)
                    }
                    onFocus={stellarJadeAmount.handleFocus}
                    onBlur={stellarJadeAmount.handleBlur}
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
                    value={specialPassNum.value}
                    onChange={(event) =>
                      specialPassNum.handleChange(event.target.value)
                    }
                    onFocus={specialPassNum.handleFocus}
                    onBlur={specialPassNum.handleBlur}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <Container className="mb-3">
          <p className="mb-0 fs-5 mb-1"> Estimated available wraps</p>
          {/* Event start date pciker */}
          <EventDatePicker
            daysRemaining={daysRemaining}
            setDaysRemaining={setDaysRemaining}
          />
          {/* Monthly card switch */}
          <div className="d-flex justify-content-start">
            <Form.Check
              reverse
              className="fw-bold"
              type="switch"
              id="monthlyCard-switch"
              label="Express Supply Pass (monthly card)"
              checked={monthlyCard.value}
              onChange={monthlyCard.handleChange}
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
              checked={dropGuarantee.value}
              onChange={dropGuarantee.handleChange}
            />
          </div>
        </Container>
      </Form>
    </>
  );
}

export default ResourceCalculator;
