import React from "react";
import { ToastContainer } from "react-toastify";
import PageRoutes from "./routes";
import "./App.scss";

const App: React.FC = () => (
	<div>
		<PageRoutes />
		<ToastContainer bodyClassName="toastBody" />
	</div>
);

export default App;
