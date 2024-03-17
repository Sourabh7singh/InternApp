import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Login from './Components/Login';
import Products from './Components/User/LandingPage';
import Productdetails from './Components/User/Productdetails';
import DataState from './Components/DataState';
import Events from './Components/User/Events';
import Dashboard from './Components/Admin/Dashboard';
import AdminEvents from './Components/Admin/AdminEvents';

const router = createBrowserRouter([
  //User Routes
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/user/signin",
    element: <Login isLoginpage={false} isAdmin={false}/>
  },
  {
    path: "/user/login",
    element: <Login isLoginpage={true} isAdmin={false}/>
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
  //Admin Routes
  {
    path: "/admin",
    element: <Dashboard/>
  },
  {
    path: "/admin/signin",
    element: <Login isLoginpage={false} isAdmin={true} />
  },
  {
    path: "/admin/login",
    element: <Login isLoginpage={true} isAdmin={true} />
  },
  {
    path: "/admin/events",
    element: <AdminEvents/>
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataState>
    <RouterProvider router={router} />
  </DataState>
);


