import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiries, setInquiryId, replyInquiry } from "../../../store/inquiry-store/inquiryAction";
import { IInquiry, IInquiryReplyState, IInquiryReplyFormData } from "../../../interfaces";
import { translation } from "../../../locales/en-US/translation.json";
import { toastNotification } from "../../../constants";

let formData: IInquiryReplyFormData = {
    reply: null,
};

const initialState: IInquiryReplyState = {
	inquiryId: "",
	reply: "",
	isFormNotValid: false,
};

const ReplyInquiry: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.inquiryReducer);
	const [inquiryDetails, setInquiryDetails] = useState<IInquiry>();
    const [
        {
            inquiryId,
            reply,
            isFormNotValid
        },
        setState
    ] = useState(initialState);

	useEffect(() => {
		let inquiryData = state.inquiries.find((inquiry: IInquiry) => inquiry._id === state.selectedInquiryId);

		setInquiryDetails(inquiryData);
		setState((prevState: any) => ({
			...prevState,
			inquiryId: inquiryData?._id,
			message: inquiryData?.message,
		}));
	}, [state.selectedInquiryId, state.inquiries]);

	useEffect(() => {
        dispatch(getInquiries());
        setInquiryId("");
        closeModal();

		if (state.replyInquiry) {
			toastNotification("Inquiry replied successfully", "success");
		}

	}, [state.replyInquiry, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		setState({ ...initialState });
		dispatch(setInquiryId(""));
		$("#inquiryReplyModal").modal("hide");
	};

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState: any) => ({ ...prevState, [name]: value }));
	};

	// Form Validation
	const validateForm = () => {
		const data = {
            reply: reply && reply.trim().length > 0 ? reply : null,
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
	            setState((prevState: any) => ({ ...prevState, isFormNotValid: false }));

				let replyFormData = {
					reply: reply,
				};

				if (inquiryId) {
	                dispatch(replyInquiry(inquiryId, replyFormData));
				}
			} else {
				setState((prevState: any) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="inquiryReplyModal"
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
								{translation["action-modal"].inquiries["inquiry-reply"].title}
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="form-group row mx-5 my-3">
							<label className="col-sm-3 col-form-label form-label text-dark">
								<i className="fas fa-envelope ml-2" />
								&nbsp;{translation.forms.inqury.label["inqury-message"]}
							</label>
							<div className="col-sm-9">
								<p className="form-control-plaintext">{inquiryDetails?.message}</p>
							</div>
						</div>

						<div className="form-group row mx-5 my-3">
							<label className="col-sm-3 col-form-label form-label text-dark">
								<i className="fas fa-reply ml-2" />
								&nbsp;{translation.forms.inqury.label["inqury-reply"]}
							</label>
							<div className="col-sm-9">
								<input type="text" className="form-control" name="reply" value={reply as string} onChange={onChange} />
								{formData.reply === null && isFormNotValid ? (
									<span className="text-danger validation-message">
										{translation.forms.inqury["validation-message"]["inqury-reply"]}
									</span>
								) : null}
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
		</div>
	);
};

export default ReplyInquiry;
