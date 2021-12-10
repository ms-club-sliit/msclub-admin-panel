import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "../components";

const AppRoutes: React.FC = () => (
  <div>
    <Router>
      <NavBar />
      <div className="container">
        {/* Route Declaration - Start */}
        <h1 className="card">{process.env.REACT_APP_API_ENDPOINT}</h1>
        {/* Route Declaration - End */}
      </div>
    </Router>
  </div>
);

export default AppRoutes;
