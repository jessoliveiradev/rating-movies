import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import AuthChecker from './components/AuthChecker';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
