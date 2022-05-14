import moment from "moment";
import React, { useEffect } from "react";
import Loader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import { IRecentLogin } from "../../../interfaces/ILogins";
import { getLoginInfo } from "../../../store/logins-store/loginsActions";

const RecentLogin: React.FC = () => {
	const recentLogins = useSelector((state) => state.loginsReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLoginInfo());
	}, [dispatch]);

	const URL = `${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/`;

	return (
		<div className="resent__login">
			<div className="card">
				{!recentLogins.loading ? (
					<div>
						<h5 className="m-0">
							<i className="fa fa-sign-in text-info"></i>&nbsp;Recent Logins
						</h5>
						<div className="card-body">
							{recentLogins.recentLogins &&
								recentLogins.recentLogins.length &&
								recentLogins.recentLogins
									.slice(0, 6)
									.map((recentLogin: IRecentLogin) => (
										<LoginItem
											key={recentLogin._id}
											dateTime={recentLogin.loggedAt}
											firstName={recentLogin.user.firstName}
											lastName={recentLogin.user.lastName}
											role={recentLogin.user.permissionLevel}
											profileIcon={URL + recentLogin.user.profileImage}
										/>
									))}
						</div>
					</div>
				) : (
					<Loader type="login_loader" />
				)}
			</div>
		</div>
	);
};

interface LoginItemProps {
	dateTime: string | any;
	firstName: string;
	lastName: string;
	role: string | null;
	profileIcon: string;
}

const LoginItem: React.FC<LoginItemProps> = ({ dateTime, firstName, lastName, profileIcon, role }) => {
	return (
		<div className="login__item">
			<div className="row">
				<div className="col-5 d-flex">
					<p className="time">{moment(dateTime).format("llll")}</p>
					<span className="line"></span>
				</div>
				<div className="col-7">
					<span className="login__item_container">
						<img src={profileIcon} className="profile__icon" alt="profile-icon" />
						<div>
							<div className="name">
								{firstName} {lastName}
							</div>
							<div>
								<i>{role}</i>
							</div>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default RecentLogin;
