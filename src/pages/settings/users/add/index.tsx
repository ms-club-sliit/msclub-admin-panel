import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageCanvas from "../../../../components/image-canvas";
import { IUserFormData, IUserState } from "../../../../interfaces";
import { createUser, getAllUsers } from "../../../../store/user-store/userActions";

let formData: IUserFormData = {
	firstName: null,
	lastName: null,
	email: null,
	password: null,
	phoneNumber01: null,
	phoneNumber02: null,
	permissionLevel: null,
	userName: null,
	profileImage: null,
};

const initialState: IUserState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	phoneNumber01: "",
	phoneNumber02: "",
	userName: "",
	permissionLevel: "",
	profileImage: null,
	isFormNotValid: false,
};

const AddUser: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.userReducer);
	const [
		{
			firstName,
			lastName,
			email,
			userName,
			password,
			phoneNumber01,
			phoneNumber02,
			permissionLevel,
			profileImage,
			isFormNotValid,
		},
		setState,
	] = useState(initialState);

	useEffect(() => {
		if (state.newUser !== "" && state.newUser !== null) {
			dispatch(getAllUsers());
			closeModal();
		}
	}, [state.newUser]);

	const closeModal = () => {
		setState({ ...initialState });
		$("#addUserModal").modal("hide");
	};

	const onChange = (user: any) => {
		const { name, value } = user.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleImage = (value: any) => {
		setState((prevState) => ({ ...prevState, profileImage: value }));
	};

	const validateForm = () => {
		const data = {
			firstName: firstName && firstName.trim().length > 0 ? firstName : null,
			lastName: lastName && lastName.trim().length > 0 ? lastName : null,
			email: email && email.trim().length > 0 ? email : null,
			userName: userName && userName.trim().length > 0 ? userName : null,
			password: password && password.trim().length > 0 ? password : null,
			phoneNumber01: phoneNumber01 && phoneNumber01.trim().length > 0 ? phoneNumber01 : null,
			phoneNumber02: phoneNumber02 && phoneNumber02.trim().length > 0 ? phoneNumber02 : null,
			permissionLevel: permissionLevel && permissionLevel.trim().length > 0 ? permissionLevel : null,
			profileImage: profileImage ? profileImage : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	const onSubmit = (user: any) => {
		user.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			let data = Object.values(formData).map((item) => {
				return item !== null;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				let userFormData = new FormData();
				userFormData.append("firstName", firstName as string);
				userFormData.append("lastName", lastName as string);
				userFormData.append("email", email as string);
				userFormData.append("userName", userName as string);
				userFormData.append("password", password as string);
				userFormData.append("phoneNumber01", phoneNumber01 as string);
				userFormData.append("phoneNumber02", phoneNumber02 as string);
				userFormData.append("permissionLevel", permissionLevel as string);
				userFormData.append("profileImage", profileImage);

				dispatch(createUser(userFormData));
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	return (
		<div
			className="modal fade"
			id="addUserModal"
			tabIndex={-1}
			data-mdb-backdrop="static"
			data-mdb-keyboard="false"
			aria-labelledby="addUserLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="addUserLabel">
							Add New User
						</h5>
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>

					<div className="modal-body add-user">
						<ImageCanvas width={200} height={200} getEditedImage={handleImage} />
						<div className="mx-5">
							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">First Name</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="firstName"
										value={firstName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.firstName === null && isFormNotValid ? (
										<span className="text-danger validation-message">First name is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Last Name</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="lastName"
										value={lastName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.lastName === null && isFormNotValid ? (
										<span className="text-danger validation-message">Last name is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Email</label>
								<div className="col-sm-9">
									<input
										type="email"
										name="email"
										value={email as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.email === null && isFormNotValid ? (
										<span className="text-danger validation-message">Email is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Username</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="userName"
										value={userName as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.userName === null && isFormNotValid ? (
										<span className="text-danger validation-message">Username is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Password</label>
								<div className="col-sm-9">
									<input
										type="password"
										name="password"
										value={password as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.password === null && isFormNotValid ? (
										<span className="text-danger validation-message">Password is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Phone Number 01</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="phoneNumber01"
										value={phoneNumber01 as string}
										className="form-control"
										onChange={onChange}
									/>
									{formData.phoneNumber01 === null && isFormNotValid ? (
										<span className="text-danger validation-message">Phone number is required</span>
									) : null}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Phone Number 02</label>
								<div className="col-sm-9">
									<input
										type="text"
										name="phoneNumber02"
										value={phoneNumber02 as string}
										className="form-control"
										onChange={onChange}
									/>
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Permission Level</label>
								<div className="col-sm-9">
									<select
										name="permissionLevel"
										className="form-control"
										value={permissionLevel as string}
										onChange={onChange}
									>
										<option>Select permission level</option>
										<option value="ROOT_ADMIN">Root Admin</option>
										<option value="ADMIN">Admin</option>
										<option value="EDITOR">Editor</option>
										<option value="VIEWER">Viewer</option>
									</select>
									{formData.permissionLevel === null && isFormNotValid ? (
										<span className="text-danger validation-message">Permission level is required</span>
									) : null}
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
							Cancel
						</button>
						<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={onSubmit}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddUser;
