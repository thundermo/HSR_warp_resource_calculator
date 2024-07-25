import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const DarkModeSwitch = () => {
  const htmlElement = document.querySelector("html")!;
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const [darkMode, setDarkMode] = useState(
    currentTheme === "dark" ? true : false
  );

  const handleDarkModeBtnClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
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
