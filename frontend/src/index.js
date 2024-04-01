import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import AuthChecker from './components/AuthChecker';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import MoviePage from './pages/MoviePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthChecker/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/movies",
    element: <MoviePage/>,
  },
  {
    path: "/movies/:id",
    element: <MovieDetailsPage/>,
  },
  {
    path: "/logout",
    element: <LogoutPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
