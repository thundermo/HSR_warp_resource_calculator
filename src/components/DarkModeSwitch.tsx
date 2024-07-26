import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const DarkModeSwitch = () => {
  const htmlElement = document.querySelector("html")!;
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const [darkMode, setDarkMode] = useState(
    currentTheme === "dark" ? true : false
  );

  const handleDarkModeBtnClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDarkMode(!darkMode);
    event.currentTarget.blur();
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
        {darkMode ? (
          <i className="bi bi-sun-fill"></i> // Sun icon for light mode
        ) : (
          <i className="bi bi-moon-fill"></i> // Moon icon for dark mode
        )}
      </Button>
    </div>
  );
};

export default DarkModeSwitch;
