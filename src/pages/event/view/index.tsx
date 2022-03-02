import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IEventView } from "../../../interfaces";
import { IEvent } from "../../../store/event-store/IEvent";
import {translation} from '../../../locales/en-US/translation.json';

const EventView: React.FC = () => {
  const HtmlToReactParser = require("html-to-react").Parser;
  const state = useSelector((state) => state.eventReducer);
  const [eventDetails, setEventDetails] = useState<IEventView>();

  const convertToPlain = (html: string) => {
    const htmlToParser = new HtmlToReactParser();
    const reactElement = htmlToParser.parse(html);
    return reactElement;
  };

  useEffect(() => {
    let eventData = state.events.find((event: IEvent) => state.selectedEventId === event._id);
    setEventDetails(eventData);
  }, [state.selectedEventId, state.events]);

  return (
    <div>
      <div
        className="modal fade"
        id="eventViewModal"
        data-mdb-backdrop="static"
        data-mdb-keyboard="false"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {translation.label["event-document"]}
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="event-view">
                <h5 className="header">{translation.label["information"]}</h5>
                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-file-alt fa-sm" />
                    &nbsp;{translation.label["v-event-title"]}
                  </label>
                  <span className="col-sm-9 text-dark text">{eventDetails?.title}</span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-clock fa-sm" />
                    &nbsp;{translation.label["v-date-time"]}
                  </label>
                  <span className="col-sm-9 text-dark text">{moment(eventDetails?.dateTime).format("LLL")}</span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-link fa-sm" />
                    &nbsp;{translation.label["v-event-link"]}
                  </label>
                  <a
                    href={eventDetails && eventDetails.link}
                    target="_blank"
                    className="col-sm-9 text"
                    rel="noreferrer"
                  >
                    {eventDetails && eventDetails.link}
                  </a>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-circle fa-sm" />
                    &nbsp;{translation.label["v-event-type"]}
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && (
                      <span>
                        {eventDetails.eventType === "UPCOMING" ? (
                          <span className="badge rounded-pill bg-primary text-light">{translation.label["upcoming-event"]}</span>
                        ) : null}
                        {eventDetails.eventType === "PAST" ? (
                          <span className="badge rounded-pill bg-warning text-dark">{translation.label["past-event"]}</span>
                        ) : null}
                      </span>
                    )}
                  </span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-tags fa-sm" />
                    &nbsp;{translation.label["v-tags"]}
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails &&
                      eventDetails.tags &&
                      eventDetails.tags.map((item, index) => (
                        <span className="badge rounded-pill bg-dark" key={index}>
                          {item}
                        </span>
                      ))}
                  </span>
                </div>

                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-align-left" />
                    &nbsp;{translation.label["v-description"]}
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && convertToPlain(eventDetails.description)}
                  </span>
                </div>

                <hr className="mx-5" />

                <h5 className="header">{translation.label["v-document-history"]}</h5>
                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-calendar fa-sm" />
                    &nbsp;{translation.label["v-created-at"]}
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && moment(eventDetails.createdAt).format("LLL")}

                    <i className="text-muted mx-1">
                      ({eventDetails && moment(eventDetails.createdAt).startOf("hour").fromNow()})
                    </i>
                  </span>
                </div>
                <div className="form-group row mx-5 my-2">
                  <label className="col text-dark text">
                    <i className="far fa-edit fa-sm" />
                    &nbsp;{translation.label["v-modification-info"]}
                  </label>
                </div>
                <div className="form-group row mx-5 my-2">
                  <ul className="timeline">
                    {eventDetails &&
                      eventDetails.updatedBy &&
                      eventDetails.updatedBy.map((user, index) => (
                        <li key={index} className="modify-user-item">
                          <span className="d-flex my-0">
                            <img
                              src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${user.user.profileImage}`}
                              className="profile-img"
                              alt="event-flyer"
                            />
                            <p className="mt-0 pt-0 text-dark">
                              {user.user.firstName} {user.user.lastName}
                            </p>
                            <p>
                              <span
                                className={`badge rounded-pill ${
                                  user.user.permissionLevel === "ROOT_ADMIN" ? "bg-primary" : null
                                } ${user.user.permissionLevel === "ADMIN" ? "bg-info text-dark" : null} ${
                                  user.user.permissionLevel === "EDITOR" ? "bg-secondary" : null
                                }`}
                              >
                                {user.user.permissionLevel === "ROOT_ADMIN" ? "Root Admin" : null}
                                {user.user.permissionLevel === "ADMIN" ? "Administrator" : null}
                                {user.user.permissionLevel === "EDITOR" ? "Editor" : null}
                              </span>
                            </p>
                            |<p className="text-dark date-time">{moment(user.updatedAt).format("LLL")}</p>
                            <p className="text-dark date-time">
                              <i className="text-muted mx-1">({moment(user.updatedAt).startOf("hour").fromNow()})</i>
                            </p>
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light shadow-none btn-rounded" data-mdb-dismiss="modal">
                {translation.button["close"]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
