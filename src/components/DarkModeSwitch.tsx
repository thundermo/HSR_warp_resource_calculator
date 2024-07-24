import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeBtnClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html")!;
    htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div>
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={handleDarkModeBtnClick}
      >
        {darkMode ? "Light" : "Dark"}
      </Button>
    </div>
  );
};

export default DarkModeSwitch;
