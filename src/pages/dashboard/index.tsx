import React from "react";
import MainCard from "./dashboardComponenets/mainCard";
import RecentLogins from "./dashboardComponenets/recentLogin";
import RecentMessages from "./dashboardComponenets/recentMessage";
import StudentApplication from "./dashboardComponenets/studentApplication";

const Dashboard: React.FC = () => {
	return (
		<div className="row">
			<div className="col-lg-4 col-md-12 mb-4">
				<MainCard />
			</div>
			<div className="col-lg-4 col-md-12 mb-4">
				<RecentLogins />
			</div>
			<div className="col-lg-4 col-md-12 mb-4">
				<RecentMessages />
			</div>
			<div className="col-lg-4 col-md-12 mb-4">
				<StudentApplication />
			</div>
		</div>
	);
};

export default Dashboard;
