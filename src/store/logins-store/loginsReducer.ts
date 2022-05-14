import { ILoginsStore } from "../../interfaces/ILogins";
import UserActionTypes from "./loginsActionTypes";

const initialState: ILoginsStore = {
	recentLogins: [],
	loading: false,
};

const loginsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${UserActionTypes.GET_LOGIN_INFO}_PENDING`:
			return { ...state, loading: true };

		case `${UserActionTypes.GET_LOGIN_INFO}_FULFILLED`:
			let recentLogins = action.payload.data;
			return { ...state, loading: false, recentLogins };

		case `${UserActionTypes.GET_LOGIN_INFO}_REJECTED`:
			return {
				...state,
				loading: false,
				error: action.payload.response,
				state: initialState,
			};

		default:
			return state;
	}
};

export default loginsReducer;
