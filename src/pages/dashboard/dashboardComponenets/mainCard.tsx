import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applications as getApplications } from "../../../store/application-store/applicationActions";
import { getInquiries } from "../../../store/inquiry-store/inquiryAction";
import { IApplication, IInquiry } from "../../../interfaces";

const MainCard: React.FC = () => {
	const dispatch = useDispatch();
	const stateApplication = useSelector((state) => state.applicationReducer);
	const [Applications, setApplications] = useState<IApplication[]>([]);

	const stateInquiry = useSelector((state) => state.inquiryReducer);
	const [inquiries, setInquiries] = useState<IInquiry[]>([]);

	useEffect(() => {
		dispatch(getApplications());
	}, [dispatch, getApplications]);

	useEffect(() => {
		setApplications(stateApplication.applications);
	}, [stateApplication.applications, setApplications]);

	useEffect(() => {
		dispatch(getInquiries());
	}, [dispatch, getInquiries]);

	useEffect(() => {
		setInquiries(stateInquiry.inquiries);
	}, [stateInquiry.inquiries, setInquiries]);

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
								<p className="card-text">{Applications.length}</p>
							</div>
						</div>
					</div>

					<div className="col-6">
						<div className="card border-dark">
							<div className="card-body text-center">
								<h6 className="card-title">Inquiries</h6>
								<p className="card-text">{inquiries.length}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainCard;
