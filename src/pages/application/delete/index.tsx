import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedApplication, setApplicationId } from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";
import { toastNotification } from "../../../constants";
import { translation } from "../../../locales/en-US/translation.json";

const DeleteApplication: React.FC = () => {
	const dispatch = useDispatch();
	const [applicationId, setId] = useState<string>();
	const state = useSelector((state) => state.applicationReducer);

	useEffect(() => {
		let applicationData = state.applications.find(
			(application: IApplication) => application._id === state.selectedApplicationId
		);

		if (applicationData && applicationData._id) {
			setId(applicationData._id);
		}
	}, [state.applications, state.selectedApplicationId]);

	useEffect(() => {
		dispatch(setApplicationId(""));

		if (state.deletedApplication) {
			toastNotification("Application removed successfully", "success");
		}

		closeModal();
	}, [state.deletedApplication, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#applicationDeleteModal").modal("hide");
	};

	const onSubmit = (application: any) => {
		application.preventDefault();

		if (applicationId) {
			dispatch(deletedApplication(applicationId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="applicationDeleteModal"
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
								{translation["action-modal"].applications["applications-remove"].title}
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">{translation["action-modal"].applications["applications-remove"].message}</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								{translation.buttons.common.no}
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								{translation.buttons.common.yes}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteApplication;
