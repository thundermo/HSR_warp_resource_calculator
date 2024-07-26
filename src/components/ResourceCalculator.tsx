import { ChangeEvent, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import useFormInputHandler from "../hooks/useFormInputHandler";
import EventDatePicker from "./WrapDatePicker";
import useSwitchHandler from "../hooks/useSwitchHandler";
import Image from "./Image";

import item_star_rail_special_pass from "../assets/images/item_star_rail_special_pass.png";
import item_stellar_jade from "../assets/images/item_stellar_jade.png";
import ResourceInfo from "./ResourceInfo";

interface DaysRemaining {
  value: number | "";
  firstDayOfMonthCount: number;
  mondayCount: number;
  treasuresLightwardCount: number;
}

type Form = {
  stellarJadeValue: number | "";
  additionalStellarJadeValue: number | "";
  SpecialPassValue: number | "";
  addtionalSpecialPassValue: number | "";
  expressSupplyPass: boolean;
  namelessGlory: false;
  numOfPatch: number | "";
  eidolonsValue: number | "";
  superimposingValue: number | "";
  dropGuarantee: boolean;
};

function ResourceCalculator() {
  const [form, setForm] = useState<Form>({
    stellarJadeValue: 0,
    additionalStellarJadeValue: 0,
    SpecialPassValue: 0,
    addtionalSpecialPassValue: 0,
    expressSupplyPass: false,
    namelessGlory: false,
    numOfPatch: 0,
    eidolonsValue: 0,
    superimposingValue: 0,
    dropGuarantee: false,
  });

  const handleNumberChange = (e: React.ChangeEvent<any>) => {
    setForm({
      ...form,
      [e.target.name]: parseInt(e.target.value),
    });
    console.log(form);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
    console.log(form);
  };

  const handleFocus = (e: React.FocusEvent<any>) => {
    if (e.target.value === "0")
      setForm({
        ...form,
        [e.target.name]: "",
      });
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    if (e.target.value === "")
      setForm({
        ...form,
        [e.target.name]: 0,
      });
  };

  // Remaining days till the pool open
  const [daysRemaining, setDaysRemaining] = useState<DaysRemaining>({
    value: 0,
    firstDayOfMonthCount: 0,
    mondayCount: 0,
    treasuresLightwardCount: 0,
  });

  // 1st day of month count
  const [firstDayOfMonthCount, setFirstDayOfMonthCount] = useState(0);

  // 1st day of month count
  const [mondayCount, setMondayCount] = useState(0);

  // 1st day of month count
  const [treasuresLightwardCount, setTreasuresLightwardCount] = useState(0);

  // Total available wraps
  const [availableWraps, setAvailableWraps] = useState("0");

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // hande total available wraps change after the dependence changed
  const dailyTrainingJadeAmount = 60;
  const wrapCost = 160;
  const monthlyCardJadeAmount = form.expressSupplyPass ? 90 : 0;
  const namelessGloryPassAmount = form.namelessGlory ? 4 : 0;
  const namelessGloryJadeAmount = form.namelessGlory ? 680 : 0;
  const simulatedUniverseJadeAmount = 225;
  const treasuresLightwardJadeAmount = 720;
  const patchLivestreamJadeAmount = 300;
  const patchUpdateJadeAmount = 300;
  const embersExchangePassAmount = 5;
  const giftOfOdysseyPassAmount = 10;

  const totalJadeAmount =
    //current Stellar Jade
    (form.stellarJadeValue || 0) +
    //+ (daily training activity + monthly card) * days remaining
    (dailyTrainingJadeAmount + monthlyCardJadeAmount) *
      (daysRemaining.value || 0) +
    // + Nameless Glory * number of patches
    namelessGloryJadeAmount * (form.numOfPatch || 0) +
    // + Simulated Universe * number of mondays
    simulatedUniverseJadeAmount * mondayCount +
    // + Treasures Lightward * number of Treasures Lightward
    treasuresLightwardJadeAmount * treasuresLightwardCount +
    // + Patch livestream redeem + patch update server maintenance compensation
    (patchLivestreamJadeAmount + patchUpdateJadeAmount) *
      (form.numOfPatch || 0) +
    // + Additional Stellar Jade
    (form.additionalStellarJadeValue || 0);

  const totalPassAmount =
    //current Special Pass
    (form.SpecialPassValue || 0) +
    // + Embers Exchange * number of 1st day of month
    embersExchangePassAmount * firstDayOfMonthCount +
    // + (Nameless Glory + Gift of odyssey) * number of patches
    (namelessGloryPassAmount + giftOfOdysseyPassAmount) *
      (form.numOfPatch || 0) +
    // + Additional Stellar Jade
    (form.addtionalSpecialPassValue || 0);

  useEffect(() => {
    //check for empty string cause by user focus on a input field with value "0"
    if (
      form.stellarJadeValue === "" ||
      form.SpecialPassValue === "" ||
      !daysRemaining
    )
      return;

    const totalWraps = Math.floor(totalJadeAmount / wrapCost) + totalPassAmount;
    setAvailableWraps(totalWraps.toString());
    console.log(
      "total jade:",
      totalJadeAmount,
      "total pass:",
      totalPassAmount,
      "total wrap:",
      totalWraps
    );
  }, [
    form.stellarJadeValue,
    form.additionalStellarJadeValue,
    form.SpecialPassValue,
    form.expressSupplyPass,
    form.namelessGlory,
    daysRemaining,
    form.numOfPatch,
    form.addtionalSpecialPassValue,
  ]);

  return (
    <>
      <h1 className="text-center text-info">Wrap Resource Calculator</h1>

      <Form className="mx-sm-3 my-3">
        <Container className="mb-3">
          <p className="mb-1 fs-5">Current Resources Held</p>
          <Row>
            {/* Input Stellar Jade Number */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Form.Group as={Row} controlId="StellerJadeInput">
                <Form.Label
                  column
                  className="fw-bold text-start d-flex align-items-center"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Stellar Jade</span>
                  <Image src={item_stellar_jade} />
                </Form.Label>
                <Col xs={3} sm={5}>
                  <Form.Control
                    type="number"
                    name="stellarJadeValue"
                    value={form.stellarJadeValue}
                    min={0}
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
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
                <Form.Label
                  column
                  className="fw-bold text-start d-flex align-items-center"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Special Pass</span>
                  <Image src={item_star_rail_special_pass} />
                </Form.Label>
                <Col xs={3} sm={5}>
                  <Form.Control
                    type="number"
                    name="SpecialPassValue"
                    value={form.SpecialPassValue}
                    min={0}
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <Container className="mb-3">
          <p className="mb-0 fs-5 mb-1"> Estimate Available Wraps</p>
          {/* Event start date pciker */}
          <div className="mb-1">
            <EventDatePicker
              firstDayOfMonthCount={firstDayOfMonthCount}
              setFirstDayOfMonthCount={setFirstDayOfMonthCount}
              daysRemaining={daysRemaining}
              setDaysRemaining={setDaysRemaining}
              mondayCount={mondayCount}
              setMondayCount={setMondayCount}
              treasuresLightwardCount={treasuresLightwardCount}
              setTreasuresLightwardCount={setTreasuresLightwardCount}
            />
          </div>
          <Row>
            {/* Monthly card switch */}
            <div className="d-flex justify-content-start">
              <Form.Check
                reverse
                className="fw-bold"
                type="switch"
                name="expressSupplyPass"
                id="monthlyCard-switch"
                label="Express Supply Pass"
                checked={form.expressSupplyPass}
                onChange={(event) => handleSwitchChange(event)}
              />
            </div>
          </Row>
          <Row>
            {/* Nameless Glory switch */}
            <div className="d-flex justify-content-start">
              <Form.Check
                reverse
                className="fw-bold"
                type="switch"
                name="namelessGlory"
                id="namelessGlory-switch"
                label="Nameless Glory"
                checked={form.namelessGlory}
                onChange={(event) => handleSwitchChange(event)}
              />
            </div>
          </Row>
          {/* Nuumbr of patch upcomming */}
          <Form.Group as={Row} className="mb-1" controlId="NumOfPatchInput">
            <Form.Label column className="fw-bold text-start ">
              Upcoming Patch Count
            </Form.Label>
            <Col xs={3} sm={2}>
              <Form.Control
                className="input-field"
                type="number"
                name="numOfPatch"
                value={form.numOfPatch}
                min="0"
                max={
                  Math.floor(
                    (daysRemaining.value === "" ? 0 : daysRemaining.value) / 35
                  ) + 1 || 1
                }
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Form.Group>

          {/* Input addtional Stellar Jade Number */}
          <Form.Group
            as={Row}
            className="mb-1"
            controlId="addtionalStellerJadeInput"
          >
            <Form.Label
              column
              className="fw-bold text-start d-flex align-items-center"
            >
              Addtional Stellar Jade
              <Image src={item_stellar_jade} />
            </Form.Label>
            <Col xs={3} sm={3}>
              <Form.Control
                type="number"
                name="additionalStellarJadeValue"
                value={form.additionalStellarJadeValue}
                min={0}
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Form.Group>

          {/* Input addtional Special Pass Number */}
          <Form.Group
            as={Row}
            className="mb-1"
            controlId="numOfAddtionalSpecialPassInput"
          >
            <Form.Label
              column
              className="fw-bold text-start d-flex align-items-center"
            >
              Addtional Special Pass
              <Image src={item_star_rail_special_pass} />
            </Form.Label>
            <Col xs={3} sm={3}>
              <Form.Control
                type="number"
                name="addtionalSpecialPassValue"
                value={form.addtionalSpecialPassValue}
                min={0}
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Form.Group>

          <div
            onClick={toggleDetails}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            {/* Total resources amount */}
            <ResourceInfo
              label="Total"
              specialPassAmount={totalPassAmount}
              stellarJadeAmount={totalJadeAmount}
            />
            <span style={{ marginLeft: "3px" }}>
              {showDetails ? (
                <i className="bi bi-chevron-up" />
              ) : (
                <i className="bi bi-chevron-down" />
              )}
              {/* Arrow indicator */}
            </span>
          </div>
          {/*  Details of total resources amount*/}
          {showDetails && (
            <>
              {/* Daily Training resource*/}
              {daysRemaining.value !== "" && daysRemaining.value !== 0 && (
                <ResourceInfo
                  label="Daily Training"
                  stellarJadeAmount={dailyTrainingJadeAmount}
                  multiplyBy={daysRemaining.value || 0}
                />
              )}

              {/* Express Supply Pass resource*/}
              {form.expressSupplyPass &&
                daysRemaining.value !== "" &&
                daysRemaining.value !== 0 && (
                  <ResourceInfo
                    label="Express Supply Pass"
                    stellarJadeAmount={monthlyCardJadeAmount}
                    multiplyBy={daysRemaining.value || 0}
                  />
                )}

              {/* Ember exchange resource*/}
              {firstDayOfMonthCount !== 0 && (
                <ResourceInfo
                  label="Embers Exchange"
                  specialPassAmount={embersExchangePassAmount}
                  multiplyBy={firstDayOfMonthCount}
                />
              )}

              {/* Gift of Odyssey resource*/}
              {form.numOfPatch !== 0 && form.numOfPatch !== "" && (
                <ResourceInfo
                  label="Gift of Odyssey"
                  specialPassAmount={giftOfOdysseyPassAmount}
                  multiplyBy={form.numOfPatch || 0}
                />
              )}

              {/* Nameless Glory pass resource*/}
              {form.namelessGlory &&
                form.numOfPatch !== 0 &&
                form.numOfPatch !== "" && (
                  <ResourceInfo
                    label="Nameless Glory"
                    specialPassAmount={namelessGloryPassAmount}
                    stellarJadeAmount={namelessGloryJadeAmount}
                    multiplyBy={form.numOfPatch || 0}
                  />
                )}

              {/* Simulated Universe resource*/}
              {mondayCount !== 0 && (
                <ResourceInfo
                  label="Simulated Universe"
                  stellarJadeAmount={simulatedUniverseJadeAmount}
                  multiplyBy={mondayCount}
                />
              )}

              {/* Treasures Lightward resource*/}
              {treasuresLightwardCount !== 0 && (
                <ResourceInfo
                  label="Treasures Lightward"
                  stellarJadeAmount={treasuresLightwardJadeAmount}
                  multiplyBy={treasuresLightwardCount}
                />
              )}

              {/* Patch livestream redeem code resource*/}
              {form.numOfPatch !== 0 && form.numOfPatch !== "" && (
                <ResourceInfo
                  label="Patch livestream"
                  stellarJadeAmount={patchLivestreamJadeAmount}
                  multiplyBy={form.numOfPatch || 0}
                />
              )}

              {/* Server maintenance jade resource*/}
              {form.numOfPatch !== 0 && form.numOfPatch !== "" && (
                <ResourceInfo
                  label="Update maintenance compensation"
                  stellarJadeAmount={patchUpdateJadeAmount}
                  multiplyBy={form.numOfPatch || 0}
                />
              )}
            </>
          )}

          {/* available wraps indicator */}
          <p className="mt-3 fs-5 mb-1 fw-bold text-info text-center">
            {availableWraps} wraps in total
          </p>
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
                    name="eidolonsValue"
                    value={form.eidolonsValue}
                    min="0"
                    max="6"
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
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
                    value={form.superimposingValue}
                    min="0"
                    max="5"
                    name="superimposingValue"
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
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
              name="dropGuarantee"
              id="dropGuarantee-switch"
              label="Promotional 5★ guarantee"
              checked={form.dropGuarantee}
              onChange={(event) => handleSwitchChange(event)}
            />
          </div>
        </Container>
        <Container className="mb-3"></Container>
      </Form>
    </>
  );
}

export default ResourceCalculator;
