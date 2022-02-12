import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopSpeakers, setTopSpeakerId, updateTopSpeaker } from "../../../store/top-speaker-store/topSpeakerActions";
import { ITopSpeaker, ITopSpeakerState, ITopSpeakerFormData } from "../../../interfaces";
import ImageCanvas from "../../../components/image-canvas";
import RichTextEditor from "react-rte";
import { ToolBarConfig } from "../../../constants";

let formData: ITopSpeakerFormData = {
	imageSrc: null,
	topSpeakerName: null,
	description: null,
	socialMediaURLs: { facebook: null, instagram: null, twitter: null, linkedIn: null, web: null },
};

const initialState: ITopSpeakerState = {
	topSpeakerId: "",
	isFormNotValid: false,
	imageSrc: null,
	topSpeakerName: "",
	description: "",
	facebook: "",
	instagram: "",
	twitter: "",
	linkedIn: "",
	web: "",
};

const UpdateTopSpeaker: React.FC = () => {
	const dispatch = useDispatch();
	const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
	const state = useSelector((state) => state.topSpeakerReducer);
	const [topSpeakerDetails, setTopSpeakerDetails] = useState<ITopSpeaker>();
	const [
		{
			topSpeakerId,
			topSpeakerName,
			description,
			imageSrc,
			isFormNotValid,
			facebook,
			instagram,
			twitter,
			linkedIn,
			web,
		},
		setState,
	] = useState(initialState);

	useEffect(() => {
		let topSpeakerData = state.topSpeakers.find(
			(topSpeaker: ITopSpeaker) => topSpeaker._id === state.selectedTopSpeakerId
		);

		setTopSpeakerDetails(topSpeakerData);
		setState((prevState) => ({
			...prevState,
			topSpeakerId: topSpeakerData?._id,
			topSpeakerName: topSpeakerData?.title,
			description: topSpeakerData?.description,
			facebook: topSpeakerData?.socialMediaURLs.facebook,
			instagram: topSpeakerData?.socialMediaURLs.instagram,
			twitter: topSpeakerData?.socialMediaURLs.twitter,
			linkedIn: topSpeakerData?.socialMediaURLs.linkedIn,
			web: topSpeakerData?.socialMediaURLs.web,
		}));
		setEditor(RichTextEditor.createValueFromString(topSpeakerData?.description, "html"));
	}, [state.selectedTopSpeakerId, state.topSpeakers]);

	useEffect(() => {
		dispatch(getTopSpeakers());
		dispatch(setTopSpeakerId(""));
		closeModal();
	}, [state.updatedTopSpeaker, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		setEditor(RichTextEditor.createEmptyValue());
		$("#topSpeakerUpdateModal").modal("hide");
	};

	const onChange = (topSpeaker: any) => {
		const { name, value } = topSpeaker.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const onChangeSocialMedia = (topSpeaker: any) => {
		const { name, value } = topSpeaker.target;
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

	// Form Validation
	const validateForm = () => {
		const data = {
			topSpeakerName: topSpeakerName && topSpeakerName.trim().length > 0 ? topSpeakerName : null,
			description: description && description.trim().length > 0 ? description : null,
			socialMediaURLs: {
				facebook: facebook && facebook.trim().length > 0 ? facebook : null,
				instagram: instagram && instagram.trim().length > 0 ? instagram : null,
				twitter: twitter && twitter.trim().length > 0 ? twitter : null,
				linkedIn: linkedIn && linkedIn.trim().length > 0 ? linkedIn : null,
				web: web && web.trim().length > 0 ? web : null,
			},
		};

		formData = Object.assign({}, data);
		return true;
	};

	// Form Submission
	const onSubmit = (topSpeaker: any) => {
		topSpeaker.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				let topSpeakerFormData = new FormData();
				if (imageSrc) {
					topSpeakerFormData.append("topSpeakerFlyer", imageSrc);
				}
				topSpeakerFormData.append("title", topSpeakerName as string);
				topSpeakerFormData.append("description", description as string);
				topSpeakerFormData.append("socialMediaURLs.facebook", facebook as string);
				topSpeakerFormData.append("socialMediaURLs.instagram", instagram as string);
				topSpeakerFormData.append("socialMediaURLs.twitter", twitter as string);
				topSpeakerFormData.append("socialMediaURLs.linkedIn", linkedIn as string);
				topSpeakerFormData.append("socialMediaURLs.web", web as string);

				if (topSpeakerId) {
					dispatch(updateTopSpeaker(topSpeakerId, topSpeakerFormData));
				}
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div
			className="modal fade"
			id="topSpeakerUpdateModal"
			tabIndex={-1}
			data-mdb-backdrop="static"
			data-mdb-keyboard="false"
			aria-labelledby="topSpeakerUpdateModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Edit Top Speaker
						</h5>
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>
					<div className="modal-body update-topSpeaker">
						<div className="row mx-5">
							<div className="col-md-6">
								<span className="flyer-title">Current Top Speaker Image</span>
								<img
									src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${topSpeakerDetails?.imageUrl}`}
									className="flyer"
									alt="top-speaker-image"
								/>
							</div>
							<div className="col-md-6">
								<div className="my-3 my-lg-0">
									<ImageCanvas width={300} height={300} getEditedImage={handleImage} />
									<div className="d-flex justify-content-center">
										{formData.imageSrc === null && isFormNotValid ? (
											<span className="text-danger validation-message my-2">Top Speaker image is required</span>
										) : null}
									</div>
								</div>
							</div>
						</div>

						<div className="mx-5">
							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="far fa-file-alt fa-sm" />
									&nbsp;Top Speaker Title
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="topSpeakerName"
										value={topSpeakerName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.topSpeakerName === null && isFormNotValid ? (
										<span className="text-danger validation-message">Top speaker title is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Facebook
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="facebook"
										value={facebook as string}
										onChange={onChangeSocialMedia}
									/>
									{formData.socialMediaURLs.facebook === null && isFormNotValid ? (
										<span className="text-danger validation-message">URL is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Instagram
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="instagram"
										value={instagram as string}
										onChange={onChange}
									/>
									{formData.socialMediaURLs.instagram === null && isFormNotValid ? (
										<span className="text-danger validation-message">URL is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Twitter
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="twitter"
										value={twitter as string}
										onChange={onChange}
									/>
									{formData.socialMediaURLs.twitter === null && isFormNotValid ? (
										<span className="text-danger validation-message">URL is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;LinkedIn
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="linkedIn"
										value={linkedIn as string}
										onChange={onChange}
									/>
									{formData.socialMediaURLs.linkedIn === null && isFormNotValid ? (
										<span className="text-danger validation-message">URL is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">
									<i className="fas fa-link fa-sm" />
									&nbsp;Website
								</label>
								<div className="col-sm-9">
									<input type="text" className="form-control" name="web" value={web as string} onChange={onChange} />
									{formData.socialMediaURLs.web === null && isFormNotValid ? (
										<span className="text-danger validation-message">URL is required</span>
									) : null}
								</div>
							</div>
							<div className="form-group row my-3 mx-5">
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
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
									Cancel
								</button>
								<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateTopSpeaker;
