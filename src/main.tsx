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
import ExternalLinks from "./pages/ExternalLinks";

const router = createBrowserRouter([
  {
    path: "/HSR_warp_resource_calculator/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/HSR_warp_resource_calculator/",
        element: <Home />,
      },
      {
        path: "/HSR_warp_resource_calculator/about",
        element: <About />,
      },
      {
        path: "/HSR_warp_resource_calculator/releated_links",
        element: <RelatedLinks />,
      },
      {
        path: "/HSR_warp_resource_calculator/external_links",
        element: <ExternalLinks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
