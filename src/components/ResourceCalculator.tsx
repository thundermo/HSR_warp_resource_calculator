import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import WrapDatePicker from "./WrapDatePicker";
import Image from "./Image";
import useInputHandler from "../hooks/useFormInputHandler";

import item_star_rail_special_pass from "../assets/images/item_star_rail_special_pass.png";
import item_stellar_jade from "../assets/images/item_stellar_jade.png";
import ResourceInfo from "./ResourceInfo";

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

  const { handleNumberChange, handleSwitchChange, handleFocus, handleBlur } =
    useInputHandler(calForm, setCalForm);

  type WrapDate = {
    date: Date;
    daysRemaining: number | "";
    firstDayOfMonthCount: number;
    mondayCount: number;
    treasuresLightwardCount: number;
  };

  const servertime = new Date();

  const [wrapDate, setWrapDate] = useState<WrapDate>({
    date: servertime,
    daysRemaining: 0,
    firstDayOfMonthCount: 0,
    mondayCount: 0,
    treasuresLightwardCount: 0,
  });

  // Total available wraps
  const [totalWraps, setTotalWraps] = useState("0");

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
    setTotalWraps(totalWraps.toString());
    console.log(
      "total jade:",
      totalJadeAmount,
      "total pass:",
      totalPassAmount,
      "total wrap:",
      totalWraps
    );
    console.log("setTotalWraps called", calForm, wrapDate);
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
                <Form.Text
                  as={Col}
                  className="fw-bold text-start d-flex align-items-center"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Stellar Jade</span>
                  <Image src={item_stellar_jade} />
                </Form.Text>
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
                <Form.Text
                  as={Col}
                  className="fw-bold text-start d-flex align-items-center"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Special Pass</span>
                  <Image src={item_star_rail_special_pass} />
                </Form.Text>
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
                className="fw-bold form-text"
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
                className="fw-bold form-text "
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
            <Form.Text
              as={Col}
              className="fw-bold text-start d-flex align-items-center"
            >
              Upcoming Patch Count
            </Form.Text>
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
            <Form.Text
              as={Col}
              className="fw-bold text-start d-flex align-items-center"
            >
              Addtional Stellar Jade
              <Image src={item_stellar_jade} />
            </Form.Text>
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
            <Form.Text
              as={Col}
              className="fw-bold text-start d-flex align-items-center"
            >
              Addtional Special Pass
              <Image src={item_star_rail_special_pass} />
            </Form.Text>
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
              Total:&nbsp;
              <span className="text-info">
                {totalWraps}&nbsp;wraps&nbsp;&nbsp;
              </span>
              |&nbsp;&nbsp;{totalPassAmount}
              <Image src={item_star_rail_special_pass} />
              |&nbsp;&nbsp;
              {totalJadeAmount}
              <Image src={item_stellar_jade} />
            </div>

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

        {/* <Container className="mb-3">
          <p className="mb-0 fs-5">Wrap target</p>
          <Row>
            
            <Col xs={12} sm={6} className="mb-1 mb-sm-0">
              <Row>
                <Form.Text
                  as={Col}
                  className="fw-bold text-start d-flex align-items-center"
                >
                  Eidolons
                </Form.Text>
                <Col xs={3} sm={4}>
                  <Form.Select
                    name="eidolonsValue"
                    value={calForm.eidolonsValue}
                    onChange={handleNumberChange}
                  >
                    {[...Array(7).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>

            
            <Col xs={12} sm={6}>
              <Row className="">
                <Form.Text
                  as={Col}
                  className="fw-bold text-start d-flex align-items-center"
                >
                  Superimposing
                </Form.Text>
                <Col xs={3} sm={4}>
                  <Form.Select
                    name="superimposingValue"
                    value={calForm.superimposingValue}
                    onChange={handleNumberChange}
                  >
                    {[...Array(6).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container className="mb-3">
          <div className="d-flex justify-content-start">
            <Form.Check
              reverse
              className="fw-bold form-text"
              type="switch"
              name="dropGuarantee"
              id="dropGuarantee-switch"
              label="Promotional 5★ guarantee"
              checked={calForm.dropGuarantee}
              onChange={(event) => handleSwitchChange(event)}
            />
          </div>
        </Container> */}
      </Form>
    </>
  );
}

export default ResourceCalculator;
