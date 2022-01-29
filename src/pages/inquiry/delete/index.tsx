import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactUs, getContactsUs, setContactUsId } from "../../../store/contact-store/contactUsAction";
import { IContactUs } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const DeleteInquiry: React.FC = () => {
	const dispatch = useDispatch();
	const [inquiryId, setId] = useState<string>();
	const state = useSelector((state) => state.contactUsReducer);

	useEffect(() => {
		let inquiryData = state.contactsUs.find((inquiry: IContactUs) => inquiry._id === state.selectedContactUsId);

		if (inquiryData && inquiryData._id) {
			setId(inquiryData._id);
		}
	}, [state.contactsUs, state.selectedContactUsId]);

	useEffect(() => {
		dispatch(getContactsUs());
		dispatch(setContactUsId(""));

		if (state.deleteContactUs) {
			toastNotification("Event removed successfully", "success");
		}

		closeModal();
	}, [state.deleteContactUs, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#inquiryDeleteModal").modal("hide");
	};

	const onSubmit = (inquiry: any) => {
		inquiry.preventDefault();

		if (inquiryId) {
			dispatch(deleteContactUs(inquiryId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="inquiryDeleteModal"
				data-mdb-backdrop="static"
				data-mdb-keyboard="false"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Remove Inquiry
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text">Are you sure about deleting this Inquiry information?</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								No
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteInquiry;
