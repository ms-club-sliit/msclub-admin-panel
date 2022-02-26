import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	permenentDeleteTopSpeaker,
	setTopSpeakerId,
	getDeletedTopSpeakers,
} from "../../../store/top-speaker-store/topSpeakerActions";
import { ITopSpeaker } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const PermenentDeleteTopSpeaker: React.FC = () => {
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

		if (state.permenentDeletedTopSpeaker) {
			toastNotification("Top Speaker removed successfully", "success");
		}

		closeModal();
	}, [state.permenentDeletedTopSpeaker, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#permenentDeleteTopSpeakerModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (topSpeakerId) {
			dispatch(permenentDeleteTopSpeaker(topSpeakerId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="permenentDeleteTopSpeakerModal"
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
								Permenent Remove Top Speaker
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">Are you sure about deleting this top speaker information?</div>
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

export default PermenentDeleteTopSpeaker;
