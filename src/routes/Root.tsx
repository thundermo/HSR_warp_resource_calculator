import MyNavbar from "../components/MyNavbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div id="layout">
        <MyNavbar />
        <div className="border container vh-100 d-flex align-items-center justify-content-center">
          <div className="border mx-2 pt-2 bg-light">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
