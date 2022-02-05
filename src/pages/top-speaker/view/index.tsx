import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ITopSpeaker } from "../../../interfaces";

const TopSpeakerView: React.FC = () => {
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.topSpeakerReducer);
	const [topSpeakerDetails, setTopSpeakerDetails] = useState<ITopSpeaker>();

	const convertToPlain = (html: string) => {
		const htmlToParser = new HtmlToReactParser();
		const reactElement = htmlToParser.parse(html);
		return reactElement;
	};

	useEffect(() => {
		let topSpeakerdata = state.topSpeakers.find(
			(topSpeaker: ITopSpeaker) => state.selectedTopSpeakerId === topSpeaker._id
		);
		setTopSpeakerDetails(topSpeakerdata);
	}, [state.selectedTopSpeakerId, state.topSpeakers]);

	return (
		<div>
			<div
				className="modal fade"
				id="topSpeakerViewModal"
				data-mdb-backdrop="static"
				data-mdb-keyboard="false"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Top Speaker Document
							</h5>
							<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="event-view">
								<h5 className="header">Information</h5>
								<div className="form-group row mx-5">
									<label className="col-sm-3 text-dark text">
										<i className="far fa-file-alt fa-sm" />
										&nbsp;Speaker Title :
									</label>
									<span className="col-sm-9 text-dark text">{topSpeakerDetails?.title}</span>
								</div>

								<div className="form-group row mx-5">
									<label className="col-sm-3 text-dark text">
										<i className="fas fa-align-left" />
										&nbsp;Description :
									</label>
									<span className="col-sm-9 text-dark text">
										{topSpeakerDetails && convertToPlain(topSpeakerDetails.description)}
									</span>
								</div>

								<hr className="mx-5" />

								<h5 className="header">Document History</h5>
								<div className="form-group row mx-5">
									<label className="col-sm-3 text-dark text">
										<i className="far fa-calendar fa-sm" />
										&nbsp;Created At :
									</label>
									<span className="col-sm-9 text-dark text">
										{topSpeakerDetails && moment(topSpeakerDetails.createdAt).format("LLL")}

										<i className="text-muted mx-1">
											({topSpeakerDetails && moment(topSpeakerDetails.createdAt).startOf("hour").fromNow()})
										</i>
									</span>
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col text-dark text">
										<i className="far fa-edit fa-sm" />
										&nbsp;Modification Info :
									</label>
								</div>
								<div className="form-group row mx-5 my-2">
									<ul className="timeline">
										{topSpeakerDetails &&
											topSpeakerDetails.updatedBy &&
											topSpeakerDetails.updatedBy.map((user, index) => (
												<li key={index} className="modify-user-item">
													<span className="d-flex my-0">
														<img
															src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/
																${process.env.REACT_APP_STORAGE_BUCKET_NAME}/
																${user.user.profileImage}`}
															className="profile-img"
															alt="event-flyer"
														/>
														<p className="mt-0 pt-0 text-dark">
															{user.user.firstName} {user.user.lastName}
														</p>
														<p>
															<span
																className={`badge rounded-pill ${
																	user.user.permissionLevel === "ROOT_ADMIN" ? "bg-primary" : null
																} ${user.user.permissionLevel === "ADMIN" ? "bg-info text-dark" : null} ${
																	user.user.permissionLevel === "EDITOR" ? "bg-secondary" : null
																}`}
															>
																{user.user.permissionLevel === "ROOT_ADMIN" ? "Root Admin" : null}
																{user.user.permissionLevel === "ADMIN" ? "Administrator" : null}
																{user.user.permissionLevel === "EDITOR" ? "Editor" : null}
															</span>
														</p>
														|<p className="text-dark date-time">{moment(user.updatedAt).format("LLL")}</p>
														<p className="text-dark date-time">
															<i className="text-muted mx-1">({moment(user.updatedAt).startOf("hour").fromNow()})</i>
														</p>
													</span>
												</li>
											))}
									</ul>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" data-mdb-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopSpeakerView;
