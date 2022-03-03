import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applications as getApplications } from "../../../store/application-store/applicationActions";
import { getAllUsers } from "../../../store/user-store/userActions";
import { getEvents } from "../../../store/event-store/eventActions";
import { getInquiries } from "../../../store/inquiry-store/inquiryAction";

const Overview: React.FC = () => {
	const dispatch = useDispatch();
	const applications = useSelector((state) => state.applicationReducer.applications);
	const inquiries = useSelector((state) => state.inquiryReducer.inquiries);
	const events = useSelector((state) => state.eventReducer.events);
	const users = useSelector((state) => state.userReducer.users);

	useEffect(() => {
		dispatch(getApplications());
		dispatch(getInquiries());
		dispatch(getAllUsers());
		dispatch(getEvents());
	}, [dispatch, getApplications, getInquiries, getAllUsers, getEvents]);

	return (
		<div className="overview">
			<div className="card">
				<img className="card-img-top" src="/images/dashboard.png" alt="overview-img" />
				<div className="card-body d-flex justify-content-center">
					<div className="row row__1">
						<div className="col-6">
							<InfoCard
								title="Applications"
								iconClass="fa fa-file-text text-info"
								value={applications && applications.length > 0 ? applications.length : 0}
							/>
						</div>
						<div className="col-6">
							<InfoCard
								title="Inquiries"
								iconClass="fa fa-comments text-warning"
								value={inquiries && inquiries.length > 0 ? inquiries.length : 0}
							/>
						</div>
					</div>
					<div className="row row__2">
						<div className="col-6">
							<InfoCard
								title="Events"
								iconClass="fa fa-calendar text-primary"
								value={events && events.length > 0 ? events.length : 0}
							/>
						</div>
						<div className="col-6">
							<InfoCard
								title="Users"
								iconClass="fa fa-users text-success"
								value={users && users.length > 0 ? users.length : 0}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface InfoCardProps {
	title: string;
	iconClass: string;
	value: string | any;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, iconClass, value }) => {
	return (
		<div className="info-card">
			<div className="card">
				<i className={`fa-3x ${iconClass}`}></i>
				<p className="title">{title}</p>
				<p className="value">{value}</p>
			</div>
		</div>
	);
};

export default Overview;
