import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "../components";
import EventList from "../pages/event/list";

const AppRoutes: React.FC = () => (
  <div>
    <Router>
      <NavBar />
      <div className="container">
        {/* Route Declaration - Start */}
        <EventList />
        {/* Route Declaration - End */}
      </div>
    </Router>
  </div>
);

export default AppRoutes;
