import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.css";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Root from "./routes/Root";
import About from "./pages/About";
import RelatedLinks from "./pages/RelatedLinks";

const router = createBrowserRouter([
  {
    path: "/HSR_wrap_resource_calculator/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/HSR_wrap_resource_calculator/",
        element: <Home />,
      },
      {
        path: "/HSR_wrap_resource_calculator/about",
        element: <About />,
      },
      {
        path: "/HSR_wrap_resource_calculator/releated_links",
        element: <RelatedLinks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
