import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import './index.css'
import Gameoflife from './Gameoflife.jsx'
import Home from './Home.jsx'
import Credit from './Credit.jsx';
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Game",
    element: <Gameoflife />
  },
  {
    path: "/Credit",
    element: <Credit />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
