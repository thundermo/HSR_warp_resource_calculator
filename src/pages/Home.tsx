import { useState } from "react";
import ResourseCalculator from "../components/ResourceCalculator";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="container calculator bg-light border mt-5 justify-content-center">
        <ResourseCalculator />
      </div>
    </>
  );
}

export default Home;
