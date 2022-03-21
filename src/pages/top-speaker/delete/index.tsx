import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopSpeaker, setTopSpeakerId } from "../../../store/top-speaker-store/topSpeakerActions";
import { ITopSpeaker } from "../../../interfaces";
import { toastNotification } from "../../../constants";
import { translation } from "../../../locales/en-US/translation.json";

const DeleteTopSpeaker: React.FC = () => {
	const dispatch = useDispatch();
	const [topSpeakerId, setId] = useState<string>();
	const state = useSelector((state) => state.topSpeakerReducer);

	useEffect(() => {
		let topSpeakerData = state.topSpeakers.find(
			(topSpeaker: ITopSpeaker) => topSpeaker._id === state.selectedTopSpeakerId
		);

		if (topSpeakerData && topSpeakerData._id) {
			setId(topSpeakerData._id);
		}
	}, [state.topSpeakers, state.selectedTopSpeakerId]);

	useEffect(() => {
		dispatch(setTopSpeakerId(""));

		if (state.deletedTopSpeaker) {
			toastNotification("Top Speaker removed successfully", "success");
		}

		closeModal();
	}, [state.deletedTopSpeaker, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#topSpeakerDeleteModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (topSpeakerId) {
			dispatch(deleteTopSpeaker(topSpeakerId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="topSpeakerDeleteModal"
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
								{translation["action-modal"]["top-speakers"]["top-speakers-remove"].title}
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">{translation["action-modal"]["top-speakers"]["top-speakers-remove"].message}</div>
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

export default DeleteTopSpeaker;
