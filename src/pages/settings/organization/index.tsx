import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrganization, IIOrganizationState } from "../../../interfaces";
import { getOrganizationInfo } from "../../../store/organization-store/organizationActions";
import { translation } from "../../../locales/en-US/translation.json";

const initialState: IIOrganizationState = {
	name: "",
	email: "",
	phoneNumber: "",
	university: "",
	address: "",
	website: "",
	imagePath: "",
};

const OrganizationInfo: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.organizationReducer);
	const [isEditEnable, setEditEnable] = useState<boolean>(false);
	const [organization, setOrganization] = useState<IOrganization>();
	const [{ name, email, phoneNumber, university, address, website, imagePath }, setState] = useState(initialState);

	useEffect(() => {
		dispatch(getOrganizationInfo());
	}, [dispatch]);

	useEffect(() => {
		setOrganization(state.organization);
		setState((prevState) => ({
			...prevState,
			name: state.organization?.name,
			email: state.organization?.email,
			phoneNumber: state.organization?.phoneNumber,
			university: state.organization?.university,
			address: state.organization?.address,
			website: state.organization?.website,
			imagePath: "organization-images/1640356477197-322336.jpg",
		}));
	}, [state.organization]);

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleEditClick = (event: any) => {
		if (event) {
			setEditEnable(true);
		}
	};

	const handleCancelEdit = (event: any) => {
		if (event) {
			setEditEnable(false);
		}
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
						<h4 className="info-title">{translation["organization-information"].title}</h4>
						<i className="far fa-edit mx-2" onClick={handleEditClick}></i>
					</div>

					<div>
						<p className="info-text">
							<i className="fas fa-link"></i>
							{translation["organization-information"].name}{" "}
							{!isEditEnable ? (
								<span>{organization && organization.name}</span>
							) : (
								<input type="text" name="name" value={name as string} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-at"></i>
							{translation["organization-information"].email}{" "}
							{!isEditEnable ? (
								<a href={`mailto:${organization && organization.email}`}>{organization && organization.email}</a>
							) : (
								<input type="text" name="email" value={email as string} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-graduation-cap"></i>
							{translation["organization-information"].university}{" "}
							{!isEditEnable ? (
								<span>{organization && organization.university}</span>
							) : (
								<input type="text" name="university" value={university as string} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-map-marker-alt"></i>
							{translation["organization-information"].address}{" "}
							{!isEditEnable ? (
								<span>{organization && organization.address}</span>
							) : (
								<input type="text" name="address" value={address as string} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-globe-americas"></i>
							{translation["organization-information"].website}{" "}
							{!isEditEnable ? (
								<a href={`${organization && organization.website}`} target="_blank" rel="noreferrer">
									{organization && organization.website}
								</a>
							) : (
								<input type="text" name="website" value={website as string} className="form-control" />
							)}
						</p>
					</div>

					{isEditEnable ? (
						<div className="d-flex justify-content-end my-4">
							<button className="btn btn-light btn-sm btn-rounded shadow-none" onClick={handleCancelEdit}>
								{translation.buttons.common.cancel}
							</button>
							<button className="btn btn-primary btn-sm btn-rounded shadow-none">
								{translation.buttons.common.save}
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default OrganizationInfo;
