import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageCanvas from "../../components/image-canvas";
import { IUserState } from "../../interfaces";
import { getMe, updateUser } from "../../store/user-store/userActions";

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

const MyProfile: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.userReducer);

	const STORAGE_URL = process.env.REACT_APP_STORAGE_BUCKET_URL + "/" + process.env.REACT_APP_STORAGE_BUCKET_NAME + "/";

	const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);
	const [changePassword, setChangePassword] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

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
		setFormState,
	] = useState(initialState);

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

useEffect(() => {
    if (state.me) {
        setFormState((prev) => ({
            ...prev,
            firstName: state.me?.firstName,
            lastName: state.me?.lastName,
            email: state.me?.email,
            userName: state.me?.userName,
            phoneNumber01: state.me?.phoneNumber01,
            phoneNumber02: state.me?.phoneNumber02,
            permissionLevel: state.me?.permissionLevel,
        }));
        setCurrentImagePath(state.me?.profileImage ?? null);
    }
}, [state.me]);

	useEffect(() => {
		if (hasSubmitted && state.updatedUser !== "" && state.updatedUser !== null) {
			setErrorMessage("");
			setSuccessMessage("Your profile has been updated successfully.");
			setChangePassword(false);
			setHasSubmitted(false);
			setFormState((prev) => ({ ...prev, profileImage: null }));
			dispatch(getMe());
		}
	}, [state.updatedUser]);

	useEffect(() => {
		if (hasSubmitted && state.error) {
			setSuccessMessage("");
			setErrorMessage("Could not update your profile. Please try again.");
			setHasSubmitted(false);
		}
	}, [state.error]);

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setSuccessMessage("");
		setErrorMessage("");
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleImage = (value: any) => {
		setFormState((prev) => ({ ...prev, profileImage: value }));
	};

	const isFilled = (value: string | null) => value !== null && value.trim().length > 0;
	const isValidEmail = (value: string | null) =>
		isFilled(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value as string).trim());
	const isValidPassword = (value: string | null) => isFilled(value) && (value as string).trim().length >= 8;

	const onSubmit = (event: any) => {
		event.preventDefault();

		const formValid =
			isFilled(firstName) &&
			isFilled(lastName) &&
			isValidEmail(email) &&
			isFilled(userName) &&
			isFilled(phoneNumber01) &&
			(!changePassword || isValidPassword(password));

		if (!formValid) {
			setFormState((prev) => ({ ...prev, isFormNotValid: true }));
			return;
		}

		setFormState((prev) => ({ ...prev, isFormNotValid: false }));
		setSuccessMessage("");
		setErrorMessage("");
		setHasSubmitted(true);

		const userFormData = new FormData();
		userFormData.append("firstName", firstName as string);
		userFormData.append("lastName", lastName as string);
		userFormData.append("email", email as string);
		userFormData.append("userName", userName as string);
		userFormData.append("phoneNumber01", phoneNumber01 as string);
		if (isFilled(phoneNumber02)) {
			userFormData.append("phoneNumber02", phoneNumber02 as string);
		}
		if (changePassword) {
			userFormData.append("password", password as string);
		}
		if (profileImage !== null && profileImage !== undefined) {
			userFormData.append("profileImage", profileImage);
		}

		userFormData.append("permissionLevel", permissionLevel as string);

		dispatch(updateUser(userFormData));
	};

	return (
		<div className="container mt-5 pt-5">
			<h2 className="mb-4">My Profile</h2>

			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

			<div className="d-flex justify-content-center mb-3">
				{currentImagePath && !profileImage && (
					<img
						src={`${STORAGE_URL}${currentImagePath}`}
						width="200px"
						height="200px"
						style={{ objectFit: "cover" }}
						alt="Profile"
					/>
				)}
			</div>

			<ImageCanvas width={200} height={200} getEditedImage={handleImage} />

			<div className="mx-5 mt-4">
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
						{!isFilled(firstName) && isFormNotValid && (
							<span className="text-danger validation-message">First name is required</span>
						)}
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
						{!isFilled(lastName) && isFormNotValid && (
							<span className="text-danger validation-message">Last name is required</span>
						)}
					</div>
				</div>

				<div className="form-group row my-3">
					<label className="col-sm-3 col-form-label form-label text-dark">Email</label>
					<div className="col-sm-9">
						<input type="email" name="email" value={email as string} className="form-control" onChange={onChange} />
						{isFormNotValid && !isFilled(email) && (
							<span className="text-danger validation-message">Email is required</span>
						)}
						{isFormNotValid && isFilled(email) && !isValidEmail(email) && (
							<span className="text-danger validation-message">Enter a valid email address</span>
						)}
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
						{!isFilled(userName) && isFormNotValid && (
							<span className="text-danger validation-message">Username is required</span>
						)}
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
						{!isFilled(phoneNumber01) && isFormNotValid && (
							<span className="text-danger validation-message">Phone number is required</span>
						)}
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
					<div className="col-sm-9 d-flex align-items-center">
						<span>{permissionLevel}</span>
					</div>
				</div>

				{changePassword && (
					<div className="form-group row my-3">
						<label className="col-sm-3 col-form-label form-label text-dark">New Password</label>
						<div className="col-sm-9">
							<input
								type="password"
								name="password"
								value={password as string}
								className="form-control"
								onChange={onChange}
							/>
							{isFormNotValid && !isFilled(password) && (
								<span className="text-danger validation-message">Password is required</span>
							)}
							{isFormNotValid && isFilled(password) && !isValidPassword(password) && (
								<span className="text-danger validation-message">Password must be at least 8 characters</span>
							)}
						</div>
					</div>
				)}
			</div>

			<div className="d-flex justify-content-end mx-5 mt-4 mb-5">
				{!changePassword && (
					<button className="btn btn-light shadow-none btn-rounded mx-2" onClick={() => setChangePassword(true)}>
						Change Password
					</button>
				)}
				<button className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
					Save
				</button>
			</div>
		</div>
	);
};

export default MyProfile;
