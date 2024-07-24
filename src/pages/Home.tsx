import { useState } from "react";
import ResourseCalculator from "../components/ResourceCalculator";

function Home() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="border bg-light mb-3">
        <ResourseCalculator />
      </div>
    </div>
  );
}

export default Home;
