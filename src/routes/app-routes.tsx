import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

const AppRoutes: React.FC = () => (
  <div>
    <Router>
      <NavBar />
      <div className="container">
        {/* Route Declaration - Start */}
        <h1>{process.env.REACT_APP_API_ENDPOINT}</h1>
        {/* Route Declaration - End */}
      </div>
      <Footer />
    </Router>
  </div>
);

export default AppRoutes;
