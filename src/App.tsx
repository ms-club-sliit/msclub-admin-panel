import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/app-routes";
import "./App.scss";

const App: React.FC = () => (
  <div>
    <AppRoutes />
    <ToastContainer bodyClassName="toastBody" />
  </div>
);

export default App;
