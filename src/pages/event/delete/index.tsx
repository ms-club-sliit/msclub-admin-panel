import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvents, setEventId } from "../../../store/event-store/eventActions";
import { IEvent } from "../../../store/event-store/IEvent";
import { toastNotification } from "../../../constants";
import {translation} from '../../../locales/en-US/translation.json';

const DeleteEvent: React.FC = () => {
  const dispatch = useDispatch();
  const [eventId, setId] = useState<string>();
  const state = useSelector((state) => state.eventReducer);

  useEffect(() => {
    let eventData = state.events.find((event: IEvent) => event._id === state.selectedEventId);

    if (eventData && eventData._id) {
      console.log(eventData._id);
      setId(eventData._id);
    }
  }, [state.events, state.selectedEventId]);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(setEventId(""));

    if (state.deletedEvent) {
      toastNotification("Event removed successfully", "success");
    }

    closeModal();
  }, [state.deletedEvent, dispatch]);

  useEffect(() => {
    if (state.error) {
      toastNotification("Something went wrong", "error");
    }
  }, [state.error, dispatch]);

  const closeModal = () => {
    $("#eventDeleteModal").modal("hide");
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (eventId) {
      dispatch(deleteEvent(eventId));
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="eventDeleteModal"
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
                {translation.label["event-delete-title"]}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>

            <div className="modal-body delete-event">
              <div className="text">{translation.label["event-delete-are-you-sure"]}</div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
                {translation.button["no"]}
              </button>
              <button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
                {translation.button["yes"]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;
