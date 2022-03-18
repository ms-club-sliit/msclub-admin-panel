import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { ILoginFaceAuthenticationState } from "../../interfaces";
import { loginUserFaceAuthentication } from "../../store/user-store/userActions";
import { toastNotification } from "../../constants";

const initialState: ILoginFaceAuthenticationState = {
	isLoading: false,
};

const LoginFaceAuthentication: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.userReducer);
	const [{ isLoading }, setState] = useState(initialState);

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

	const onSubmit = async (imgSrc: any) => {
		if (imgSrc) {
			const base64Response = await fetch(`${imgSrc}`);
			const blob = await base64Response.blob();
			let loginFormData = new FormData();

			setState((prevState) => ({
				...prevState,
				isLoading: true,
			}));

			loginFormData.append("profileImage", blob as any);
			dispatch(loginUserFaceAuthentication(loginFormData));
		}
	};

	return (
		<div className="login d-flex justify-content-center">
			<div className="card">
				<div className="d-flex justify-content-center">
					<img src="/images/ms_club_logo_crop.png" alt="ms-club-logo" className="logo" />
					<h4 className="text-dark">Admin Panel</h4>
				</div>

				<div>
					<Webcam audio={false} height={450} screenshotFormat="image/jpeg" width={490}>
						{({ getScreenshot }) =>
							!isLoading ? (
								<button
									type="button"
									className="btn btn-primary shadow-none btn-rounded"
									onClick={() => {
										const image = getScreenshot();
										onSubmit(image);
									}}
								>
									Sign In
								</button>
							) : (
								<button type="button" disabled className="btn btn-primary shadow-none btn-rounded">
									<span>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										<span>Signing...</span>
									</span>
								</button>
							)
						}
					</Webcam>
				</div>
			</div>
		</div>
	);
};

export default LoginFaceAuthentication;
