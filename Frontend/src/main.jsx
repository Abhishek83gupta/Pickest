import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  SellerDashboard,
  Login,
  Signup,
  BuyerDashboard,
} from "./Components/index.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import ProtectedRoute from "./Components/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        // element: <ProtectedRoute children={<Login/>} requireAuth={false}/>
        element: <ProtectedRoute requireAuth={false}>
                      <Login/>       
                 </ProtectedRoute>
      },
      {
        path: "/Signup",
        // element: <ProtectedRoute children={<Signup/>} requireAuth={false}/>
        element: <ProtectedRoute requireAuth={false}>
                    <Signup/>       
                 </ProtectedRoute>
      },
      {
        path: "/seller/profile",
        // element: <ProtectedRoute children={<SellerDashboard/>}/>
        element: <ProtectedRoute >
                    <SellerDashboard/>       
                 </ProtectedRoute>
      },
      {
        path: "/buyer/profile",
        // element: <ProtectedRoute children={<BuyerDashboard/>}/>
        element: <ProtectedRoute >
                   <BuyerDashboard/>       
                </ProtectedRoute>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
