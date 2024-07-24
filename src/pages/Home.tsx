import { useState } from "react";
import ResourseCalculator from "../components/ResourceCalculator";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="container calculator">
        <ResourseCalculator />
      </div>
    </>
  );
}

export default Home;
