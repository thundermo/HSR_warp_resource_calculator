import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import MyNavbar from "./components/MyNavbar";

function App() {
  let items = ["AAAAAAAAA", "BBBBBBBBB", "CCCCCCCCC", "DDDDDDDDD", "EEEEEEEEE"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      <MyNavbar />
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>My Alert</Alert>
      )}
      <Button onClick={() => setAlertVisible(true)}>Button</Button>
    </div>
  );
}
export default App;
