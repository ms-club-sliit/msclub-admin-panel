import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "../components";
import { refreshToken } from "../store/user-store/userActions";
import {
	DeletedTopSpeakerList,
	TopSpeakerList,
	EventList,
	DeletedEventList,
	Login,
	WebinarList,
	DeletedWebinarList,
	ApplicationList,
	InquiryList,
	SettingsPage,
	DeletedInquiryList,
	Dashboard,
	DeletedApplicationList,
} from "../pages";
import PrivateRoute from "./PrivateRoute";

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
						<PrivateRoute path="/topSpeakers/deleted" component={DeletedTopSpeakerList} />
						<PrivateRoute path="/topSpeakers" component={TopSpeakerList} />
						<PrivateRoute path="/events/deleted" component={DeletedEventList} />
						<PrivateRoute path="/events/" component={EventList} />
						<PrivateRoute path="/webinars/deleted" component={DeletedWebinarList} />
						<PrivateRoute path="/webinars/" component={WebinarList} />
						<PrivateRoute path="/settings" component={SettingsPage} />
						<PrivateRoute path="/applications/deleted" component={DeletedApplicationList} />
						<PrivateRoute path="/applications/" component={ApplicationList} />
						<PrivateRoute path="/inquiries/deleted" component={DeletedInquiryList} />
						<PrivateRoute path="/inquiries" component={InquiryList} />
						<PrivateRoute path="/speakers" component={TopSpeakerList} />
						<Route path="/signin" component={Login} exact />
						<PrivateRoute path="/" component={Dashboard} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
