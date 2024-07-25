import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "./main.css";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Root from "./routes/Root";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
