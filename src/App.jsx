import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import AuthCheck from "./routes/AuthCheck/AuthCheck";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";
import Movies from "./pages/Movies/Movies";
import FilteredMovies from "./pages/FilteredMovies/FilteredMovies";
import FilteredMoviesByYear from "./pages/FilteredMoviesByYear/FilteredMoviesByYear";
import Movie from "./pages/Movie/Movie";
import Profile from "./pages/Profile/Profile";
import FavoriteMovies from "./pages/FavoriteMovies/FavoriteMovies";
import SavedMovies from "./pages/SavedMovies/SavedMovies";
import Introduction from "./pages/Introduction/Introduction";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "introduction",
      element: (
          <Introduction />
        // <AuthCheck>
        // </AuthCheck>
      ),
    },
    {
      path: "signin",
      element: (
          <SignIn />
        // <AuthCheck>
        // </AuthCheck>
      ),
    },
    {
      path: "signup",
      element: (
        <SignUp />
        // <AuthCheck>
        // </AuthCheck>
      ),
    },
    {
      path: "/",
      element: (
          <Layout />
        // <ProtectedRoute>
        // </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
              <Home />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: `movies`,
          element: <Movies />,
        },
        {
          path: `profile`,
          element: <Profile />,
        },
        {
          path: "movies/:id",
          element: (
              <FilteredMovies />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "moviesByYear/:id",
          element: (
              <FilteredMoviesByYear />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "eachMovies/:id",
          element: (
              <Movie />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: `favoriteMovies`,
          element: (
              <FavoriteMovies />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: `savedMovies`,
          element: (
              <SavedMovies />
            // <ProtectedRoute>
            // </ProtectedRoute>
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
