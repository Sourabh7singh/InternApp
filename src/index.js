import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Login from './Pages/Login';
import Products from './Components/User/LandingPage';
import Productdetails from './Components/User/Productdetails';
import DataState from './Components/DataState';
import Events from './Components/User/Events';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/user/signin",
    element: <Login isLoginpage={false} />
  },
  {
    path: "/user/login",
    element: <Login isLoginpage={true} />
  },
  {
    path: "/user",
    element: <Products/>
  },
  {
    path: "/user/product-details",
    element: <Productdetails/>
  },
  {
    path: "/user/events",
    element: <Events/>
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataState>
    <RouterProvider router={router} />
  </DataState>
);


