import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrganization } from "../../../store/interfaces";
import { getOrganizationInfo } from "../../../store/organization-store/organizationActions";

const OrganizationInfo: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.organizationReducer);
  const [isEditEnable, setEditEnable] = useState<boolean>(false);
  const [organization, setOrganization] = useState<IOrganization>();

  useEffect(() => {
    dispatch(getOrganizationInfo());
  }, [dispatch]);

  useEffect(() => {
    setOrganization(state.organization);
  }, [state.organization]);

  const handleEditClick = (event: any) => {
    setEditEnable(true);
  };

  const handleCancelEdit = (event: any) => {
    setEditEnable(false);
  };

  return (
    <div className="organization">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            {organization && organization.imagePath ? (
              <img
                src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${organization.imagePath}`}
                alt="ms-club"
                className="logo"
              />
            ) : (
              <img src="/images/ms_club_logo.png" alt="ms-club" className="logo" />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex">
            <h4 className="info-title">Organization Information</h4>
            <i className="far fa-edit mx-2" onClick={handleEditClick}></i>
          </div>

          <div>
            <p className="info-text">
              <i className="fas fa-link"></i>Name:{" "}
              {!isEditEnable ? (
                <span>{organization && organization.name}</span>
              ) : (
                <input type="text" value={organization && organization.name} className="form-control" />
              )}
            </p>
            <p className="info-text">
              <i className="fas fa-at"></i>Email:{" "}
              {!isEditEnable ? (
                <a href={`mailto:${organization && organization.email}`}>{organization && organization.email}</a>
              ) : (
                <input type="text" value={organization && organization.email} className="form-control" />
              )}
            </p>
            <p className="info-text">
              <i className="fas fa-graduation-cap"></i>University:{" "}
              {!isEditEnable ? (
                <span>{organization && organization.university}</span>
              ) : (
                <input
                  type="text"
                  value={organization && (organization.university as string)}
                  className="form-control"
                />
              )}
            </p>
            <p className="info-text">
              <i className="fas fa-map-marker-alt"></i>Address:{" "}
              {!isEditEnable ? (
                <span>{organization && organization.address}</span>
              ) : (
                <input type="text" value={organization && (organization.address as string)} className="form-control" />
              )}
            </p>
            <p className="info-text">
              <i className="fas fa-globe-americas"></i>Website:{" "}
              {!isEditEnable ? (
                <a href={`${organization && organization.website}`} target="_blank" rel="noreferrer">
                  {organization && organization.website}
                </a>
              ) : (
                <input type="text" value={organization && (organization.website as string)} className="form-control" />
              )}
            </p>
          </div>

          {isEditEnable ? (
            <div className="d-flex justify-content-end my-4">
              <button className="btn btn-light btn-sm btn-rounded shadow-none" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm btn-rounded shadow-none">Save</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
