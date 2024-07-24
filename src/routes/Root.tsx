import MyNavbar from "../components/MyNavbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div id="layout">
        <div className="sticky-nav">
          <MyNavbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
