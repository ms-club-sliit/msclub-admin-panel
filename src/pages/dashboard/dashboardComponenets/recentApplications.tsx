import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applications } from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";

const RecentApplications: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.applicationReducer);
	const [applicationList, setApplications] = useState<IApplication[]>([]);

	// Fetch inquiries information
	useEffect(() => {
		dispatch(applications());
	}, [dispatch, applications]);

	// Set Inquiry data
	useEffect(() => {
		setApplications(state.applications);
	}, [state.applications, setApplications]);

	const ListItem = () => {
		return (
			<div>
				{applicationList.slice(0, 4).map((application) => {
					return (
						<>
							<div className="dateTime d-flex">
								<div className="col-sm-6">
									<p>{new Date(application.createdAt).toLocaleTimeString("en-US")}</p>
									<p>{new Date(application.createdAt).toLocaleDateString("en-US")}</p>
								</div>
								<div className="col-sm"></div>
								<div className="col-sm-5 col-name">
									<p>{application?.studentId}</p>
								</div>
							</div>
							<hr></hr>
						</>
					);
				})}
			</div>
		);
	};

	return (
		<div className="recentmessages card">
			<div className="card-body text-center">
				<h4 className="card-title">Recent Applications</h4>
				<div className="container">
					<p className="card-text">
						<ListItem />
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecentApplications;
