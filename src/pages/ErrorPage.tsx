import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

function NoPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <MyNavbar />
      <div className="my-5 pt-5 text-center">
        <h1>Oops!</h1>
        <p>{"Sorry, an unexpected error has occurred :("}</p>
        <p>
          <i>
            {isRouteErrorResponse(error)
              ? error.status + " " + error.statusText || error.data
              : "Unknown error"}
          </i>
        </p>
      </div>
    </div>
  );
}

export default NoPage;
