import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "../../../../constants";
import { IUser } from "../../../../interfaces";
import { removeUser, getAllUsers } from "../../../../store/user-store/userActions";

const DeleteUser: React.FC = () => {
	const dispatch = useDispatch();
	const [userId, setUserId] = useState<string>();
	const state = useSelector((state) => state.userReducer);

	const closeModal = () => {
		$("#userDeleteModal").modal("hide");
	};

	const onSubmit = (user: any) => {
		user.preventDefault();

		if (userId) {
			dispatch(removeUser(userId));
			closeModal();
		}
	};

	useEffect(() => {
		if (state.selectedUserId !== "" && state.selectedUserId !== null) {
			let userData = state.users.find((user: IUser) => user._id === state.selectedUserId);
			if (userData && userData._id) {
				setUserId(userData._id);
			}
		}
	}, [state.users, state.selectedUserId]);

	useEffect(() => {
		if (state.deletedUser) {
			dispatch(getAllUsers());

			if (state.deletedUser) {
				toastNotification("User removed successfully", "success");
			}
			closeModal();
		}
	}, [state.deletedUser, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	return (
		<div>
			<div
				className="modal fade"
				id="userDeleteModal"
				data-mdb-backdrop="static"
				data-mdb-keyboard="false"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Remove User
							</h5>
							<button className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body">
							<div className="text">Are you sure about deleting this user?</div>
						</div>

						<div className="modal-footer">
							<button className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								No
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteUser;
