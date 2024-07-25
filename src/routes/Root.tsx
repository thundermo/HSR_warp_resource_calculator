import MyNavbar from "../components/MyNavbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  //initial color theme
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const htmlElement = document.querySelector("html")!;
  htmlElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
  return (
    <>
      <div id="layout">
        <MyNavbar />
        <div className="container mt-5 pt-5 d-flex justify-content-center">
          <div className="border mx-2 pt-2 bg-light">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
