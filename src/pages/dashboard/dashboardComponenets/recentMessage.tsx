import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiries } from "../../../store/inquiry-store/inquiryAction";
import { IInquiry } from "../../../interfaces";

const RecentMessage: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.inquiryReducer);
	const [inquiries, setInquiries] = useState<IInquiry[]>([]);

	// Fetch inquiries information
	useEffect(() => {
		dispatch(getInquiries());
	}, [dispatch, getInquiries]);

	// Set Inquiry data
	useEffect(() => {
		setInquiries(state.inquiries);
	}, [state.inquiries, setInquiries]);

	const ListItem = () => {
		return (
			<div>
				{inquiries.slice(0, 3).map((inquiry) => {
					return (
						<>
							<div className="dateTime d-flex">
								<div className="col-sm-6">
									<p>{new Date(inquiry?.createdAt).toLocaleTimeString("en-US")}</p>
									<p>{new Date(inquiry?.createdAt).toLocaleDateString("en-US")}</p>
								</div>
								<div className="col-sm"></div>
								<div className="col-sm-5 col-name">
									<p>{inquiry?.name}</p>
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
				<h4 className="card-title">Recent Messages</h4>
				<div className="container">
					<p className="card-text">
						<ListItem />
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecentMessage;
