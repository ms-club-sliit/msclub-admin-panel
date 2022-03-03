import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { IApplication } from "../../../interfaces";

const RecentApplication: React.FC = () => {
	const applications = useSelector((state) => state.applicationReducer);
	return (
		<div className="recent__application">
			<div className="card">
				{!applications.loading ? (
					<div>
						<h5 className="m-0">
							<i className="fa fa-file-text text-info"></i>&nbsp;Resent Applications
						</h5>
						<div className="card-body">
							{applications.applications &&
								applications.applications.length > 0 &&
								applications.applications
									.slice(0, 6)
									.map((application: IApplication) => (
										<ApplicationItem
											key={application._id}
											studentID={application.studentId}
											studentName={application.name}
											academicYear={application.currentAcademicYear}
											status={application.status}
											sendAt={application.createdAt}
										/>
									))}
						</div>
					</div>
				) : (
					<Loader type="application_loader" />
				)}
			</div>
		</div>
	);
};

interface ApplicationItemProps {
	studentName: string;
	academicYear: string;
	studentID: string;
	status: string;
	sendAt: string | any;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({ studentID, studentName, academicYear, status, sendAt }) => {
	return (
		<div className="application__item">
			<div className="row">
				<div className="col-5 d-flex">
					<p className="time">{moment(sendAt).format("llll")}</p>
					<span className="line"></span>
				</div>
				<div className="col-7 d-flex">
					<span className="application__item__container">
						<div>
							<div className="name">{studentName}</div>
							<div>
								{studentID} - Year {academicYear}
							</div>
							<div>
								{status === "PENDING" ? <span className="text-warning">Pending</span> : null}
								{status === "INTERVIEW" ? <span className="text-primary">Interview</span> : null}
								{status === "SELECTED" ? <span className="text-success">Selected</span> : null}
								{status === "REJECTED" ? <span className="text-danger">Rejected</span> : null}
							</div>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default RecentApplication;
