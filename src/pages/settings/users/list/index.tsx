import React from "react";

interface IUserProps {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	imagePath: string | null;
	phoneNumber: string;
	userName: string;
	permissionLevel: string | null;
}

const User: React.FC<IUserProps> = (props: IUserProps) => {
	return (
		<div className="user">
			<div className="card border shadow-none">
				<div className="row">
					<div className="col-md-4">
						<img
							src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${props.imagePath}`}
							className="image"
						/>
					</div>

					<div className="col-md-8">
						<h5>
							{props.firstName} {props.lastName}
							{props.permissionLevel === "ROOT_ADMIN" ? (
								<div className="badge rounded-pill bg-dark mx-2">Root Admin</div>
							) : null}
							{props.permissionLevel === "ADMIN" ? (
								<div className="badge rounded-pill bg-primary mx-2">Admin</div>
							) : null}
							{props.permissionLevel === "EDITOR" ? (
								<div className="badge rounded-pill bg-secondary mx-2">Editor</div>
							) : null}
							{props.permissionLevel === "VIEWER" ? (
								<div className="badge rounded-pill bg-warning mx-2">Viewer</div>
							) : null}
						</h5>
						<div>
							<a href={`mailto:${props.email}`}>{props.email}</a>
						</div>
						<div>
							<a href={`tel:${props.phoneNumber}`}>{props.phoneNumber}</a>
						</div>

						<div className="d-flex mt-1">
							<button className="btn btn-outline-primary shadow-none btn-sm btn-rounded">View Profile</button>
							<button className="btn btn-outline-danger shadow-none btn-sm btn-rounded mx-1">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
