import React, { useState } from "react";
import ImageCanvas from "../../../../components/image-canvas";
import { IUserFormData, IUserState } from "../../../../interfaces";

const formData: IUserFormData = {
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
	profileImage: "",
};

const AddUser: React.FC = () => {
	const [
		{ firstName, lastName, email, userName, password, phoneNumber01, phoneNumber02, permissionLevel, profileImage },
		setState,
	] = useState(initialState);

	const closeModal = () => {
		$("#addUserModal").modal("hide");
	};

	const handleImage = (value: any) => {
		setState((prevState) => ({ ...prevState, profileImage: value }));
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
			<div className="modal-dialog modal-md">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="addUserLabel">
							Add New User
						</h5>
						<button type="button" className="btn-close" onClick={closeModal}></button>
					</div>

					<div className="modal-body add-user">
						<ImageCanvas width={200} height={200} getEditedImage={handleImage} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddUser;
