import React, { useEffect, useState } from "react";
import ImageCanvas from "../../../components/image-canvas";
import RichTextEditor from "react-rte";
import { ToolBarConfig } from "../../../constants";
import { createEvent, getEvents } from "../../../store/event-store/eventActions";
import { useDispatch, useSelector } from "react-redux";
import { IEventFormData, IEventState } from "../../../interfaces";
import { translation } from "../../../locales/en-US/translation.json";

let formData: IEventFormData = {
	imageSrc: null,
	eventName: null,
	eventType: null,
	dateTime: null,
	registrationLink: null,
	eventLink: null,
	filteredTags: null,
	description: null,
};

const initialState: IEventState = {
	eventId: "",
	isFormNotValid: false,
	imageSrc: null,
	eventName: "",
	eventType: "",
	dateTime: "",
	registrationLink: "",
	eventLink: "",
	filteredTags: [],
	description: "",
};

const AddEvent: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.eventReducer);
	const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
	const [
		{
			eventName,
			eventLink,
			eventType,
			registrationLink,
			description,
			imageSrc,
			isFormNotValid,
			filteredTags,
			dateTime,
		},
		setState,
	] = useState(initialState);

	useEffect(() => {
		dispatch(getEvents());
		closeModal();
	}, [state.addEvent, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		setEditor(RichTextEditor.createEmptyValue());
		$("#addEventModal").modal("hide");
	};

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleImage = (data: any) => {
		setState((prevState) => ({ ...prevState, imageSrc: data }));
	};

	const handleDescription = (value: any) => {
		setEditor(value);
		const isEmpty = !value.getEditorState().getCurrentContent().getPlainText().trim();

		if (isEmpty) {
			setState((prevState) => ({
				...prevState,
				description: null,
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				description: value.toString("html"),
			}));
		}
	};

	const handleTags = (value: string) => {
		const tags = value.split(",");
		let filteredTags: string[] = [];

		if (tags.length > 0) {
			for (let tag of tags) {
				filteredTags.push(tag.trim());
			}
			setState((prevState) => ({ ...prevState, filteredTags: filteredTags }));
		}
	};

	// Form Validation
	const validateForm = () => {
		const data = {
			imageSrc: imageSrc ? imageSrc : null,
			eventName: eventName && eventName.trim().length > 0 ? eventName : null,
			eventType: eventType && eventType.trim().length > 0 ? eventType : null,
			dateTime: dateTime && dateTime.trim().length > 0 ? dateTime : null,
			registrationLink: registrationLink && registrationLink.trim().length > 0 ? registrationLink : null,
			eventLink: eventLink && eventLink.trim().length > 0 ? eventLink : null,
			filteredTags: filteredTags && filteredTags.length > 0 ? filteredTags : null,
			description: description && description.trim().length > 0 ? description : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	// Form Submission
	const onSubmit = (event: any) => {
		event.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				let eventFormData = new FormData();
				eventFormData.append("eventFlyer", imageSrc);
				eventFormData.append("title", eventName as string);
				eventFormData.append("dateTime", dateTime as string);
				eventFormData.append("description", description as string);
				eventFormData.append("link", eventLink as string);
				filteredTags?.forEach((tag) => eventFormData.append("tags", tag));
				eventFormData.append("registrationLink", registrationLink as string);
				eventFormData.append("eventType", eventType as string);

				dispatch(createEvent(eventFormData));
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div
			className="modal fade"
			id="addEventModal"
			tabIndex={-1}
			data-mdb-backdrop="static"
			data-mdb-keyboard="false"
			aria-labelledby="addEventModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="addEventModalLabel">
							{translation.forms.event.title}
						</h5>
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>
					<div className="modal-body add-event">
						<ImageCanvas width={320} height={180} getEditedImage={handleImage} />
						<div className="d-flex justify-content-center">
							{formData.imageSrc === null && isFormNotValid ? (
								<span className="text-danger validation-message my-2">
									{translation.forms.event["validation-message"]["event-flyer"]}
								</span>
							) : null}
						</div>

						<div className="mx-5">
							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-file-alt fa-sm" />
									&nbsp;{translation.forms.event.label["event-title"]}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="eventName"
										value={eventName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.eventName === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms.event["validation-message"]["event-name"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									{translation.forms.event.label["event-type"]}
								</label>
								<div className="col-sm-9">
									<select className="form-control" name="eventType" value={eventType as string} onChange={onChange}>
										<option selected>{translation.forms.event["event-type-select"]}</option>
										<option value="PAST">{translation.forms.event["event-type-dropdown-option"].past}</option>
										<option value="UPCOMING">{translation.forms.event["event-type-dropdown-option"].upcomming}</option>
									</select>
									{formData.eventType === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms.event["validation-message"]["event-type"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;{translation.forms["common-label"]["date-time"]}
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										id="dateTime"
										name="dateTime"
										value={dateTime as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.dateTime === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"]["date-time"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;{translation.forms["common-label"]["registration-link"]}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="registrationLink"
										value={registrationLink as string}
										onChange={onChange}
									/>
									{formData.registrationLink === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"]["registration-link"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;{translation.forms.event.label["event-link"]}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="eventLink"
										value={eventLink as string}
										onChange={onChange}
									/>
									{formData.eventLink === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms.event["validation-message"]["event-link"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-tags fa-sm" />
									&nbsp;{translation.forms["common-label"].tags}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										value={filteredTags as string[]}
										onChange={(e) => handleTags(e.target.value)}
									/>
									<small className="text-muted tag-text">
										{translation.forms.event["event-input-descrption"].tags}
									</small>
									<br />
									{formData.filteredTags === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"].tags}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-12 col-form-label form-label text-dark">
									<i className="fas fa-align-left" />
									&nbsp;{translation.forms["common-label"].description}
								</label>
								<div className="col-sm-12">
									<RichTextEditor
										value={editor}
										onChange={handleDescription}
										toolbarClassName="description"
										editorClassName="description"
										toolbarConfig={ToolBarConfig}
									/>
									{formData.description === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"].description}
										</span>
									) : null}
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
							{translation.buttons.common.cancel}
						</button>
						<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
							{translation.buttons.common.submit}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddEvent;
