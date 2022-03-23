import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoverDeletedEvent, getDeletedEvents, setEventId } from "../../../store/event-store/eventActions";
import { IEvent } from "../../../interfaces";
import { toastNotification } from "../../../constants";
import { translation } from "../../../locales/en-US/translation.json";

const RecoverDeletetedEvent: React.FC = () => {
	const dispatch = useDispatch();
	const [eventId, setId] = useState<string>();
	const state = useSelector((state) => state.eventReducer);

	useEffect(() => {
		let eventData = state.deletedEvents.find((event: IEvent) => event._id === state.selectedEventId);
		if (eventData && eventData._id) {
			setId(eventData._id);
		}
	}, [state.events, state.selectedEventId]);

	useEffect(() => {
		dispatch(getDeletedEvents());
		dispatch(setEventId(""));
		if (state.updatedEvent) {
			toastNotification("Event recovered successfully", "success");
		}
		closeModal();
	}, [state.updatedEvent, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#recoverDeletedEventModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (eventId) {
			dispatch(recoverDeletedEvent(eventId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="recoverDeletedEventModal"
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
								{translation["action-modal"].event["event-recover"].title}
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text">{translation["action-modal"].event["event-recover"].message}</div>
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

export default RecoverDeletetedEvent;
