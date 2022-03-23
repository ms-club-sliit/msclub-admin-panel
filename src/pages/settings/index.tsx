import React, { useState } from "react";
import OrganizationInfo from "./organization";
import Users from "./users";
import { translation } from "../../locales/en-US/translation.json";

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
						<h3 className="page-title">{translation.setting.title}</h3>
						<p className="page-description text-muted">{translation.setting["page-description"]}</p>
					</div>
				</div>

				<div className="d-flex mb-4 mt-3">
					<button
						className={`btn btn-sm ${selectedTab === "info" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleSelectedTab(e, "info")}
					>
						{translation.setting["data-filter-button"]["organization-info"]}
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "users" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleSelectedTab(e, "users")}
					>
						{translation.setting["data-filter-button"].Users}
					</button>
				</div>

				{selectedTab === "info" ? <OrganizationInfo /> : null}
				{selectedTab === "users" ? <Users /> : null}
			</div>
		</div>
	);
};

export default SettingsPage;
