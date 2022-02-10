import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageCanvas from "../../../../components/image-canvas";
import { IUser, IUserFormData, IUserState } from "../../../../interfaces";
import { updateUser, getAllUsers, setUserId, adminUpdateUser } from "../../../../store/user-store/userActions";

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

const ViewUser: React.FC = () => {
	const state = useSelector((state) => state.userReducer);
	const [userDetails, setUserDetails] = useState<IUser>();
	const [edit, setEdit] = useState<boolean>(false);
	const [changePassword, setChangePassword] = useState<boolean>(false);
	const dispatch = useDispatch();
	const URL = process.env.REACT_APP_STORAGE_BUCKET_URL + "/" + process.env.REACT_APP_STORAGE_BUCKET_NAME + "/";
	const [imgURL, setImageURL] = useState<any>();
	const [permission, setPermission] = useState<string>();

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

	const handleEdit = () => {
		setEdit(!edit);
	};

	const handleChangePassword = () => {
		setChangePassword(!changePassword);
	};

	const closeModal = () => {
		setEdit(false);
		setChangePassword(false);
		setImageURL(null);
		setState({ ...initialState });
		dispatch(setUserId(""));
		$("#viewUserModal").modal("hide");
	};

	const handleImage = (value: any) => {
		setImageURL(null);
		setState((prevState) => ({ ...prevState, profileImage: value }));
	};

	const onChange = (user: any) => {
		const { name, value } = user.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
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
			let data = Object.entries(formData).map((item) => {
				return changePassword && item[0] === "password" ? item[1] !== null : true;
			});

			if (!data.includes(false)) {
				setState((prevState) => ({ ...prevState, isFormNotValid: false }));

				let userFormData = new FormData();
				if (profileImage !== null && profileImage !== undefined) {
					userFormData.append("profileImage", profileImage);
				}
				userFormData.append("firstName", firstName as string);
				userFormData.append("lastName", lastName as string);
				userFormData.append("email", email as string);
				userFormData.append("userName", userName as string);
				if (changePassword) {
					userFormData.append("password", password as string);
				}
				userFormData.append("phoneNumber01", phoneNumber01 as string);
				if (phoneNumber02 !== null && phoneNumber02 !== undefined) {
					userFormData.append("phoneNumber02", phoneNumber02 as string);
				}
				userFormData.append("permissionLevel", permissionLevel as string);

				if (state.authUser.permissionLevel === "ROOT_ADMIN" && state.authUser._id !== state.selectedUserId) {
					userFormData.append("_id", state.selectedUserId as string);
					dispatch(adminUpdateUser(userFormData));
				} else {
					dispatch(updateUser(userFormData));
				}
			} else {
				setState((prevState) => ({ ...prevState, isFormNotValid: true }));
			}
		}
	};

	useEffect(() => {
		let userData = state.users.find((user: IUser) => state.selectedUserId === user._id);
		setUserDetails(userData);
		setState((prevState) => ({
			...prevState,
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			email: userData?.email,
			userName: userData?.userName,
			phoneNumber01: userData?.phoneNumber01,
			phoneNumber02: userData?.phoneNumber02,
			permissionLevel: userData?.permissionLevel,
		}));
	}, [state.selectedUserId]);

	useEffect(() => {
		if (state.selectedUserId !== "" && state.selectedUserId !== null) {
			setImageURL(URL);
		} else {
			setImageURL(null);
		}
	}, [state.selectedUserId]);

	useEffect(() => {
		if (state.authUser && state.authUser.authToken && state.authUser.permissionLevel) {
			setPermission(state.authUser.permissionLevel);
		}
	}, [state.authUser]);

	useEffect(() => {
		if (
			(state.updatedUser !== "" && state.updatedUser !== null) ||
			(state.adminUpdatedUser !== "" && state.adminUpdatedUser !== null)
		) {
			dispatch(getAllUsers());
			dispatch(setUserId(""));
			closeModal();
		}
	}, [state.updatedUser, state.adminUpdatedUser]);

	return (
		<div
			className="modal fade"
			id="viewUserModal"
			tabIndex={-1}
			data-mdb-backdrop="static"
			data-mdb-keyboard="false"
			aria-labelledby="viewUserLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="viewUserLabel">
							View User
						</h5>
						{(permission === "ROOT_ADMIN" || state.selectedUserId === state.authUser._id) && !edit && (
							<i className="far fa-edit mx-2" onClick={handleEdit}></i>
						)}
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>

					<div className="modal-body">
						{imgURL !== null && (
							<div className="d-flex justify-content-center mb-3">
								<img src={`${imgURL}${userDetails?.profileImage}`} width="200px" height="200px" object-fit="cover" />
							</div>
						)}
						{edit && <ImageCanvas width={200} height={200} getEditedImage={handleImage} />}
						<div className="mx-5">
							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">First Name: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<input
											type="text"
											name="firstName"
											value={firstName as string}
											className="form-control"
											onChange={onChange}
										/>
									) : (
										<span>{firstName}</span>
									)}
									{edit && formData.firstName === null && isFormNotValid && (
										<span className="text-danger validation-message">First name is required</span>
									)}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Last Name: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<input
											type="text"
											name="lastName"
											value={lastName as string}
											className="form-control"
											onChange={onChange}
										/>
									) : (
										<span>{lastName}</span>
									)}
									{edit && formData.lastName === null && isFormNotValid && (
										<span className="text-danger validation-message">Last name is required</span>
									)}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Email: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<input
											type="email"
											name="email"
											value={email as string}
											className="form-control"
											onChange={onChange}
										/>
									) : (
										<span>{email}</span>
									)}
									{edit && formData.email === null && isFormNotValid && (
										<span className="text-danger validation-message">Email is required</span>
									)}
								</div>
							</div>

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Username: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<input
											type="text"
											name="userName"
											value={userName as string}
											className="form-control"
											onChange={onChange}
										/>
									) : (
										<span>{email}</span>
									)}
									{edit && formData.userName === null && isFormNotValid && (
										<span className="text-danger validation-message">Username is required</span>
									)}
								</div>
							</div>

							{edit && changePassword && (
								<div className="form-group row my-3">
									<label className="col-sm-3 col-form-label form-label text-dark">Password: </label>
									<div className="col-sm-9 d-flex flex-column justify-content-center">
										<input
											type="password"
											name="password"
											value={password as string}
											className="form-control"
											onChange={onChange}
										/>
										{formData.password === null && isFormNotValid && (
											<span className="text-danger validation-message">Password is required</span>
										)}
									</div>
								</div>
							)}

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Phone Number 01: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<input
											type="text"
											name="phoneNumber01"
											value={phoneNumber01 as string}
											className="form-control"
											onChange={onChange}
										/>
									) : (
										<span>{phoneNumber01}</span>
									)}
									{edit && formData.phoneNumber01 === null && isFormNotValid && (
										<span className="text-danger validation-message">Phone number is required</span>
									)}
								</div>
							</div>

							{((phoneNumber02 !== null && phoneNumber02 !== undefined && phoneNumber02 !== "") || edit) && (
								<div className="form-group row my-3">
									<label className="col-sm-3 col-form-label form-label text-dark">Phone Number 02: </label>
									<div className="col-sm-9 d-flex flex-column justify-content-center">
										{edit ? (
											<input
												type="text"
												name="phoneNumber02"
												value={phoneNumber02 as string}
												className="form-control"
												onChange={onChange}
											/>
										) : (
											<span>{phoneNumber02}</span>
										)}
										{edit && formData.phoneNumber02 === null && isFormNotValid && (
											<span className="text-danger validation-message">Phone number is required</span>
										)}
									</div>
								</div>
							)}

							<div className="form-group row my-3">
								<label className="col-sm-3 col-form-label form-label text-dark">Permission Level: </label>
								<div className="col-sm-9 d-flex flex-column justify-content-center">
									{edit ? (
										<select
											name="permissionLevel"
											className="form-control"
											onChange={onChange}
											value={permissionLevel as string}
										>
											<option value="ROOT_ADMIN">Root Admin</option>
											<option value="ADMIN">Admin</option>
											<option value="EDITOR">Editor</option>
											<option value="VIEWER">Viewer</option>
										</select>
									) : (
										<span>
											{permissionLevel === "ROOT_ADMIN" && "Root Admin"}
											{permissionLevel === "ADMIN" && "Admin"}
											{permissionLevel === "EDITOR" && "Editor"}
											{permissionLevel === "VIEWER" && "Viewer"}
										</span>
									)}
									{edit && formData.permissionLevel === null && isFormNotValid && (
										<span className="text-danger validation-message">Permission level is required</span>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
							Cancel
						</button>
						{edit && !changePassword && (
							<button className="btn btn-light shadow-none btn-rounded" onClick={handleChangePassword}>
								Change Password
							</button>
						)}
						{edit && (
							<button className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Save
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewUser;
