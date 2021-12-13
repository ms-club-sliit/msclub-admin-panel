import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/app-routes";
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import "./App.scss";

const App: React.FC = () => (
  <div>
    <AppRoutes />
    <ToastContainer />
  </div>
);

export default App;
