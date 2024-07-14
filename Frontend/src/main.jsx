import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, SellerDashboard , Login, Signup, BuyerDashboard} from './Components/index.js'

const router =createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/Signup',
        element:<Signup/>
      },
      {
        path:'/seller/profile',
        element:<SellerDashboard/>
      },
      {
        path:'/buyer/profile',
        element:<BuyerDashboard/>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
