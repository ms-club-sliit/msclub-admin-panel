import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import {
	applications,
	setApplicationId,
	changeApplicationStatusIntoInterview,
} from "../../../store/application-store/applicationActions";
import { IInterviewState, IInterviewFormData, IApplication } from "../../../interfaces";

const options = [
	{ value: "it19132310@my.sliit.lk", label: "Lasal Hettiarchchi" },
	{ value: "it19139036@my.sliit.lk", label: "Senura Jayadeva" },
	{ value: "it19104218@my.sliit.lk", label: "Rusiru Abisheak" },
	{ value: "it19131184@my.sliit.lk", label: "Yasiru Randika" },
	{ value: "it19120980@my.sliit.lk", label: "Dilmi Palliyaguruge" },
	{ value: "it20281632@my.sliit.lk", label: "Nisal Palliyaguru" },
	{ value: "it19091044@my.sliit.lk", label: "Miyuru Gnanarathna" },
	{ value: "it19115344@my.sliit.lk", label: "Hansidu Maniyangama" },
	{ value: "it19102924@my.sliit.lk", label: "Lahiru Jayasinghe" },
	{ value: "it20633790@my.sliit.lk", label: "Susith Rupasinghe" },
];

let formData: IInterviewFormData = {
	applicationFormat: null,
	applicationStartDateTime: null,
	applicationEndDateTime: null,
};

const initialState: IInterviewState = {
	applicationId: "",
	isFormNotValid: false,
	applicationFormat: "",
	applicationStartDateTime: "",
	applicationEndDateTime: "",
};

const ApplicationInterviewForm: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.applicationReducer);
	const [
		{ applicationId, applicationFormat, applicationStartDateTime, applicationEndDateTime, isFormNotValid },
		setState,
	] = useState(initialState);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		let applicationData = state.applications.find(
			(application: IApplication) => application._id === state.selectedApplicationId
		);
		setState((prevState) => ({
			...prevState,
			applicationId: applicationData?._id,
		}));
	}, [state.selectedApplicationId, state.applications]);

	useEffect(() => {
		dispatch(applications());
		dispatch(setApplicationId(""));
		closeModal();
		// eslint-disable-next-line
	}, [state.updatedApplication, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		dispatch(setApplicationId(""));
		$("#applicationInterviewModal").modal("hide");
	};

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	// Form Validation
	const validateForm = () => {
		const data = {
			applicationFormat: applicationFormat && applicationFormat.trim().length > 0 ? applicationFormat : null,
			applicationStartDateTime:
				applicationStartDateTime && applicationStartDateTime.trim().length > 0 ? applicationStartDateTime : null,
			applicationEndDateTime:
				applicationEndDateTime && applicationEndDateTime.trim().length > 0 ? applicationEndDateTime : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	// Form Submission
	const onSubmit = (e: any) => {
		e.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				const interviewData = {
					format: applicationFormat as string,
					startDateTime: applicationStartDateTime as string,
					endDateTime: applicationEndDateTime as string,
					attendees: selected ? selected.map((item: any) => item.value) : [],
				};
				if (applicationId) {
					dispatch(changeApplicationStatusIntoInterview(applicationId, interviewData));
					setSelected([]); //clear selected data in multiselecter
				}
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="applicationInterviewModal"
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
								Interview Details
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body update-event">
							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;Start Time
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										id="applicationStartDateTime"
										name="applicationStartDateTime"
										value={applicationStartDateTime as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.applicationStartDateTime === null && isFormNotValid ? (
										<span className="text-danger validation-message">Date & time is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;End Time
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										id="applicationEndDateTime"
										name="applicationEndDateTime"
										value={applicationEndDateTime as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.applicationEndDateTime === null && isFormNotValid ? (
										<span className="text-danger validation-message">Date & time is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row mx-5 my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-check fa-sm" />
									&nbsp;Platform
								</label>
								<div className="col-sm-9">
									<select
										className="form-control"
										name="applicationFormat"
										value={applicationFormat as string}
										onChange={onChange}
									>
										<option selected>Select Platform</option>
										<option value="Microsoft Teams">Microsoft Teams</option>
										<option value="Zoom">Zoom</option>
										<option value="Google Meets">Google Meets</option>
									</select>
									{formData.applicationFormat === null && isFormNotValid ? (
										<span className="text-danger validation-message">Platform is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row mx-5 my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-check fa-sm" />
									&nbsp;Attendees
								</label>
								<div className="col-sm-9">
									<MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
								</div>
							</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								Cancel
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationInterviewForm;
