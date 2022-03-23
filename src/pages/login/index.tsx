import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ILoginFormData, ILoginState } from "../../interfaces";
import { loginUser } from "../../store/user-store/userActions";
import { toastNotification } from "../../constants";
import { translation } from "../../locales/en-US/translation.json";

let formData: ILoginFormData = {
	userName: null,
	password: null,
};

const initialState: ILoginState = {
	userName: "",
	password: "",
	isLoading: false,
	isFormNotValid: false,
};

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.userReducer);
	const [{ userName, password, isLoading, isFormNotValid }, setState] = useState(initialState);

	// If the user login is success
	useEffect(() => {
		let authToken = state.loggedUser;

		if (authToken) {
			toastNotification("Successfully signed in", "success");
			localStorage.setItem("token", authToken.token);
			window.location.href = "/";
		}
		setState((prevState) => ({ ...prevState, isLoading: false }));
	}, [state.loggedUser]);

	// If the user login is not success
	useEffect(() => {
		if (state.error && state.error.data && state.error.data.details) {
			toastNotification(state.error.data.details.message as string, "warn");
			localStorage.removeItem("token");
			setState((prevState) => ({ ...prevState, isLoading: false }));
		} else {
			setState((prevState) => ({ ...prevState, isLoading: false }));
		}
	}, [state.error]);

	const onChange = (event: any) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	// Form Validation
	const validateForm = () => {
		const data = {
			userName: userName && userName.trim().length > 0 ? userName : null,
			password: password && password.trim().length > 0 ? password : null,
		};

		formData = Object.assign({}, data);
		return true;
	};

	const onSubmit = (event: any) => {
		if (event) {
			const isFormValid = validateForm();

			if (isFormValid) {
				let data = Object.values(formData).map((item) => {
					return item !== null;
				});

				if (!data.includes(false)) {
					dispatch(loginUser(userName as string, password as string));
					setState((prevState) => ({
						...prevState,
						isFormNotValid: false,
						isLoading: true,
					}));
				} else {
					setState((prevState) => ({ ...prevState, isFormNotValid: true }));
					toastNotification("Please check the fields", "warn");
				}
			}
		}
	};

	return (
		<div className="login d-flex justify-content-center">
			<div className="card">
				<div className="d-flex justify-content-center">
					<img src="/images/ms_club_logo_crop.png" alt="ms-club-logo" className="logo" />
					<h4 className="text-dark">{translation.forms.login.title}</h4>
				</div>

				<div>
					<div className="form-group">
						<label className="form-label">{translation.forms.login.label.username}</label>
						<input
							type="text"
							className="form-control"
							name="userName"
							value={userName as string}
							onChange={onChange}
						/>
						{formData.userName === null && isFormNotValid ? (
							<span className="text-danger validation-message">
								{translation.forms.login["validation-message"].username}
							</span>
						) : null}
					</div>

					<div className="form-group my-3">
						<label className="form-label">{translation.forms.login.label.password}</label>
						<input
							type="password"
							className="form-control"
							name="password"
							value={password as string}
							onChange={onChange}
						/>
						{formData.password === null && isFormNotValid ? (
							<span className="text-danger validation-message">
								{translation.forms.login["validation-message"].password}
							</span>
						) : null}
					</div>
				</div>

				<span className="form-label">
					<Link to="/signin/faceauth">{translation.forms.login["use-face-authentication"]}</Link>
				</span>
				<span className="form-label">
					{translation.forms.login["forgot-password"]} <Link to="/">{translation.forms.login.reset}</Link>
				</span>
				<span className="form-label">
					{translation.forms.login["do-not-have-an-account"]}
					<Link to="/">{translation.forms.login["contact-admin"]}</Link>
				</span>

				<div className="d-flex justify-content-end my-3">
					{!isLoading ? (
						<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
							{translation.forms.login["sign-in"]}
						</button>
					) : (
						<button type="button" disabled className="btn btn-primary shadow-none btn-rounded">
							<span>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span>{translation.forms.login.signing}</span>
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
