import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IEventView } from "../../../interfaces";

const EventView: React.FC = () => {
  const state = useSelector((state) => state.eventReducer);
  const eventDetails = state.viewEvent as IEventView;

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
                Event Document
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="event-view">
                <h5 className="header">Information</h5>
                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-file-alt fa-sm" />
                    &nbsp;Event Title :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && eventDetails.title}
                  </span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-clock fa-sm" />
                    &nbsp;Date & Time :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails &&
                      moment(eventDetails.dateTime).format("LLL")}
                  </span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-link fa-sm" />
                    &nbsp;Event Link :
                  </label>
                  <a
                    href={eventDetails && eventDetails.link}
                    target="_blank"
                    className="col-sm-9 text"
                  >
                    {eventDetails && eventDetails.link}
                  </a>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-circle fa-sm" />
                    &nbsp;Event Type :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && (
                      <span>
                        {eventDetails.eventType === "UPCOMING" ? (
                          <span className="badge rounded-pill bg-primary text-light">
                            Upcoming Event
                          </span>
                        ) : null}
                        {eventDetails.eventType === "PAST" ? (
                          <span className="badge rounded-pill bg-warning text-dark">
                            Past Event
                          </span>
                        ) : null}
                      </span>
                    )}
                  </span>
                </div>

                <div className="form-group row mx-5 my-2">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-tags fa-sm" />
                    &nbsp;Tags :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails &&
                      eventDetails.tags &&
                      eventDetails.tags.map((item, index) => (
                        <span
                          className="badge rounded-pill bg-dark"
                          key={index}
                        >
                          {item}
                        </span>
                      ))}
                  </span>
                </div>

                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="fas fa-align-left" />
                    &nbsp;Description :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails && eventDetails.description}
                  </span>
                </div>

                <hr className="mx-5" />

                <h5 className="header">Document History</h5>
                <div className="form-group row mx-5">
                  <label className="col-sm-3 text-dark text">
                    <i className="far fa-calendar fa-sm" />
                    &nbsp;Created At :
                  </label>
                  <span className="col-sm-9 text-dark text">
                    {eventDetails &&
                      moment(eventDetails.createdAt).format("LLL")}

                    <i className="text-muted mx-1">
                      (
                      {eventDetails &&
                        moment(eventDetails.createdAt)
                          .startOf("hour")
                          .fromNow()}
                      )
                    </i>
                  </span>
                </div>
                <div className="form-group row mx-5 my-2">
                  <label className="col text-dark text">
                    <i className="far fa-edit fa-sm" />
                    &nbsp;Modification Info :
                  </label>
                </div>
                <div className="form-group row mx-5 my-2">
                  <ul className="timeline">
                    {eventDetails &&
                      eventDetails.updatedBy &&
                      eventDetails.updatedBy.map((user, index) => (
                        <li key={index}>
                          <span className="d-flex my-0">
                            <img
                              src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${user.user.profileImage}`}
                              className="profile-img"
                            />
                            <p className="mt-0 pt-0 text-dark">
                              {user.user.firstName} {user.user.lastName}
                            </p>
                            <p>
                              <span className="badge rounded-pill bg-dark">
                                {user.user.permissionLevel === "ROOT_ADMIN"
                                  ? "Root Admin"
                                  : null}
                                {user.user.permissionLevel === "ADMIN"
                                  ? "Administrator"
                                  : null}
                                {user.user.permissionLevel === "EDITOR"
                                  ? "Editor"
                                  : null}
                              </span>
                            </p>
                            |
                            <p className="text-dark date-time">
                              {moment(user.updatedAt).format("LLL")}
                            </p>
                            <p className="text-dark date-time">
                              <i className="text-muted mx-1">
                                (
                                {moment(user.updatedAt)
                                  .startOf("hour")
                                  .fromNow()}
                                )
                              </i>
                            </p>
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light shadow-none btn-rounded"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
