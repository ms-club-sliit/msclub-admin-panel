import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AppRoutes: React.FC = () => (
  <div>
    <Router>
      {/* Route Declaration - Start */}
        <h1>{process.env.REACT_APP_API_ENDPOINT}</h1> 
      {/* Route Declaration - End */}
    </Router>
  </div>
);

export default AppRoutes;