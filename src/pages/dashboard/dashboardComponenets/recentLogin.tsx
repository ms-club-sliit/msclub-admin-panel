import React from "react";
import DateTime from "./dateTime";

const RecentLogin: React.FC = () => {
	return (
		<div className="recentlogins card">
			<div className="card-body text-center">
				<h4 className="card-title">Recent Logins</h4>
				<div className="container">
					<p className="card-text">
						<DateTime />
					</p>
					<p className="card-text">
						<DateTime />
					</p>
					<p className="card-text">
						<DateTime />
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecentLogin;
