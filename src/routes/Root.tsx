import MyNavbar from "../components/MyNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div id="layout">
        <MyNavbar />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
