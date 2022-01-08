import React, { useState } from "react";
import OrganizationInfo from "./organization";
import Users from "./users";

const SettingsPage: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>("info");

	const handleSelectedTab = (event: any, tabName: string) => {
		setSelectedTab(tabName);
	};
	return (
		<div className="settings">
			<div className="card">
				<div className="row">
					<div className="col-6">
						<h3 className="page-title">Settings</h3>
						<p className="page-description text-muted">Manage the application information</p>
					</div>
				</div>

				<div className="d-flex mb-4 mt-3">
					<button
						className={`btn btn-sm ${selectedTab === "info" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleSelectedTab(e, "info")}
					>
						Organization Info
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "users" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleSelectedTab(e, "users")}
					>
						Users
					</button>
				</div>

				{selectedTab === "info" ? <OrganizationInfo /> : null}
				{selectedTab === "users" ? <Users /> : null}
			</div>
		</div>
	);
};

export default SettingsPage;
