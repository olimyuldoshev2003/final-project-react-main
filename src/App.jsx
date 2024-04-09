import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import AuthCheck from "./routes/AuthCheck/AuthCheck";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";
import Movie from "./pages/FilteredMovies/FilteredMovies";
import Movies from "./pages/Movies/Movies";
import FilteredMovies from "./pages/FilteredMovies/FilteredMovies";

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
      path: "signup",
      element: (
        <AuthCheck>
          <SignUp />
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
        {
          path: `movies`,
          element: <Movies />,
        },
        {
          path: "movies/:id",
          element: (
            <ProtectedRoute>
              <FilteredMovies />
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
