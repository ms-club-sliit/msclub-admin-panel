import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";

const Overview: React.FC = () => {
	const applicationState = useSelector((state) => state.applicationReducer);
	const inquiryState = useSelector((state) => state.inquiryReducer);
	const eventState = useSelector((state) => state.eventReducer);
	const userState = useSelector((state) => state.userReducer);

	return (
		<div className="overview">
			<div className="card">
				{!applicationState.loading && !inquiryState.loading && !eventState.loading && !userState.loading ? (
					<div>
						<img className="card-img-top" src="/images/dashboard.png" alt="overview-img" />
						<div className="card-body d-flex justify-content-center">
							<div className="row row__1">
								<div className="col-6">
									<InfoCard
										title="Applications"
										iconClass="fa fa-file-text text-info"
										value={
											applicationState && applicationState.applications.length > 0
												? applicationState.applications.length
												: 0
										}
									/>
								</div>
								<div className="col-6">
									<InfoCard
										title="Inquiries"
										iconClass="fa fa-comments text-warning"
										value={inquiryState && inquiryState.inquiries.length > 0 ? inquiryState.inquiries.length : 0}
									/>
								</div>
							</div>
							<div className="row row__2">
								<div className="col-6">
									<InfoCard
										title="Events"
										iconClass="fa fa-calendar text-primary"
										value={eventState && eventState.events.length > 0 ? eventState.events.length : 0}
									/>
								</div>
								<div className="col-6">
									<InfoCard
										title="Users"
										iconClass="fa fa-users text-success"
										value={userState && userState.users.length > 0 ? userState.users.length : 0}
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Loader type="overview_loader" />
				)}
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
