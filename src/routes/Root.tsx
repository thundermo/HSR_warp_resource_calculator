import MyNavbar from "../components/MyNavbar";
import { Outlet } from "react-router-dom";
import "../styles/Root.css";

const Root = () => {
  //initial color theme
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const htmlElement = document.querySelector("html")!;
  htmlElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
  return (
    <>
      <div id="layout" className="w-100">
        <MyNavbar />
        <div className="container">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Root;
