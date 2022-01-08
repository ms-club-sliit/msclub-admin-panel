import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applications,
  setApplicationId,
  changeApplicationStatusIntoInterview,
} from "../../../store/application-store/applicationActions";
import {
  IInterviewState,
  IInterviewFormData,
  IApplication,
} from "../../../interfaces";
import moment from "moment";

let formData: IInterviewFormData = {
  applicationDate: null,
  applicationTime: null,
  applicationDuration: null,
  applicationFormat: null,
};

const initialState: IInterviewState = {
  applicationId: "",
  isFormNotValid: false,
  applicationDate: "",
  applicationTime: "",
  applicationDuration: "",
  applicationFormat: "",
};

const ApplicationInterviewForm: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.applicationReducer);
  const [
    { applicationId, applicationDate, applicationTime, applicationDuration, applicationFormat, isFormNotValid },
    setState,
  ] = useState(initialState);

  useEffect(() => {
    let applicationData = state.applications.find((application: IApplication) => application._id === state.selectedApplicationId);
    setState((prevState) => ({
      ...prevState,
      applicationId: applicationData?._id,
    }));
  }, [state.selectedApplicationId, state.applications]);

  useEffect(() => {
    dispatch(applications());
    dispatch(setApplicationId(""));
    closeModal();
    // eslint-disable-next-line
  }, [state.updatedApplication, dispatch]);

  const closeModal = () => {
    setState({ ...initialState });
    dispatch(setApplicationId(""));
    $("#applicationInterviewModal").modal("hide");
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Form Validation
  const validateForm = () => {
    const data = {
      applicationDate: applicationDate && applicationDate.trim().length > 0 ? applicationDate : null,
      applicationTime: applicationTime && applicationTime.trim().length > 0 ? applicationTime : null,
      applicationDuration: applicationDuration && applicationDuration.trim().length > 0 ? applicationDuration : null,
      applicationFormat: applicationFormat && applicationFormat.trim().length > 0 ? applicationFormat : null,
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
        let interviewFormData = new FormData();
        interviewFormData.append("date", applicationDate as string);
        interviewFormData.append("time", applicationTime as string);
        interviewFormData.append("format", applicationFormat as string);
        interviewFormData.append("duration", applicationDuration as string);
        if (applicationId) {
          dispatch(changeApplicationStatusIntoInterview(applicationId, interviewFormData));
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
        id="applicationInterviewModal"
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
                Interview Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body update-event">
              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="far fa-clock fa-sm" />
                  &nbsp;Date
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    name="applicationDate"
                    value={moment(applicationDate).format("YYYY-MM-DD")}
                    onChange={onChange}
                    className="form-control"
                  />
                  {formData.applicationDate === null && isFormNotValid ? (
                    <span className="text-danger validation-message">
                      Date is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="far fa-clock fa-sm" />
                  &nbsp;Time
                </label>
                <div className="col-sm-9">
                  <input
                    type="time"
                    name="applicationTime"
                    value={applicationTime?.toString()}
                    onChange={onChange}
                    className="form-control"
                  />
                  {formData.applicationTime === null && isFormNotValid ? (
                    <span className="text-danger validation-message">
                      Time is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row mx-5 my-3">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-check fa-sm" />
                  &nbsp;Platform
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    name="applicationFormat"
                    value={applicationFormat as string}
                    onChange={onChange}
                  >
                    <option selected>Select Platform</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meets">Google Meets</option>
                  </select>
                  {formData.applicationFormat === null && isFormNotValid ? (
                    <span className="text-danger validation-message">
                      Platform is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="form-group row my-3 mx-5">
                <label className="col-sm-3 col-form-label form-label text-dark">
                  <i className="fas fa-link fa-sm" />
                  &nbsp;Duration
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="applicationDuration"
                    value={applicationDuration as string}
                    onChange={onChange}
                  />
                  {formData.applicationDuration === null && isFormNotValid ? (
                    <span className="text-danger validation-message">
                      Duration is required
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light shadow-none btn-rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary shadow-none btn-rounded"
                onClick={onSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationInterviewForm;
