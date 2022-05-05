import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IApplication, IInterviewState } from "../../../interfaces";
import { translation } from "../../../locales/en-US/translation.json";
import { MultiSelect } from "react-multi-select-component";

const options = [
	{ value: "it19132310@my.sliit.lk", label: "Lasal Hettiarchchi" },
	{ value: "it19139036@my.sliit.lk", label: "Senura Jayadeva" },
	{ value: "it19104218@my.sliit.lk", label: "Rusiru Abisheak" },
	{ value: "it19131184@my.sliit.lk", label: "Yasiru Randika" },
	{ value: "it19120980@my.sliit.lk", label: "Dilmi Palliyaguruge" },
	{ value: "it20281632@my.sliit.lk", label: "Nisal Palliyaguru" },
	{ value: "it19963402@my.sliit.lk", label: "Miyuru Gnanarathna" },
	{ value: "it19115344@my.sliit.lk", label: "Hansidu Maniyangama" },
	{ value: "it19102924@my.sliit.lk", label: "Lahiru Jayasinghe" },
	{ value: "it20633790@my.sliit.lk", label: "Susith Rupasinghe" },
	{ value: "it20006884@my.sliit.lk", label: "Shivani Rajkumar" },
	{ value: "it20224820@my.sliit.lk", label: "Upendra Ihalagedara" },
	{ value: "it20023614@my.sliit.lk", label: "Pasindu Wijesingha" },
];

let platform: any;

const ApplicationMeetingDetailsView: React.FC = () => {
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.applicationReducer);
	const [meetingDetails, setinterviesDetails] = useState<IApplication>();
	const [selected, setSelected] = useState([]);
	const [selectedPlatform, setState] = useState(platform);

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
		let selectedOption: any = [];
		options.forEach((option) => {
			meetingDetails?.meeting?.emailList.forEach((email: any) => {
				if (option.value == email) {
					selectedOption.push(option);
				}
			});
		});

		setinterviesDetails(meetingDetails);
		setSelected(selectedOption);
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
						<div className="modal-body update-event">
							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;{translation["action-modal"].applications.interview["start-time"]}
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										id="applicationStartDateTime"
										name="applicationStartDateTime"
										value={moment(meetingDetails?.meeting?.startDateTime).format("YYYY-MM-DDTHH:mm")}
										className="form-control"
									/>
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;{translation["action-modal"].applications.interview["end-time"]}
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										id="applicationEndDateTime"
										name="applicationEndDateTime"
										value={moment(meetingDetails?.meeting?.endDateTime).format("YYYY-MM-DDTHH:mm")}
										className="form-control disabled"
									/>
								</div>
							</div>
							<div className="form-group row mx-5 my-2">
								<label className="col-sm-3 text-dark text">
									<i className="fas fa-link fa-sm" />
									&nbsp;{translation.forms.application.view["meeting-link"]}
								</label>
								<a
									href={meetingDetails && meetingDetails?.meeting?.sheduledLink}
									target="_blank"
									className="col-sm-9 text"
									rel="noreferrer"
								>
									{translation.forms.application.view["join-meeting"]}
								</a>
							</div>
							<div className="form-group row mx-5 my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-user fa-sm" />
									&nbsp;{translation["action-modal"].applications.interview.attendees}
								</label>
								<div className="col-sm-9">
									<MultiSelect options={options} value={selected} labelledBy="Select" />
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
