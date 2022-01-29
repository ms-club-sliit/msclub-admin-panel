import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "../components";
import { refreshToken } from "../store/user-store/userActions";
import {
	EventList,
	DeletedEventList,
	Login,
	WebinarList,
	DeletedWebinarList,
	ApplicationList,
	InquiryList,
} from "../pages";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../pages/dashboard/index";

const PageRoutes: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);

	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<div className="container">
					<Switch>
						<PrivateRoute path="/events/deleted" component={DeletedEventList} />
						<PrivateRoute path="/events/" component={EventList} />
						<PrivateRoute path="/webinars/deleted" component={DeletedWebinarList} />
						<PrivateRoute path="/webinars/" component={WebinarList} />
						<PrivateRoute path="/applications" component={ApplicationList} />
						<PrivateRoute path="/inquries" component={InquiryList} />
						<Route path="/signin" component={Login} exact />
						<PrivateRoute path="/" component={Dashboard} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
