import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IApplication } from "../../../interfaces";
import { translation } from "../../../locales/en-US/translation.json";

const ApplicationMeetingDetailsView: React.FC = () => {
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.applicationReducer);
	const [meetingDetails, setinterviesDetails] = useState<IApplication>();

	const convertToPlain = (html: string) => {
		const htmlToParser = new HtmlToReactParser();
		const reactElement = htmlToParser.parse(html);
		return reactElement;
	};

	useEffect(() => {
		let meetingDetails = state.applications.find(
			(application: IApplication) => state.selectedApplicationId === application._id
		);
		setinterviesDetails(meetingDetails);
	}, [state.selectedApplicationId, state.applications]);

	return (
		<div>
			<div
				className="modal fade"
				id="meetingDataViewModal"
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
								{translation.forms.application.view.title}
							</h5>
							<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="event-view">
								<h5 className="header">{translation.forms["common-row-view"].information}</h5>
								<div className="form-group row mx-5">
									<label className="col-sm-3 text-dark text">
										<i className="far fa-file-alt fa-sm" />
										&nbsp;{translation.forms.application.view["applicant-name"]}
									</label>
									<span className="col-sm-9 text-dark text">{meetingDetails?.meeting?.meetingName}</span>
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col-sm-3 text-dark text">
										<i className="far fa-clock fa-sm" />
										&nbsp;{translation.forms.application.view["start-date"]}
									</label>
									<span className="col-sm-9 text-dark text">
										{moment(meetingDetails?.meeting?.startDateTime).format("LLL")}
									</span>
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col-sm-3 text-dark text">
										<i className="far fa-clock fa-sm" />
										&nbsp;{translation.forms.application.view["end-date"]}
									</label>
									<span className="col-sm-9 text-dark text">
										{moment(meetingDetails?.meeting?.endDateTime).format("LLL")}
									</span>
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col-sm-3 text-dark text">
										<i className="fas fa-link fa-sm" />
										&nbsp;{translation.forms.application.view.attendees}
									</label>
									{meetingDetails?.meeting?.emailList.map((email, index) => (
										<a key={index} href={email} target="_blank" className="col-sm-9 text" rel="noreferrer">
											{email}
										</a>
									))}
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col-sm-3 text-dark text">
										<i className="fas fa-link fa-sm" />
										&nbsp;{translation.forms.application.view["meeting-link"]}
									</label>

									<a
										href={meetingDetails?.meeting?.meetingLink}
										target="_blank"
										className="col-sm-9 text"
										rel="noreferrer"
									>
										{translation.forms.application.view["click-here"]}
									</a>
								</div>
								<div className="form-group row mx-5 my-2">
									<label className="col text-dark text">
										<i className="far fa-edit fa-sm" />
										&nbsp;{translation.forms["common-row-view"]["modification-info"]}
									</label>
								</div>
								<div className="form-group row mx-5 my-2">
									<ul className="timeline">
										{meetingDetails?.meeting?.updatedBy &&
											meetingDetails?.meeting?.updatedBy.map((user, index) => (
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
								{translation.buttons.common.close}
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded">
								{translation.buttons.common.update}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationMeetingDetailsView;
