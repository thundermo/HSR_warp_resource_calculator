import { useState } from "react";
import ResourseCalculator from "../components/ResourceCalculator";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="border container vh-100 d-flex align-items-center justify-content-center">
        <div className="border mx-3 mt-5 bg-light">
          <ResourseCalculator />
        </div>
      </div>
    </>
  );
}

export default Home;
