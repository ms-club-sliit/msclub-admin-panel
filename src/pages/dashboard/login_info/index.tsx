import moment from "moment";
import React from "react";

// Temp data - Start
const resentLogins = [
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
	{
		dateTime: new Date(),
		userName: "rusiruavb",
		firstName: "Rusiru",
		lastName: "Abhisheak",
		role: "Root Admin",
		profileIcon: "/images/profile.png",
	},
];
// Temp daa - End

const RecentLogin: React.FC = () => {
	return (
		<div className="resent__login">
			<div className="card">
				<h5 className="m-0">
					<i className="fa fa-sign-in text-info"></i>&nbsp;Recent Logins
				</h5>
				<div className="card-body">
					{resentLogins.map((logItem, index) => (
						<LoginItem
							key={index}
							dateTime={logItem.dateTime}
							userName={logItem.userName}
							firstName={logItem.firstName}
							lastName={logItem.lastName}
							role={logItem.role}
							profileIcon={logItem.profileIcon}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

interface LoginItemProps {
	dateTime: string | any;
	userName: string;
	firstName: string;
	lastName: string;
	role: string;
	profileIcon: string;
}

const LoginItem: React.FC<LoginItemProps> = ({ dateTime, userName, firstName, lastName, profileIcon, role }) => {
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
