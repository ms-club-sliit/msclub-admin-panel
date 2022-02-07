import React, { useEffect, useState } from "react";
import Chart from "./chart";
import { useDispatch, useSelector } from "react-redux";
import { applications as getApplications } from "../../../store/application-store/applicationActions";

const StudentApplication: React.FC = () => {
	const dispatch = useDispatch();
	const stateApplication = useSelector((state) => state.applicationReducer);
	const [pendingApplications, setpendingApplications] = useState(0);
	const [interviewApplications, setInterviewApplications] = useState(0);
	const [selectedApplications, setselectedApplications] = useState(0);

	useEffect(() => {
		dispatch(getApplications());
	}, [dispatch, getApplications]);

	//filter and set application data
	useEffect(() => {
		setpendingApplications(
			stateApplication.applications &&
				stateApplication.applications.filter((application: any) => application.status === "PENDING").length
		);
		setInterviewApplications(
			stateApplication.applications &&
				stateApplication.applications.filter((application: any) => application.status === "INTERVIEW").length
		);
		setselectedApplications(
			stateApplication.applications &&
				stateApplication.applications.filter((application: any) => application.status === "SELECTED").length
		);
	}, [setpendingApplications, setInterviewApplications, setselectedApplications, stateApplication.applications]);

	return (
		<div className="studentapplication card">
			<div className="card-body text-center">
				<h4 className="card-title">Student Applications</h4>
				<p className="card-text">
					<Chart
						pendingCount={pendingApplications}
						interviewCount={interviewApplications}
						selectedCount={selectedApplications}
					/>
				</p>
				<div className="card-deck">
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="pending">Pending</h6>
								</div>
								<div className="col-6">
									<p className="card-text">{pendingApplications}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Selected</h6>
								</div>
								<div className="col-6">
									<p className="card-text">{selectedApplications}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Interview</h6>
								</div>
								<div className="col-6">
									<p className="card-text">{interviewApplications}</p>
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
