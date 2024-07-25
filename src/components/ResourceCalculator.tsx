import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import useFormInputHandler from "../hooks/useFormInputHandler";
import EventDatePicker from "./EventDatePicker";
import useSwitchHandler from "../hooks/useSwitchHandler";
import Image from "./Image";

import item_star_rail_special_pass from "../assets/images/item_star_rail_special_pass.png";
import item_stellar_jade from "../assets/images/item_stellar_jade.png";
import ResourceInfo from "./ResourceInfo";

function ResourceCalculator() {
  // Current stellar jade number
  const stellarJadeAmount = useFormInputHandler("0");

  // Addirional stellar jade number
  const additionalStellarJadeAmount = useFormInputHandler("0");

  // Current Star Rail Special Pass number
  const numOfSpecialPass = useFormInputHandler("0");

  // Additional Star Rail Special Pass number
  const numOfAddtionalSpecialPass = useFormInputHandler("0");

  // Remaining days till the pool open
  const [daysRemaining, setDaysRemaining] = useState("0");

  // 1st day of month count
  const [firstDayOfMonthCount, setFirstDayOfMonthCount] = useState(0);

  // 1st day of month count
  const [mondayCount, setMondayCount] = useState(0);

  // 1st day of month count
  const [treasuresLightwardCount, setTreasuresLightwardCount] = useState(0);

  // Number of target eidolons
  const [eidolons, setEidolons] = useState("0");

  // Number of target superimposing
  const [superimposing, setSuperimposing] = useState("0");

  // Express Supply Pass (monthly card) available
  const monthlyCard = useSwitchHandler(false);

  // Nameless Glory available
  const namelessGlory = useSwitchHandler(false);

  // Number of pathches
  const [numOfPatch, setNumOfPatch] = useState("0");

  // Promotional 5 ★ character guarantee
  const dropGuarantee = useSwitchHandler(false);

  // Total available wraps
  const [availableWraps, setAvailableWraps] = useState("0");

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // hande total available wraps change after the dependence changed
  const dailyTrainingJadeAmount = 60;
  const wrapCost = 160;
  const monthlyCardJadeAmount = 90;
  const namelessGloryPassAmount = namelessGlory.value ? 4 : 0;
  const namelessGloryJadeAmount = namelessGlory.value ? 680 : 0;
  const simulatedUniverseJadeAmount = 225;
  const treasuresLightwardJadeAmount = 720;
  const patchLivestreamJadeAmount = 300;
  const patchUpdateJadeAmount = 300;
  const embersExchangePassAmount = 5;
  const giftOfOdysseyPassAmount = 10;

  const totalJadeAmount =
    //current Stellar Jade
    parseInt(stellarJadeAmount.value || "0") +
    //+ (daily training activity + monthly card) * days remaining
    (dailyTrainingJadeAmount +
      (monthlyCard.value === true ? monthlyCardJadeAmount : 0)) *
      parseInt(daysRemaining || "0") +
    // + Nameless Glory * number of patches
    namelessGloryJadeAmount * parseInt(numOfPatch) +
    // + Simulated Universe * number of mondays
    simulatedUniverseJadeAmount * mondayCount +
    // + Treasures Lightward * number of Treasures Lightward
    treasuresLightwardJadeAmount * treasuresLightwardCount +
    // + Patch livestream redeem + patch update server maintenance compensation
    (patchLivestreamJadeAmount + patchUpdateJadeAmount) * parseInt(numOfPatch) +
    // + Additional Stellar Jade
    parseInt(additionalStellarJadeAmount.value || "0");

  const totalPassAmount =
    //current Special Pass
    parseInt(numOfSpecialPass.value || "0") +
    // + Embers Exchange * number of 1st day of month
    embersExchangePassAmount * firstDayOfMonthCount +
    // + (Nameless Glory + Gift of odyssey) * number of patches
    (namelessGloryPassAmount + giftOfOdysseyPassAmount) * parseInt(numOfPatch) +
    // + Additional Stellar Jade
    parseInt(numOfAddtionalSpecialPass.value || "0");

  useEffect(() => {
    //check for empty string cause by user focus on a input field with value "0"
    if (!stellarJadeAmount.value || !numOfSpecialPass.value || !daysRemaining)
      return;

    const totalWraps = Math.floor(totalJadeAmount / wrapCost) + totalPassAmount;
    setAvailableWraps(totalWraps.toString());
    console.log("total jade:", totalJadeAmount, "total pass:", totalWraps);
  }, [
    stellarJadeAmount.value,
    numOfSpecialPass.value,
    monthlyCard.value,
    namelessGlory.value,
    daysRemaining,
    firstDayOfMonthCount,
    numOfPatch,
    mondayCount,
    numOfAddtionalSpecialPass.value,
    additionalStellarJadeAmount.value,
  ]);

  return (
    <>
      <h1 className="text-center my-3 text-info">Wrap Resource Calculator</h1>
      <Form className="mx-3 my-3">
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
                <Form.Label
                  column
                  className="fw-bold text-start d-flex align-items-center"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Special Pass</span>
                  <Image src={item_star_rail_special_pass} />
                </Form.Label>
                <Col xs={3} sm={5}>
                  <Form.Control
                    type="text"
                    value={numOfSpecialPass.value}
                    onChange={(event) =>
                      numOfSpecialPass.handleChange(event.target.value)
                    }
                    onFocus={numOfSpecialPass.handleFocus}
                    onBlur={numOfSpecialPass.handleBlur}
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
                id="monthlyCard-switch"
                label="Express Supply Pass (Monthly Card)"
                checked={monthlyCard.value}
                onChange={monthlyCard.handleChange}
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
                id="nameless-glory"
                label="Nameless Glory (Battle Pass)"
                checked={namelessGlory.value}
                onChange={namelessGlory.handleChange}
              />
            </div>
          </Row>
          {/* Nuumbr of patch upcomming */}
          <Form.Group as={Row} className="mb-1" controlId="NumOfPatchInput">
            <Form.Label column className="fw-bold text-start ">
              Number of patch(es) upcoming
            </Form.Label>
            <Col xs={3} sm={2}>
              <Form.Control
                className="input-field"
                type="number"
                value={numOfPatch}
                min="0"
                max={Math.floor(parseInt(daysRemaining) / 35) + 1 || 1}
                onChange={(event) => setNumOfPatch(event.target.value)}
                onKeyDown={(event) => event.preventDefault()}
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
                type="text"
                value={additionalStellarJadeAmount.value}
                onChange={(event) =>
                  additionalStellarJadeAmount.handleChange(event.target.value)
                }
                onFocus={additionalStellarJadeAmount.handleFocus}
                onBlur={additionalStellarJadeAmount.handleBlur}
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
                type="text"
                value={numOfAddtionalSpecialPass.value}
                onChange={(event) =>
                  numOfAddtionalSpecialPass.handleChange(event.target.value)
                }
                onFocus={numOfAddtionalSpecialPass.handleFocus}
                onBlur={numOfAddtionalSpecialPass.handleBlur}
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
              {/* Express Supply Pass resource*/}
              {monthlyCard.value && parseInt(daysRemaining) > 0 && (
                <ResourceInfo
                  label="Express Supply Pass"
                  stellarJadeAmount={monthlyCardJadeAmount}
                  multiplyBy={daysRemaining || "0"}
                />
              )}

              {/* Ember exchange resource*/}
              {firstDayOfMonthCount !== 0 && (
                <ResourceInfo
                  label="Embers Exchange"
                  specialPassAmount={embersExchangePassAmount}
                  multiplyBy={firstDayOfMonthCount.toString()}
                />
              )}

              {/* Gift of Odyssey resource*/}
              {numOfPatch !== "0" && (
                <ResourceInfo
                  label="Gift of Odyssey"
                  specialPassAmount={giftOfOdysseyPassAmount}
                  multiplyBy={numOfPatch}
                />
              )}

              {/* Nameless Glory pass resource*/}
              {namelessGlory.value && numOfPatch !== "0" && (
                <ResourceInfo
                  label="Nameless Glory"
                  specialPassAmount={namelessGloryPassAmount}
                  stellarJadeAmount={namelessGloryJadeAmount}
                  multiplyBy={numOfPatch}
                />
              )}

              {/* Simulated Universe resource*/}
              {mondayCount !== 0 && (
                <ResourceInfo
                  label="Simulated Universe"
                  stellarJadeAmount={simulatedUniverseJadeAmount}
                  multiplyBy={mondayCount.toString()}
                />
              )}

              {/* Treasures Lightward resource*/}
              {treasuresLightwardCount !== 0 && (
                <ResourceInfo
                  label="Treasures Lightward"
                  stellarJadeAmount={treasuresLightwardJadeAmount}
                  multiplyBy={treasuresLightwardCount.toString()}
                />
              )}

              {/* Patch livestream redeem code resource*/}
              {numOfPatch !== "0" && (
                <ResourceInfo
                  label="Patch livestream"
                  stellarJadeAmount={patchLivestreamJadeAmount}
                  multiplyBy={numOfPatch}
                />
              )}

              {/* Server maintenance jade resource*/}
              {numOfPatch !== "0" && (
                <ResourceInfo
                  label="Update maintenance compensation"
                  stellarJadeAmount={patchUpdateJadeAmount}
                  multiplyBy={numOfPatch}
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
        <Container className="mb-3"></Container>
      </Form>
    </>
  );
}

export default ResourceCalculator;
