import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWebinarPermanently, getDeletedWebinars, setWebinarId } from "../../../store/webinar-store/webinarActions";
import { IWebinar } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const PermanentDeleteWebinar: React.FC = () => {
	const dispatch = useDispatch();
	const [webinarId, setId] = useState<string>();
	const state = useSelector((state) => state.webinarReducer);

	useEffect(() => {
		let webinarData = state.deletedWebinars.find((webinar: IWebinar) => webinar._id === state.selectedWebinarId);
		if (webinarData && webinarData._id) {
			setId(webinarData._id);
		}
	}, [state.webinars, state.selectedWebinarId]);

	useEffect(() => {
		dispatch(getDeletedWebinars());
		dispatch(setWebinarId(""));
		if (state.deletedWebinar) {
			toastNotification("Webinar deleted successfully", "success");
		}
		closeModal();
	}, [state.deletedWebinar, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#deleteWebinarPermanentlyModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (webinarId) {
			dispatch(deleteWebinarPermanently(webinarId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="deleteWebinarPermanentlyModal"
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
								Delete Webinar
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">Are you sure about permanently this deleted webinar?</div>
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

export default PermanentDeleteWebinar;