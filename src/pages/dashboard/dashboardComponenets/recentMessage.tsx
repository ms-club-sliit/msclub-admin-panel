import React from "react";
import DateTime from "./dateTime";

const RecentMessage: React.FC = () => {
	return (
		<div className="recentmessages card">
			<div className="card-body text-center">
				<h4 className="card-title">Recent Messages</h4>
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

export default RecentMessage;
