import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "../../../constants";
import { IWebinar } from "../../../interfaces";
import { getDeletedWebinars, recoverDeletedWebinar, setWebinarId } from "../../../store/webinar-store/webinarActions";
import { translation } from "../../../locales/en-US/translation.json";

const RecoverDeletedWebinar: React.FC = () => {
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
		if (state.updatedWebinar) {
			toastNotification("Webinar recovered successfully", "succcess");
		}
		closeModal();
	}, [state.updatedWebinar, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#recoverDeletedWebinarModal").modal("hide");
	};

	const onSubmit = (webinar: any) => {
		webinar.preventDefault();

		if (webinarId) {
			dispatch(recoverDeletedWebinar(webinarId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="recoverDeletedWebinarModal"
				data-mdb-backdrop="static"
				data-mdb-keyboard="false"
				tabIndex={-1}
				aria-labelledby="exampleModelLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								{translation["action-modal"].webinar["webinar-recover"].title}
							</h5>
							<button className="btn-close" type="submit" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text">{translation["action-modal"].webinar["webinar-recover"].message}</div>
						</div>

						<div className="modal-footer">
							<button className="btn btn-light shadow-none btn-rounded" type="button" onClick={closeModal}>
								{translation.buttons.common.no}
							</button>

							<button className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								{translation.buttons.common.yes}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecoverDeletedWebinar;
