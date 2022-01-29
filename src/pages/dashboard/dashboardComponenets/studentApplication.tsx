import React from "react";
import Chart from "./chart";

const StudentApplication: React.FC = () => {
	return (
		<div className="studentapplication card">
			<div className="card-body text-center">
				<h4 className="card-title">Student Applications</h4>
				<p className="card-text">
					<Chart />
				</p>
				<div className="card-deck">
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Pending</h6>
								</div>
								<div className="col-6">
									<p className="card-text">56</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Completed</h6>
								</div>
								<div className="col-6">
									<p className="card-text">56</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Deleted</h6>
								</div>
								<div className="col-6">
									<p className="card-text">56</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentApplication;
