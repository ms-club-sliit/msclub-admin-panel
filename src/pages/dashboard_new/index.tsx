import React from "react";
import Overview from "./overview";
import RecentLogin from "./login_info";
import RecentApplication from "./application_info";
import ApplicationStatus from "./application_status";

const Dashboard: React.FC = () => {
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

			<div className="row">
				<div className="col-md-4 my-2 d-flex justify-content-center">
					<ApplicationStatus />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
