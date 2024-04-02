import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
