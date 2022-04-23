import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrganization, IIOrganizationState, IOrganizationFormData } from "../../../interfaces";
import { getOrganizationInfo, updateOrganization } from "../../../store/organization-store/organizationActions";
import { translation } from "../../../locales/en-US/translation.json";

const initialState: IIOrganizationState = {
	organizationId: "",
	name: "",
	email: "",
	phoneNumber: "",
	university: "",
	address: "",
	website: "",
	imagePath: "",	
	isFormNotValid: false,
};

let formData: IOrganizationFormData = {
	organizationId: null,
	name: null,
	email: null,
	phoneNumber: null,
	university: null,
	address: null,
	website: null,
	imagePath: null,
};

const OrganizationInfo: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.organizationReducer);
	const [isEditEnable, setEditEnable] = useState<boolean>(false);
	const [organization, setOrganization] = useState<IOrganization>();
	const [{ organizationId, name, email, phoneNumber, university, address, website, imagePath, isFormNotValid }, setState] = useState(initialState);

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
			imagePath: state.organization?.imagePath,
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

	//form validation
	const validateForm = () =>{
		const data = {
			organizationId: organizationId,
			name : name && name.trim().length > 0 ? name : null,
			email : email && email.trim().length > 0 ? email : null,
			phoneNumber : phoneNumber && phoneNumber.trim().length > 0 ? phoneNumber : null,
			university : university && university.trim().length > 0 ? university : null,
			address : address && address.trim().length > 0 ? address : null,
			website : website && website.trim().length > 0 ? website : null,
			imagePath : imagePath && imagePath.trim().length > 0 ? imagePath : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	//form submission
	const onSubmit = (event: any) => {
		event.preventDefault();

		const isFormValid = validateForm();

		if(isFormValid){
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});
			if(!data.includes(false)){
				setState((prevState) => ({ ...prevState, isFormNotValid: false}));

				let organizationFormData = new FormData();
				if(phoneNumber) {
					organizationFormData.append("phoneNumber", phoneNumber);
				}
				organizationFormData.append("organizationId", organizationId as string);
				organizationFormData.append("name", name as string);
				organizationFormData.append("email", email as string);
				organizationFormData.append("phoneNumber", phoneNumber as string);
				organizationFormData.append("university", university as string);
				organizationFormData.append("address", address as string);
				organizationFormData.append("website", website as string);
				organizationFormData.append("imagePath", imagePath);

				dispatch(updateOrganization(organizationFormData));				
			};
		}else {
			setState((prevState) => ({ ...prevState, isFormNotValid: true}));
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
								<input type="text" name="name" value={name as string} onChange={onChange} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-at"></i>
							{translation["organization-information"].email}{" "}
							{!isEditEnable ? (
								<a href={`mailto:${organization && organization.email}`}>{organization && organization.email}</a>
							) : (
								<input type="text" name="email" value={email as string} onChange={onChange} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-graduation-cap"></i>
							{translation["organization-information"].university}{" "}
							{!isEditEnable ? (
								<span>{organization && organization.university}</span>
							) : (
								<input type="text" name="university" value={university as string} onChange={onChange} className="form-control" />
							)}
						</p>
						<p className="info-text">
							<i className="fas fa-map-marker-alt"></i>
							{translation["organization-information"].address}{" "}
							{!isEditEnable ? (
								<span>{organization && organization.address}</span>
							) : (
								<input type="text" name="address" value={address as string} onChange={onChange} className="form-control" />
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
								<input type="text" name="website" value={website as string} onChange={onChange} className="form-control" />
							)}
						</p>
					</div>

					{isEditEnable ? (
						<div className="d-flex justify-content-end my-4">
							<button className="btn btn-light btn-sm btn-rounded shadow-none" onClick={handleCancelEdit}>
								{translation.buttons.common.cancel}
							</button>
							<button className="btn btn-primary btn-sm btn-rounded shadow-none" onClick={onSubmit}>
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
