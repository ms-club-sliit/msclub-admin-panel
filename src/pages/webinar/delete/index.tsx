import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWebinar, getWebinars, setWebinarId } from "../../../store/webinar-store/webinarActions";
import { IWebinar } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const DeleteWebinar: React.FC = () => {
	const dispatch = useDispatch();
	const [webinarId, setId] = useState<string>();
	const state = useSelector((state) => state.webinarReducer);

	useEffect(() => {
		let webinarData = state.webinars.find((webinar: IWebinar) => webinar._id === state.selectedWebinarId);

		if (webinarData && webinarData._id) {
			setId(webinarData._id);
		}
	}, [state.webinars, state.selectedWebinarId]);

	useEffect(() => {
		dispatch(getWebinars());
		dispatch(setWebinarId(""));

		if (state.deletedWebinar) {
			toastNotification("Webinar removed successfully", "success");
		}

		closeModal();
	}, [state.deletedWebinar, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#webinarDeleteModal").modal("hide");
	};

	const onSubmit = (webinar: any) => {
		webinar.preventDefault();

		if (webinarId) {
			dispatch(deleteWebinar(webinarId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="webinarDeleteModal"
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
								Remove Webinar
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">Are you sure about deleting this webinar information?</div>
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

export default DeleteWebinar;
