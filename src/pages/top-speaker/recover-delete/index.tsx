import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "../../../constants";
import { ITopSpeaker } from "../../../interfaces";
import {
	getDeletedTopSpeakers,
	recoverDeletedTopSpeaker,
	setTopSpeakerId,
} from "../../../store/top-speaker-store/topSpeakerActions";
import { translation } from "../../../locales/en-US/translation.json";

const RecoverDeletedTopSpeaker: React.FC = () => {
	const dispatch = useDispatch();
	const [topSpeakerId, setId] = useState<string>();
	const state = useSelector((state) => state.topSpeakerReducer);

	useEffect(() => {
		let topSpeakerData = state.deletedTopSpeakers.find(
			(topSpeaker: ITopSpeaker) => topSpeaker._id === state.selectedTopSpeakerId
		);
		if (topSpeakerData && topSpeakerData._id) {
			setId(topSpeakerData._id);
		}
	}, [state.topSpeakers, state.selectedTopSpeakerId]);

	useEffect(() => {
		dispatch(getDeletedTopSpeakers());
		dispatch(setTopSpeakerId(""));
		if (state.updatedTopSpeaker) {
			toastNotification("Top Speaker recovered successfully", "succcess");
		}
		closeModal();
	}, [state.updatedTopSpeaker, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#recoverDeletedTopSpeakerModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (topSpeakerId) {
			dispatch(recoverDeletedTopSpeaker(topSpeakerId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="recoverDeletedTopSpeakerModal"
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
								{translation["action-modal"]["top-speakers"]["top-speakers-recover"].title}
							</h5>
							<button className="btn-close" type="submit" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text"> {translation["action-modal"]["top-speakers"]["top-speakers-recover"].message}</div>
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

export default RecoverDeletedTopSpeaker;
