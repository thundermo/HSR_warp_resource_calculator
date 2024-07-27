import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import WrapDatePicker from "./WrapDatePicker";
import Image from "./Image";

import item_star_rail_special_pass from "../assets/images/item_star_rail_special_pass.png";
import item_stellar_jade from "../assets/images/item_stellar_jade.png";
import ResourceInfo from "./ResourceInfo";

// type DaysRemaining = {
//   value: number | "";
//   firstDayOfMonthCount: number;
//   mondayCount: number;
//   treasuresLightwardCount: number;
// };

function ResourceCalculator() {
  type calForm = {
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

  const [calForm, setCalForm] = useState<calForm>({
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
    setCalForm({
      ...calForm,
      [e.target.name]: e.target.value === "" ? "" : parseInt(e.target.value),
    });
    console.log(calForm);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalForm({
      ...calForm,
      [e.target.name]: e.target.checked,
    });
    console.log(calForm);
  };

  const handleFocus = (e: React.FocusEvent<any>) => {
    if (e.target.value === "0")
      setCalForm({
        ...calForm,
        [e.target.name]: "",
      });
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    if (e.target.value === "")
      setCalForm({
        ...calForm,
        [e.target.name]: 0,
      });
  };

  const handleLabelClick = (e: any) => {
    e.preventDefault(); // Prevent default focus behavior
  };

  type WrapDate = {
    date: string;
    daysRemaining: number | "";
    firstDayOfMonthCount: number;
    mondayCount: number;
    treasuresLightwardCount: number;
  };

  const [wrapDate, setWrapDate] = useState<WrapDate>({
    date: new Date().toISOString().split("T")[0],
    daysRemaining: 0,
    firstDayOfMonthCount: 0,
    mondayCount: 0,
    treasuresLightwardCount: 0,
  });

  // Remaining days till the pool open
  // const [daysRemaining, setDaysRemaining] = useState<DaysRemaining>({
  //   value: 0,
  //   firstDayOfMonthCount: 0,
  //   mondayCount: 0,
  //   treasuresLightwardCount: 0,
  // });

  // Total available wraps
  const [totalWraps, settotalWraps] = useState("0");

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // hande total available wraps change after the dependence changed
  const dailyTrainingJadeAmount = 60;
  const wrapCost = 160;
  const monthlyCardJadeAmount = calForm.expressSupplyPass ? 90 : 0;
  const namelessGloryPassAmount = calForm.namelessGlory ? 4 : 0;
  const namelessGloryJadeAmount = calForm.namelessGlory ? 680 : 0;
  const simulatedUniverseJadeAmount = 225;
  const treasuresLightwardJadeAmount = 720;
  const patchLivestreamJadeAmount = 300;
  const patchUpdateJadeAmount = 300;
  const embersExchangePassAmount = 5;
  const giftOfOdysseyPassAmount = 10;

  const totalJadeAmount =
    //current Stellar Jade
    (calForm.stellarJadeValue || 0) +
    //+ (daily training activity + monthly card) * days remaining
    (dailyTrainingJadeAmount + monthlyCardJadeAmount) *
      (wrapDate.daysRemaining || 0) +
    // + Nameless Glory * number of patches
    namelessGloryJadeAmount * (calForm.numOfPatch || 0) +
    // + Simulated Universe * number of mondays
    simulatedUniverseJadeAmount * wrapDate.mondayCount +
    // + Treasures Lightward * number of Treasures Lightward
    treasuresLightwardJadeAmount * wrapDate.treasuresLightwardCount +
    // + Patch livestream redeem + patch update server maintenance compensation
    (patchLivestreamJadeAmount + patchUpdateJadeAmount) *
      (calForm.numOfPatch || 0) +
    // + Additional Stellar Jade
    (calForm.additionalStellarJadeValue || 0);

  const totalPassAmount =
    //current Special Pass
    (calForm.SpecialPassValue || 0) +
    // + Embers Exchange * number of 1st day of month
    embersExchangePassAmount * wrapDate.firstDayOfMonthCount +
    // + (Nameless Glory + Gift of odyssey) * number of patches
    (namelessGloryPassAmount + giftOfOdysseyPassAmount) *
      (calForm.numOfPatch || 0) +
    // + Additional Stellar Jade
    (calForm.addtionalSpecialPassValue || 0);

  useEffect(() => {
    //check for empty string cause by user focus on a input field with value "0"
    if (
      calForm.stellarJadeValue === "" ||
      calForm.SpecialPassValue === "" ||
      wrapDate.daysRemaining === ""
    )
      return;

    const totalWraps = Math.floor(totalJadeAmount / wrapCost) + totalPassAmount;
    settotalWraps(totalWraps.toString());
    console.log(
      "total jade:",
      totalJadeAmount,
      "total pass:",
      totalPassAmount,
      "total wrap:",
      totalWraps
    );
  }, [
    calForm.stellarJadeValue,
    calForm.additionalStellarJadeValue,
    calForm.SpecialPassValue,
    calForm.expressSupplyPass,
    calForm.namelessGlory,
    calForm.numOfPatch,
    calForm.addtionalSpecialPassValue,
    wrapDate.date,
    wrapDate.daysRemaining,
    wrapDate.mondayCount,
    wrapDate.firstDayOfMonthCount,
    wrapDate.treasuresLightwardCount,
  ]);

  return (
    <>
      <h1 className="text-center text-info mt-3">Wrap Resource Calculator</h1>

      <Form className="mx-sm-3 mb-3">
        <Container className="mb-3">
          <p className="mb-1 fs-5">Current Resources Held</p>
          <Row>
            {/* Input Stellar Jade Number */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Row>
                <Form.Label
                  onMouseDown={handleLabelClick}
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
                    value={calForm.stellarJadeValue}
                    min={0}
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
                  />
                </Col>
              </Row>
            </Col>
            {/* Input Star Rail Special Pass Number */}
            <Col xs={12} sm={6}>
              <Row className="mb-3">
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
                    value={calForm.SpecialPassValue}
                    min={0}
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className="mb-3">
          <p className="mb-0 fs-5 mb-1"> Estimate Available Wraps</p>
          <div className="mb-1">
            <WrapDatePicker wrapDate={wrapDate} setWrapDate={setWrapDate} />
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
                checked={calForm.expressSupplyPass}
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
                checked={calForm.namelessGlory}
                onChange={(event) => handleSwitchChange(event)}
              />
            </div>
          </Row>
          {/* Nuumbr of patch upcomming */}
          <Row className="mb-1">
            <Form.Label column className="fw-bold text-start ">
              Upcoming Patch Count
            </Form.Label>
            <Col xs={3} sm={2}>
              <Form.Control
                className="input-field"
                type="number"
                name="numOfPatch"
                value={calForm.numOfPatch}
                min="0"
                max={
                  Math.floor(
                    (wrapDate.daysRemaining === ""
                      ? 0
                      : wrapDate.daysRemaining) / 35
                  ) + 1 || 1
                }
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Row>

          {/* Input addtional Stellar Jade Number */}
          <Row className="mb-1">
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
                value={calForm.additionalStellarJadeValue}
                min={0}
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Row>

          {/* Input addtional Special Pass Number */}
          <Row className="mb-1">
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
                value={calForm.addtionalSpecialPassValue}
                min={0}
                onChange={(event) => handleNumberChange(event)}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
              />
            </Col>
          </Row>

          <div
            onClick={toggleDetails}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            {/* Total resources amount */}
            <div>
              Total:&nbsp;&nbsp;{totalPassAmount}
              <Image src={item_star_rail_special_pass} />
              &nbsp;|&nbsp;&nbsp;
              {totalJadeAmount}
              <Image src={item_stellar_jade} />
            </div>
            =&nbsp;<span className="text-info">{totalWraps}</span>
            &nbsp;wraps
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
              {wrapDate.daysRemaining !== "" &&
                wrapDate.daysRemaining !== 0 && (
                  <ResourceInfo
                    label="Daily Training"
                    stellarJadeAmount={dailyTrainingJadeAmount}
                    multiplyBy={wrapDate.daysRemaining || 0}
                  />
                )}

              {/* Express Supply Pass resource*/}
              {calForm.expressSupplyPass &&
                wrapDate.daysRemaining !== "" &&
                wrapDate.daysRemaining !== 0 && (
                  <ResourceInfo
                    label="Express Supply Pass"
                    stellarJadeAmount={monthlyCardJadeAmount}
                    multiplyBy={wrapDate.daysRemaining || 0}
                  />
                )}

              {/* Ember exchange resource*/}
              {wrapDate.firstDayOfMonthCount !== 0 && (
                <ResourceInfo
                  label="Embers Exchange"
                  specialPassAmount={embersExchangePassAmount}
                  multiplyBy={wrapDate.firstDayOfMonthCount}
                />
              )}

              {/* Gift of Odyssey resource*/}
              {calForm.numOfPatch !== 0 && calForm.numOfPatch !== "" && (
                <ResourceInfo
                  label="Gift of Odyssey"
                  specialPassAmount={giftOfOdysseyPassAmount}
                  multiplyBy={calForm.numOfPatch || 0}
                />
              )}

              {/* Nameless Glory pass resource*/}
              {calForm.namelessGlory &&
                calForm.numOfPatch !== 0 &&
                calForm.numOfPatch !== "" && (
                  <ResourceInfo
                    label="Nameless Glory"
                    specialPassAmount={namelessGloryPassAmount}
                    stellarJadeAmount={namelessGloryJadeAmount}
                    multiplyBy={calForm.numOfPatch || 0}
                  />
                )}

              {/* Simulated Universe resource*/}
              {wrapDate.mondayCount !== 0 && (
                <ResourceInfo
                  label="Simulated Universe"
                  stellarJadeAmount={simulatedUniverseJadeAmount}
                  multiplyBy={wrapDate.mondayCount}
                />
              )}

              {/* Treasures Lightward resource*/}
              {wrapDate.treasuresLightwardCount !== 0 && (
                <ResourceInfo
                  label="Treasures Lightward"
                  stellarJadeAmount={treasuresLightwardJadeAmount}
                  multiplyBy={wrapDate.treasuresLightwardCount}
                />
              )}

              {/* Patch livestream redeem code resource*/}
              {calForm.numOfPatch !== 0 && calForm.numOfPatch !== "" && (
                <ResourceInfo
                  label="Patch livestream"
                  stellarJadeAmount={patchLivestreamJadeAmount}
                  multiplyBy={calForm.numOfPatch || 0}
                />
              )}

              {/* Server maintenance jade resource*/}
              {calForm.numOfPatch !== 0 && calForm.numOfPatch !== "" && (
                <ResourceInfo
                  label="Update maintenance compensation"
                  stellarJadeAmount={patchUpdateJadeAmount}
                  multiplyBy={calForm.numOfPatch || 0}
                />
              )}
            </>
          )}
        </Container>

        <Container className="mb-3">
          <p className="mb-0 fs-5">Wrap target</p>
          <Row>
            {/* Target eidolons */}
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Row>
                <Form.Label column className="fw-bold text-start xs-auto ">
                  Eidolons
                </Form.Label>
                <Col xs={3} sm={4}>
                  <Form.Control
                    className="text-left"
                    type="number"
                    name="eidolonsValue"
                    value={calForm.eidolonsValue}
                    min="0"
                    max="6"
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
                  />
                </Col>
              </Row>
            </Col>

            {/* Target superimposing */}
            <Col xs={12} sm={6}>
              <Row className="">
                <Form.Label column className="fw-bold text-start ">
                  Superimposing
                </Form.Label>
                <Col xs={3} sm={4}>
                  <Form.Control
                    className="text-left input-field"
                    type="number"
                    value={calForm.superimposingValue}
                    min="0"
                    max="5"
                    name="superimposingValue"
                    onChange={(event) => handleNumberChange(event)}
                    onFocus={(event) => handleFocus(event)}
                    onBlur={(event) => handleBlur(event)}
                  />
                </Col>
              </Row>
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
              checked={calForm.dropGuarantee}
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
