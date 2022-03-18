import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { ILoginFormData, ILoginState } from "../../interfaces";
import { loginUserFaceAuthentication } from "../../store/user-store/userActions";
import { toastNotification } from "../../constants";
import { string } from "yup";

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

const LoginFaceAuthentication: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.userReducer);
	const [{ isLoading }, setState] = useState(initialState);
	const [imgSrc, setImgSrc] = useState("https://i.stack.imgur.com/l60Hf.png");
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

	const onSubmit = async (event: any) => {
		if (event) {
			if (imgSrc) {
				let data = Object.values(formData).map((item) => {
					return item !== null;
				});

				const base64Response = await fetch(`${imgSrc}`);
				const blob = await base64Response.blob();
				let eventFormData = new FormData();

				eventFormData.append("profileImage", blob as any);
				dispatch(loginUserFaceAuthentication(eventFormData));
			}
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
					<div className="text-center">
						<Webcam audio={false} height={720} screenshotFormat="image/jpeg" width={1280}>
							{({ getScreenshot }) => (
								<button
									onClick={() => {
										const image = getScreenshot();
										console.log(image);
										setImgSrc(image || "ss");
									}}
								>
									Capture photo
								</button>
							)}
						</Webcam>
					</div>
				</div>

				<div className="d-flex justify-content-end my-3">
					{!isLoading ? (
						<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
							Sign In
						</button>
					) : (
						<button type="button" disabled className="btn btn-primary shadow-none btn-rounded">
							<span>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span>Signing...</span>
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginFaceAuthentication;
