import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const DarkModeSwitch = () => {
  const htmlElement = document.querySelector("html")!;
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const [darkMode, setDarkMode] = useState(
    currentTheme === "dark" ? true : false
  );

  const handleDarkSwitchClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <div onClick={handleDarkSwitchClick} style={{ cursor: "pointer" }}>
        <span>
          {darkMode ? (
            <i className="bi bi-sun-fill"></i> // Sun icon for light mode
          ) : (
            <i className="bi bi-moon-fill"></i> // Moon icon for dark mode
          )}
        </span>
      </div>
    </>
  );
};

export default DarkModeSwitch;
