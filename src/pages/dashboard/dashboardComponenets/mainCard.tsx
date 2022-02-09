import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applications as getApplications } from "../../../store/application-store/applicationActions";
import { getInquiries } from "../../../store/inquiry-store/inquiryAction";

const MainCard: React.FC = () => {
	const dispatch = useDispatch();
	const stateApplication = useSelector((state) => state.applicationReducer);

	const stateInquiry = useSelector((state) => state.inquiryReducer);

	useEffect(() => {
		dispatch(getApplications());
	}, [dispatch, getApplications]);

	useEffect(() => {
		dispatch(getInquiries());
	}, [dispatch, getInquiries]);

	return (
		<div className="maincard">
			<div className="card">
				<img className="card-img-top" src="/images/ms_club_logo_crop.png" alt="MS logo" />
				<br></br>
				<div className="row mt-5 mb-6">
					<div className="col-6">
						<div className="card border-dark">
							<div className="card-body text-center">
								<h6 className="card-title">Applications</h6>
								<p className="card-text">{stateApplication.applications ? stateApplication.applications.length : 0}</p>
							</div>
						</div>
					</div>

					<div className="col-6">
						<div className="card border-dark">
							<div className="card-body text-center">
								<h6 className="card-title">Inquiries</h6>
								<p className="card-text">{stateInquiry.inquiries ? stateInquiry.inquiries.length : 0}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainCard;
