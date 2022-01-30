import React from "react";

const DateTime: React.FC = () => {
	return (
		<div>
			<div className="dateTime d-flex">
				<div className="col-sm-6">
					<p>{new Date().toLocaleTimeString("en-US")}</p>
					<p>{new Date().toLocaleDateString("en-US")}</p>
				</div>
				<div className="col-sm"></div>
				<div className="col-sm-5">
					<p>nicolle</p>
					<p>Admin</p>
				</div>
			</div>
			<hr></hr>
		</div>
	);
};

export default DateTime;
