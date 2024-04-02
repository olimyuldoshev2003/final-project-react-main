import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import AuthCheck from "./routes/AuthCheck/AuthCheck";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "signin",
      element: (
        <AuthCheck>
          <SignIn />
        </AuthCheck>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
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
