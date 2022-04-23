import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWebinars, setWebinarId, updatedWebinar } from "../../../store/webinar-store/webinarActions";
import { IWebinar, IWebinarState, IwebinarFormData } from "../../../interfaces";
import ImageCanvas from "../../../components/image-canvas";
import moment from "moment";
import RichTextEditor from "react-rte";
import { ToolBarConfig } from "../../../constants";
import { translation } from "../../../locales/en-US/translation.json";

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

const UpdateWebinar: React.FC = () => {
	const dispatch = useDispatch();
	const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
	const state = useSelector((state) => state.webinarReducer);
	const [webinarDetails, setWebinarDetails] = useState<IWebinar>();
	const [
		{
			webinarId,
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
		let webinarData = state.webinars.find((webinar: IWebinar) => webinar._id === state.selectedWebinarId);

		setWebinarDetails(webinarData);
		setState((prevState) => ({
			...prevState,
			webinarId: webinarData?._id,
			webinarName: webinarData?.title,
			webinarLink: webinarData?.link,
			registrationLink: webinarData?.registrationLink,
			webinarType: webinarData?.webinarType,
			description: webinarData?.description,
			dateTime: webinarData?.dateTime,
			filteredTags: webinarData?.tags,
		}));
		setEditor(RichTextEditor.createValueFromString(webinarData?.description, "html"));
	}, [state.selectedWebinarId, state.webinars]);

	useEffect(() => {
		dispatch(getWebinars());
		dispatch(setWebinarId(""));
		closeModal();
		// eslint-disable-next-line
	}, [state.updatedWebinar, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		setEditor(RichTextEditor.createEmptyValue());
		dispatch(setWebinarId(""));
		$("#webinarUpdateModal").modal("hide");
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

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleImage = (data: any) => {
		setState((prevState) => ({ ...prevState, imageSrc: data }));
	};

	const handleTags = (value: string) => {
		let tags = value.split(",");
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

				let webinarFormData = new FormData();
				if (imageSrc) {
					webinarFormData.append("webinarFlyer", imageSrc);
				}
				webinarFormData.append("title", webinarName as string);
				webinarFormData.append("dateTime", dateTime as string);
				webinarFormData.append("description", description as string);
				webinarFormData.append("link", webinarLink as string);
				filteredTags?.forEach((tag) => webinarFormData.append("tags", tag));
				webinarFormData.append("registrationLink", registrationLink as string);
				webinarFormData.append("webinarType", webinarType as string);

				if (webinarId) {
					dispatch(updatedWebinar(webinarId, webinarFormData));
					location.reload();
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
				id="webinarUpdateModal"
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
								{translation.forms.webinar.edit.title}
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body update-event">
							<div className="row mx-5">
								<div className="col-md-6">
									<span className="flyer-title">{translation.forms.webinar.edit["current-webinar-flyer"]}</span>
									<img
										src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${webinarDetails?.imageUrl}`}
										className="flyer"
										alt="webinar-flyer"
									/>
								</div>
								<div className="col-md-6">
									<div className="my-3 my-lg-0">
										<ImageCanvas width={320} height={180} getEditedImage={handleImage} />
										<div className="d-flex justify-content-center">
											{formData.imageSrc === null && isFormNotValid ? (
												<span className="text-danger validation-message my-2">
													{translation.forms.webinar["validation-message"]["webinar-file"]}
												</span>
											) : null}
										</div>
									</div>
								</div>
							</div>

							<div className="form-group row mx-5 my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-file-alt fa-sm" />
									&nbsp;{translation.forms.webinar.label["webinar-name"]}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="webinarName"
										value={webinarName as string}
										onChange={onChange}
									/>
									{formData.webinarName === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms.webinar["validation-message"]["webinar-name"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row mx-5 my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-check fa-sm" />
									&nbsp;{translation.forms.webinar.label["webinar-type"]}
								</label>
								<div className="col-sm-9">
									<select className="form-control" name="webinarType" value={webinarType as string} onChange={onChange}>
										<option selected>{translation.forms.webinar["webinar-type-select"]}</option>
										<option value="PAST">{translation.forms.webinar["webinar-type-dropdown-option"].past}</option>
										<option value="UPCOMING">
											{translation.forms.webinar["webinar-type-dropdown-option"].upcomming}
										</option>
									</select>
									{formData.webinarType === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms.webinar["validation-message"]["webinar-type"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-clock fa-sm" />
									&nbsp;{translation.forms["common-label"]["date-time"]}
								</label>
								<div className="col-sm-9">
									<input
										type="datetime-local"
										name="dateTime"
										value={moment(dateTime).format("YYYY-MM-DDTHH:mm")}
										onChange={onChange}
										className="form-control"
									/>
									{formData.dateTime === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"]["date-time"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;{translation.forms.webinar.label["webinar-link"]}
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
										<span className="text-danger validation-message">
											{translation.forms.webinar["validation-message"]["webinar-link"]}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
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

							<div className="form-group row my-3 mx-5">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-tags fa-sm" />
									&nbsp;{translation.forms["common-label"].tags}
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										value={filteredTags?.map((tag) => tag)}
										onChange={(e) => handleTags(e.target.value)}
									/>
									<small className="text-muted tag-text">
										{translation.forms.webinar["webinar-input-descrption"].tags}
									</small>
									<br />
									{formData.filteredTags === null && isFormNotValid ? (
										<span className="text-danger validation-message">
											{translation.forms["common-validation-message"].tags}
										</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3 mx-5">
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
								</div>
							</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								{translation.buttons.common.cancel}
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								{translation.buttons.common.update}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateWebinar;
