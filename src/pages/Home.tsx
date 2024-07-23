import { useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import ResourseCalculator from "../components/ResourceCalculator";

function Home() {
  let items = ["AAAAAAAAA", "BBBBBBBBB", "CCCCCCCCC", "DDDDDDDDD", "EEEEEEEEE"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

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
