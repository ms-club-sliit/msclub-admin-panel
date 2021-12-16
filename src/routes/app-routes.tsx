import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "../components";
import EventList from "../pages/event/list";
import DeletedEventList from "../pages/event/list/delete";

const AppRoutes: React.FC = () => (
  <div>
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/deleted" element={<DeletedEventList />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRoutes;
