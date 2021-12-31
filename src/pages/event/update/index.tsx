import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, setEventId, updateEvent } from "../../../store/event-store/eventActions";
import { IEvent, IEventState, IEventFormData } from "../../../interfaces";
import ImageCanvas from "../../../components/image-canvas";
import moment from "moment";
import RichTextEditor from "react-rte";
import { ToolBarConfig } from "../../../constants";

let formData: IEventFormData = {
  imageSrc: null,
  eventName: null,
  eventType: null,
  dateTime: null,
  registrationLink: null,
  eventLink: null,
  filteredTags: null,
  description: null,
};

const initialState: IEventState = {
  eventId: "",
  isFormNotValid: false,
  imageSrc: null,
  eventName: "",
  eventType: "",
  dateTime: "",
  registrationLink: "",
  eventLink: "",
  filteredTags: [],
  description: "",
};

const UpdateEvent: React.FC = () => {
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
  const state = useSelector((state) => state.eventReducer);
  const [eventDetails, setEventDetails] = useState<IEvent>();
  const [
    {
      eventId,
      eventName,
      eventLink,
      eventType,
      registrationLink,
      description,
      imageSrc,
      isFormNotValid,
      filteredTags,
      dateTime,
    },
    setState,
  ] = useState(initialState);

  useEffect(() => {
    let eventData = state.events.find((event: IEvent) => event._id === state.selectedEventId);

    setEventDetails(eventData);
    setState((prevState) => ({
      ...prevState,
      eventId: eventData?._id,
      eventName: eventData?.title,
      eventLink: eventData?.link,
      registrationLink: eventData?.registrationLink,
      eventType: eventData?.eventType,
      description: eventData?.description,
      dateTime: eventData?.dateTime,
      filteredTags: eventData?.tags,
    }));
    setEditor(RichTextEditor.createValueFromString(eventData?.description, "html"));
  }, [state.selectedEventId, state.events]);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(setEventId(""));
    closeModal();
    // eslint-disable-next-line
  }, [state.updatedEvent, dispatch]);

  const closeModal = () => {
    setState({ ...initialState });
    setEditor(RichTextEditor.createEmptyValue());
    dispatch(setEventId(""));
    $("#eventUpdateModal").modal("hide");
  };

  const handleDescription = (value: any) => {
    setEditor(value);
    const isEmpty = !value.getEditorState().getCurrentContent().getPlainText().trim();

    if (isEmpty) {
      setState((prevState) => ({
        ...prevState,
        description: null,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        description: value.toString("html"),
      }));
    }
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImage = (data: any) => {
    setState((prevState) => ({ ...prevState, imageSrc: data }));
  };

  const handleTags = (value: string) => {
    let tags = value.split(",");
    let filterdTags: string[] = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        filterdTags.push(tag.trim());
      }
      console.log(filterdTags);
      setState((prevState) => ({ ...prevState, filteredTags: filterdTags }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const data = {
      eventName: eventName && eventName.trim().length > 0 ? eventName : null,
      eventType: eventType && eventType.trim().length > 0 ? eventType : null,
      dateTime: dateTime && dateTime.trim().length > 0 ? dateTime : null,
      registrationLink: registrationLink && registrationLink.trim().length > 0 ? registrationLink : null,
      eventLink: eventLink && eventLink.trim().length > 0 ? eventLink : null,
      filteredTags: filteredTags && filteredTags.length > 0 ? filteredTags : null,
      description: description && description.trim().length > 0 ? description : null,
    };

    formData = Object.assign({}, data);
    return true;
  };

  // Form Submission
  const onSubmit = (e: any) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      let data = Object.values(formData).map((item) => {
        return item !== null;
      });

      if (!data.includes(false)) {
        setState((prevState) => ({ ...prevState, isFormNotValid: false }));

        let eventFormData = new FormData();
        if (imageSrc) {
          eventFormData.append("eventFlyer", imageSrc);
        }
        eventFormData.append("title", eventName as string);
        eventFormData.append("dateTime", dateTime as string);
        eventFormData.append("description", description as string);
        eventFormData.append("link", eventLink as string);
        filteredTags?.forEach((tag) => eventFormData.append("tags", tag));
        eventFormData.append("registrationLink", registrationLink as string);
        eventFormData.append("eventType", eventType as string);

        if (eventId) {
          dispatch(updateEvent(eventId, eventFormData));
        }
      } else {
        setState((prevState) => ({ ...prevState, isFormNotValid: true }));
      }
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="eventUpdateModal"
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
                Edit Event Document
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>

            <div className="modal-body update-event">
              <div className="row mx-5">
                <div className="col-md-6">
                  <span className="flyer-title">Current Event Flyer</span>
                  <img
                    src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${eventDetails?.imageUrl}`}
                    className="flyer"
                    alt="event-flyer"
                  />
                </div>
                <div className="col-md-6">
                  <div className="my-3 my-lg-0">
                    <ImageCanvas width={300} height={300} getEditedImage={handleImage} />
                    <div className="d-flex justify-content-center">
                      {formData.imageSrc === null && isFormNotValid ? (
                        <span className="text-danger validation-message my-2">Event flyer is required</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row mx-5 my-3">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="far fa-file-alt fa-sm" />
                  &nbsp;Event Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="eventName"
                    value={eventName as string}
                    onChange={onChange}
                  />
                  {formData.eventName === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Event name is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row mx-5 my-3">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-check fa-sm" />
                  &nbsp;Event Type
                </label>
                <div className="col-sm-9">
                  <select className="form-control" name="eventType" value={eventType as string} onChange={onChange}>
                    <option selected>Select event type</option>
                    <option value="PAST">PAST</option>
                    <option value="UPCOMING">UPCOMING</option>
                  </select>
                  {formData.eventType === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Event type is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="far fa-clock fa-sm" />
                  &nbsp;Date & Time
                </label>
                <div className="col-sm-9">
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={moment(dateTime).format("YYYY-MM-DDTHH:mm")}
                    onChange={onChange}
                    className="form-control"
                  />
                  {formData.dateTime === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Date & time is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-link fa-sm" />
                  &nbsp;Event Link
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="registrationLink"
                    value={eventLink as string}
                    onChange={onChange}
                  />
                  {formData.eventLink === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Event type is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-link fa-sm" />
                  &nbsp;Registration Link
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="registrationLink"
                    value={registrationLink as string}
                    onChange={onChange}
                  />
                  {formData.registrationLink === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Registration link is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-tags fa-sm" />
                  &nbsp;Tags
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={filteredTags?.map((tag) => tag)}
                    onChange={(e) => handleTags(e.target.value)}
                  />
                  <small className="text-muted tag-text">
                    Sperate tag names using , (example: ITP, GitHub, Microservice)
                  </small>
                  <br />
                  {formData.filteredTags === null && isFormNotValid ? (
                    <span className="text-danger validation-message">Tags are is required</span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-12 col-form-label form-label text-dark">
                  <i className="fas fa-align-left" />
                  &nbsp;Description
                </label>
                <div className="col-sm-12">
                  <RichTextEditor
                    value={editor}
                    onChange={handleDescription}
                    toolbarClassName="description"
                    editorClassName="description"
                    toolbarConfig={ToolBarConfig}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
