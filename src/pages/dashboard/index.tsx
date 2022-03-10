import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./overview";
import RecentLogin from "./login_info";
import RecentApplication from "./application_info";
import ApplicationStatus from "./application_status";
import MSShort from "./msshort";
import { applications as getApplications } from "../../store/application-store/applicationActions";
import { getAllUsers } from "../../store/user-store/userActions";
import { getEvents } from "../../store/event-store/eventActions";
import { getInquiries } from "../../store/inquiry-store/inquiryAction";

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const applicationState = useSelector((state) => state.applicationReducer);

	// Fetch all the necessary information for dashboard
	useEffect(() => {
		dispatch(getApplications());
		dispatch(getInquiries());
		dispatch(getAllUsers());
		dispatch(getEvents());
	}, [dispatch, getApplications, getInquiries, getAllUsers, getEvents]);

	return (
		<div>
			<div className="row">
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<Overview />
				</div>
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<RecentLogin />
				</div>
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<RecentApplication />
				</div>
			</div>

			<div className="row my-4">
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<ApplicationStatus />
				</div>
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<MSShort />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
