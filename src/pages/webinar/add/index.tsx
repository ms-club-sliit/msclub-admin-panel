import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";
import ImageCanvas from "../../../components/image-canvas";
import { ToolBarConfig } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { createWebinar, getWebinars } from "../../../store/webinar-store/webinarActions";
import { IwebinarFormData, IWebinarState } from "../../../interfaces";

let formData: IwebinarFormData = {
	imageSrc: null,
	webinarName: null,
	webinarType: null,
	dateTime: null,
	registrationLink: null,
	webinarLink: null,
	filteredTags: null,
	description: null,
};

const initialState: IWebinarState = {
	webinarId: "",
	isFormNotValid: false,
	imageSrc: null,
	webinarName: "",
	webinarType: "",
	dateTime: "",
	registrationLink: "",
	webinarLink: "",
	filteredTags: [],
	description: "",
};

const AddWebinar: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.webinarReducer);
	const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
	const [
		{
			webinarName,
			webinarLink,
			webinarType,
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
		dispatch(getWebinars());
		closeModal();
	}, [state.addWebinar, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		setEditor(RichTextEditor.createEmptyValue());
		$("#addWebinarModal").modal("hide");
	};

	const onChange = (webinar: any) => {
		const { name, value } = webinar.target;
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
		let tags = value.split(",");
		let filterdTags: string[] = [];

		if (tags.length > 0) {
			for (let tag of tags) {
				filterdTags.push(tag.trim());
			}
			setState((prevState) => ({ ...prevState, filteredTags: filterdTags }));
		}
	};

	//Form validation
	const validateForm = () => {
		const data = {
			imageSrc: imageSrc ? imageSrc : null,
			webinarName: webinarName && webinarName.trim().length > 0 ? webinarName : null,
			webinarType: webinarType && webinarType.trim().length > 0 ? webinarType : null,
			dateTime: dateTime && dateTime.trim().length > 0 ? dateTime : null,
			registrationLink: registrationLink && registrationLink.trim().length > 0 ? registrationLink : null,
			webinarLink: webinarLink && webinarLink.trim().length > 0 ? webinarLink : null,
			filteredTags: filteredTags && filteredTags.length > 0 ? filteredTags : null,
			description: description && description.trim().length > 0 ? description : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	//Form Submission
	const onSubmit = (webinar: any) => {
		webinar.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				let webinarFormData = new FormData();
				webinarFormData.append("webinarFlyer", imageSrc);
				webinarFormData.append("title", webinarName as string);
				webinarFormData.append("dateTime", dateTime as string);
				webinarFormData.append("description", description as string);
				webinarFormData.append("link", webinarLink as string);
				filteredTags?.forEach((tag) => webinarFormData.append("tags", tag));
				webinarFormData.append("registrationLink", registrationLink as string);
				webinarFormData.append("webinarType", webinarType as string);

				dispatch(createWebinar(webinarFormData));
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div
			className="modal fade"
			id="addWebinarModal"
			tabIndex={-1}
			data-mdb-backdrop="static"
			data-mdb-keyboard="false"
			aria-labelledby="addWebinarModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="addWebinarModalLabel">
							Add New Webinar
						</h5>
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>
					<div className="modal-body add-event">
						<ImageCanvas width={300} height={300} getEditedImage={handleImage} />
						<div className="d-flex justify-content-center">
							{formData.imageSrc === null && isFormNotValid ? (
								<span className="text-danger validation-message my-2">Webinar flyer is required</span>
							) : null}
						</div>

						<div className="mx-5">
							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-file-alt fa-sm" />
									&nbsp;Webinar Title
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="webinarName"
										value={webinarName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.webinarName === null && isFormNotValid ? (
										<span className="text-danger validation-message">Webinar name is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Webinar Type</label>
								<div className="col-sm-9">
									<select className="form-control" name="webinarType" value={webinarType as string} onChange={onChange}>
										<option selected>Select webinar type</option>
										<option value="PAST">PAST</option>
										<option value="UPCOMING">UPCOMING</option>
									</select>
									{formData.webinarType === null && isFormNotValid ? (
										<span className="text-danger validation-message">Webinar type is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;Date & Time
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
										<span className="text-danger validation-message">Date & time is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Registration Link
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
										<span className="text-danger validation-message">Registration link is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Webinar Link
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="webinarLink"
										value={webinarLink as string}
										onChange={onChange}
									/>
									{formData.webinarLink === null && isFormNotValid ? (
										<span className="text-danger validation-message">Webinar link is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-tags fa-sm" />
									&nbsp;Tags
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										value={filteredTags as string[]}
										onChange={(e) => handleTags(e.target.value)}
									/>
									<small className="text-muted tag-text">
										Sperate tag names using , (example: ITP, GitHub, Microservice)
									</small>
									<br />
									{formData.filteredTags === null && isFormNotValid ? (
										<span className="text-danger validation-message">Tags are is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-12 col-form-label form-label text-dark">
									<i className="fas fa-align-left" />
									&nbsp;Description
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
										<span className="text-danger validation-message">Description is required</span>
									) : null}
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
							Cancel
						</button>
						<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddWebinar;
