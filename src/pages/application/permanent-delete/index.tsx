import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteApplicationPermanently,
	setApplicationId,
	getDeletedApplications,
} from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const PermanentDeleteApplication: React.FC = () => {
	const dispatch = useDispatch();
	const [applicationId, setId] = useState<string>();
	const state = useSelector((state) => state.applicationReducer);

	useEffect(() => {
		let applicationData = state.deletedApplications.find(
			(application: IApplication) => application._id === state.selectedApplicationId
		);

		if (applicationData && applicationData._id) {
			setId(applicationData._id);
		}
	}, [state.deletedApplications, state.selectedApplicationId]);

	useEffect(() => {
		dispatch(getDeletedApplications());
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
		$("#applicationDeletePermanentlyModal").modal("hide");
	};

	const onSubmit = (application: any) => {
		application.preventDefault();

		if (applicationId) {
			dispatch(deleteApplicationPermanently(applicationId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="applicationDeletePermanentlyModal"
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
								Delete Application
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">Are you sure about deleting this application information?</div>
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

export default PermanentDeleteApplication;
