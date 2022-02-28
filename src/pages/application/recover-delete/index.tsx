import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "../../../constants";
import { IApplication } from "../../../interfaces";
import {
	getDeletedApplications,
	recoverDeletedApplication,
	setApplicationId,
} from "../../../store/application-store/applicationActions";

const RecoverDeletedApplication: React.FC = () => {
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
	}, [state.applications, state.selectedApplicationId]);

	useEffect(() => {
		dispatch(getDeletedApplications());
		dispatch(setApplicationId(""));
		if (state.updatedApplication) {
			toastNotification("Application recovered successfully", "succcess");
		}
		closeModal();
	}, [state.updatedApplication, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#recoverDeletedApplicationModal").modal("hide");
	};

	const onSubmit = (application: any) => {
		application.preventDefault();

		if (applicationId) {
			dispatch(recoverDeletedApplication(applicationId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="recoverDeletedApplicationModal"
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
								Recover Deleted Application
							</h5>
							<button className="btn-close" type="submit" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text">Are you sure about recovering this deleted Application</div>
						</div>

						<div className="modal-footer">
							<button className="btn btn-light shadow-none btn-rounded" type="button" onClick={closeModal}>
								No
							</button>

							<button className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecoverDeletedApplication;
