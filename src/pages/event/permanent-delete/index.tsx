import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventPermanently, getDeletedEvents, setEventId } from "../../../store/event-store/eventActions";
import { IEvent } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const PermanentDeleteEvent: React.FC = () => {
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
		if (state.deletedEvent) {
			toastNotification("Event deleted successfully", "success");
		}
		closeModal();
	}, [state.deletedEvent, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#deleteEventPermanentlyModal").modal("hide");
	};

	const onSubmit = (event: any) => {
		event.preventDefault();

		if (eventId) {
			dispatch(deleteEventPermanently(eventId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="deleteEventPermanentlyModal"
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
								Deleted Event
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-event">
							<div className="text">Are you sure about permanently this deleted event?</div>
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

export default PermanentDeleteEvent;
